import { Sticker } from 'wa-sticker-formatter';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

let Tio = async (m, { conn, text, usedPrefix, command }) => {
    let teks;
    let style = '1'; // Gaya default
    let mode = 'center'; // Mode default

    // Memeriksa apakah pengguna memberikan input dengan pemisah '|'
    const args = text.split('|');
    if (args.length > 0) {
        teks = args[0].trim(); // Argumen pertama adalah teks
        if (args.length > 1) {
            style = args[1].trim(); // Argumen kedua adalah style
            if (args.length > 2) {
                mode = args[2].trim(); // Argumen ketiga adalah mode
            }
        }
    } else if (m.quoted && m.quoted.text) {
        teks = m.quoted.text;
    } else if (!text && !m.quoted) {
        return m.reply('*Contoh : .furbrat text|style|mode*\n\n```List Style/Karakter : 1-8```\n```List Mode :```\n ➠ center\n ➠ justify\n ➠ left\n ➠ right\n*Gunakan | sebagai pemisah*');
    }

    await m.react('🕒');
    try {
        // Menambahkan params style dan mode
        const response = await axios.get("https://fastrestapis.fasturl.link/tool/furbrat", {
            params: { 
                text: teks,
                style: style, // Menggunakan style yang diberikan pengguna
                mode: mode    // Menggunakan mode yang diberikan pengguna
            },
            responseType: "arraybuffer"
        });

        const image = Buffer.from(response.data);
        if (image.length <= 10240) {
            return m.reply("Gagal menghasilkan furbrat");
        }

        // Membuat stiker dari gambar
        const sticker = new Sticker(image, {
            pack: 'My Sticker Pack',
            author: 'Galihz',
            keepScale: true,
            quality: 100,
            type: 'full'
        });

        // Menghasilkan stiker
        const stickerBuffer = await sticker.toBuffer();

        // Mengirim stiker kembali
        await conn.sendFile(m.chat, stickerBuffer, m);
        m.react('✅');
    } catch (e) {
        console.error(e);
        return m.reply('*Contoh : .furbrat text|style|mode*\n\n```List Style/Karakter : 1-8```\n```List Mode :```\n ➠ center\n ➠ justify\n ➠ left\n ➠ right\n*Gunakan | sebagai pemisah*');
    }
};

Tio.help = ['furbrat <teks|style|mode>'];
Tio.tags = ['sticker', 'tools'];
Tio.command = /^(furbrat)$/i;
Tio.limit = true;

export default Tio;

async function createSticker(img, url, packName, authorName, quality) {
    let stickerMetadata = {
        type: 'crop',
        pack: packName,
        author: authorName,
        quality
    };
    return (new Sticker(img ? img : url, stickerMetadata)).toBuffer();
}