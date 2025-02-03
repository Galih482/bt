/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import fetch from 'node-fetch';
import { sticker } from '../../lib/sticker.js';

const Tio = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) {
        throw `URL-nya mana?\n\nContoh:\n${usedPrefix + command} https://t.me/addstickers/namapack`;
    }
    if (!/^https:\/\/t\.me\/addstickers\/[a-zA-Z0-9_]+$/.test(text)) {
        throw `URL salah. Pastikan menggunakan format yang benar.\nContoh: https://t.me/addstickers/namapack`;
    }

    let packName = text.replace("https://t.me/addstickers/", "");

    try {
        let response = await fetch(
            `https://api.telegram.org/bot7857998510:AAFIF9KFaxIeaiK5QgD7xG8c_GrN4FLBnX0/getStickerSet?name=${encodeURIComponent(packName)}`,
            {
                method: "GET",
                headers: { "User-Agent": "GoogleBot" }
            }
        );

        if (!response.ok) {
            throw new Error(`Gagal mengambil data stiker. Status: ${response.status}`);
        }

        let json = await response.json();
        if (!json.ok || !json.result || !json.result.stickers) {
            throw new Error(`Data stiker tidak valid atau kosong.`);
        }

        let totalStickers = json.result.stickers.length;
        m.reply(
            `*Total Stiker:* ${totalStickers}\n` +
            `*Estimasi Selesai:* ${totalStickers * 1.5} detik`.trim()
        );

        for (let stickerData of json.result.stickers) {
            if (!stickerData.thumb || !stickerData.thumb.file_id) {
                console.warn(`Stiker tanpa thumb ditemukan. Melewatkan...`);
                continue;
            }

            let fileId = stickerData.thumb.file_id;
            let fileResponse = await fetch(
                `https://api.telegram.org/bot7857998510:AAFIF9KFaxIeaiK5QgD7xG8c_GrN4FLBnX0/getFile?file_id=${fileId}`
            );

            if (!fileResponse.ok) {
                console.error(`Gagal mendapatkan file untuk stiker dengan ID: ${fileId}`);
                continue;
            }

            let fileJson = await fileResponse.json();
            if (!fileJson.ok || !fileJson.result || !fileJson.result.file_path) {
                console.error(`Respons file tidak valid untuk stiker dengan ID: ${fileId}`);
                continue;
            }

            let filePath = fileJson.result.file_path;

            let stiker = await sticker(
                false,
                `https://api.telegram.org/file/bot7857998510:AAFIF9KFaxIeaiK5QgD7xG8c_GrN4FLBnX0/${filePath}`,
                global.info.packname || "Packname",
                global.info.author || "Author"
            );

            await conn.sendMessage(m.chat, { sticker: stiker });
            await delay(1500); 
        }

        m.reply('_*Selesai*_');
    } catch (error) {
        console.error(error);
        throw `Terjadi kesalahan saat memproses stiker: ${error.message}`;
    }
};

Tio.help = ['stikertelegram'];
Tio.tags = ['sticker'];
Tio.command = /^(s(ticker|tiker)?tele(gram)?)$/i;
Tio.limit = true;
Tio.premium = true;

export default Tio;

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));