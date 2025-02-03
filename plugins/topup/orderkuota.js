/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import {
    OrderKuotaAPI
} from "../../lib/scraper/OrderKuota.js";
import fs from 'fs';

let Tio = async (m, {
    conn,
    text,
    isROwner
}) => {
    const {
        id,
        pin,
        password
    } = global.Orkut;

    if (!id || !pin || !password) {
        return m.reply("Konfigurasi global tidak lengkap. Pastikan 'id', 'pin', dan 'password' telah diatur.");
    }

    const orkut = new OrderKuotaAPI({
        memberID: id,
        pin,
        password
    });

    let [type, teks] = text.split(' ');

    try {
        switch (type.toLowerCase()) {
            case 'saldo':
                if (!isROwner) return m.reply('Khusus owner');
                const saldo = await orkut.getBalance();
                return m.reply(`${saldo}`);

            case 'cektrx':
                if (!teks) return m.reply("Format salah. Gunakan: cektrx <produk/tujuan/refID>");
                return handleCekTrx(m, orkut, teks);

            case 'trx':
                if (!teks) return m.reply("Format salah. Gunakan: trx <produk/tujuan>");
                return handleTrx(m, orkut, teks);

            case 'list':
                return handleList(m, teks);

            default:
                return m.reply("Perintah tidak dikenali. Gunakan 'saldo', 'cektrx', 'list', atau 'trx'.");
        }
    } catch (error) {
        console.error(error);
        return m.reply(`Terjadi kesalahan: ${error.message || error}`);
    }
};

Tio.help = ["orderkuota"];
Tio.tags = ['topup'];
Tio.command = /^(or(der)?ku(o)?t(a)?)$/i;

export default Tio;

async function getCategory() {
    try {
        const json = await Func.fetchJson('https://okeconnect.com/harga/json?produk=');
        if (!json || !Array.isArray(json)) throw new Error("Gagal mengambil data kategori.");
        return [...new Set(json.map(v => v.kategori.replace(/ /g, '_')))];
    } catch (err) {
        console.error(err);
        return [];
    }
}

async function filter(type) {
    try {
        type = type.replace('_', ' ').toUpperCase();
        const json = await Func.fetchJson('https://okeconnect.com/harga/json?produk=');
        const result = json.filter(v => v.kategori == type)
        return result;
    } catch (err) {
        console.error(err);
        return {};
    }
}
async function getList() {
    try {

        const json = await Func.fetchJson('https://okeconnect.com/harga/json?produk=');

        return json;
    } catch (err) {
        console.error(err);
        return {};
    }
}

function cek(nilai1, nilai2) {
    return Math.abs(nilai1 - nilai2);
}
async function handleCekTrx(m, orkut, teks) {
    const [produk, dest, refID] = teks.split('/');
    if (!produk || !dest || !refID) {
        return m.reply("Format salah. Pastikan semua parameter (produk/tujuan/refID) diisi.");
    }
    const cek = await orkut.statusTransaction(produk, dest, refID);
    return m.reply(`Hasil pengecekan:\n${cek}`);
}

async function handleTrx(m, orkut, teks) {
    const [product, tujuan] = teks.split('/');
    let user = JSON.parse(await fs.readFileSync('./system/database/saldo.json', 'utf-8'));

    let sender = m.sender;
    if (!(sender in user)) return m.reply("Kamu belum mempunyai saldo. Silahkan isi terlebih dahulu dengan mengetik .charge");

    if (!product || !tujuan) {
        return m.reply("Format salah. Pastikan semua parameter (produk/tujuan) diisi.");
    };
    const reff = await getRef();
    const produks = await getList();
    const {
        harga
    } = produks.find(v => v.kode == product);
    if (user[sender] < harga) return m.reply(`Saldo kamu kurang: ${await cek(harga, user[sender])}`)
    const trx = await orkut.makeTransaction(product, tujuan, reff);
    await m.reply(`Transaksi berhasil:\n${trx}`);
     user[m.sender] -= parseInt(harga);
     await fs.writeFileSync('./system/database/saldo.json', JSON.stringify(user, null, 2));
}

async function handleList(m, teks) {
    try {
        const categories = await getCategory();
        if (!categories || categories.length === 0) {
            return m.reply("Gagal mengambil daftar kategori. Coba lagi nanti.");
        }

        if (!teks) {
            return m.reply(`Masukkan nama kategori dari daftar berikut:\n\n${categories.map(v => `- ${v}`).join('\n')}`);
        }

        teks = teks.toUpperCase();
        if (!categories.includes(teks)) {
            return m.reply(`Kategori tidak ditemukan. Pilih kategori yang sesuai:\n\n${categories.map(v => `- ${v}`).join('\n')}`);
        }

        const products = await filter(teks);
        if (!products || Object.keys(products).length === 0) {
            return m.reply("Data produk tidak ditemukan untuk kategori ini. Coba kategori lain.");
        }

        const listProduk = products
            .map(product =>
                Object.entries(product)
                .map(([key, value]) => {
                    if (key === 'status') {
                        return `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value == 1 ? '✅' : '❌'}`;
                    } else {
                        return `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`;
                    }
                })
                .join('\n')
            )
            .join('\n\n');
        await fs.writeFileSync('./tmp/list.txt', listProduk);

        const image = await conn.sendMessage(
            m.chat, {
                image: {
                    url: 'https://files.catbox.moe/7zdefw.webp'
                },
                caption: `Daftar produk untuk kategori *${teks}*:\n\n${listProduk}`,
            }, {
                quoted: m
            }
        );
        await conn.sendFile(m.chat, './tmp/list.txt', 'List.txt', `Silahkan cek disini agar lebih detail`, image);
        setTimeout(() => {
            fs.unlinkSync('./tmp/list.txt')
        }, 10 * 1000)
    } catch (err) {
        console.error(err);
        return m.reply(`Terjadi kesalahan saat memproses daftar: ${err.message}`);
    }
}

function getRef() {
    const prefix = "Tixo";
    const randomPart = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `${prefix}${randomPart}`;
}