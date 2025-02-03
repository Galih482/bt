/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import {
    follSun
} from '../../lib/scraper/LapakSosmed.js';
import util from 'util';

const Tio = async (m, {
    conn,
    usedPrefix,
    command,
    args,
    text
}) => {
    const {
        api_id,
        api_key
    } = global.smm['lapak'];

    switch (command) {
        case "lapak_list":
            if (!args[0]) {
                return m.reply(`Mau dikirim lewat apa ka?\n1. Document\n2. Chat\n\nContoh: ${command} 1`);
            }

            try {
                const data = await new follSun(api_id, api_key).cekServices("SMM");
                const produk = data.data.map(txt1 => {
                    return `ID: ${txt1.id}\nProduct Name: ${txt1.name}\nDeskripsi: ${txt1.description}\nHarga: Rp ${txt1.price}\nCategory: ${txt1.category}\nMin Order: ${txt1.min}\nMax Order: ${txt1.max}\n\n`;
                }).join("");

                if (args[0] === '1') {
                    conn.sendMessage(m.chat, {
                        document: Buffer.from(produk, "utf8"),
                        fileName: "list-produk.txt",
                        caption: "List Ada Di Dalam File Ini",
                        mimetype: "text/plain"
                    }, {
                        quoted: m
                    });
                } else if (args[0] === '2') {
                    m.reply(produk);
                } else {
                    m.reply(`Perintah tidak ditemukan\nMasukkan perintah berikut:\n1. Document\n2. Chat\n\nContoh: ${command} 1`);
                }
            } catch (error) {
                m.reply(`Terjadi kesalahan: ${util.format(error)}`);
            }
            break;

        case "lapak_order":
            if (!text) {
                return m.reply(`Silahkan isi format berikut:\n\n${usedPrefix + command} ID Layanan,Jumlah Pesanan,Link Tujuan`);
            }

            const [id_tujuan, jumlah_pesanan, link_tujuan] = text.split(",");

            if (!id_tujuan || !jumlah_pesanan || !link_tujuan) {
                return m.reply(`Format salah!!\nSilahkan isi sesuai format:\n\n${usedPrefix + command} ID Layanan,Jumlah Pesanan,Link Tujuan`);
            }

            try {
                const data = await new follSun(api_id, api_key).order(id_tujuan, link_tujuan, jumlah_pesanan);
                const mesk = data.data;
                m.reply(util.format(mesk));
                console.log(data);
            } catch (err) {
                m.reply(util.format(err.response.data));
            }
            break;

        case "lapak_cek":
            if (!text) {
                return m.reply(`Example: ${usedPrefix + command} IdTransaksi`);
            }

            try {
                const data = await new follSun(api_id, api_key).cekStatus(text);
                const meski = data.data;
                m.reply(util.format(meski));
            } catch (error) {
                m.reply(util.format(error.response.data));
            }
            break;

    }
};

Tio.help = Tio.command = ['lapak_list', 'lapak_cek', 'lapak_order'];
Tio.tags = ['topup'];
Tio.owner = true;

export default Tio;