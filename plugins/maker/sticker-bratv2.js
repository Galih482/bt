/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import { Sticker } from 'wa-sticker-formatter';

let Tio = async (m, { conn, text, usedPrefix, command }) => {
    let teks, color = '#0000FF'; 

    if (m.quoted && m.quoted.text) {
        teks = m.quoted.text;
    } else if (text) {
        let args = text.split('--');
        teks = args[0].trim();
        if (args[1]) {
            let inputColor = args[1].trim().toLowerCase();
            const VALID_COLORS = {
                biru: '#0000FF',
                merah: '#FF0000',
                hijau: '#00FF00',
                kuning: '#FFFF00',
                hitam: '#000000',
                putih: '#FFFFFF',
                'abu-abu': '#808080',
                cyan: '#00FFFF',
                magenta: '#FF00FF',
                oranye: '#FFA500',
                ungu: '#800080',
                cokelat: '#A52A2A',
                pink: '#FFC0CB',
                emas: '#FFD700',
                perak: '#C0C0C0',
                lime: '#32CD32',
                olive: '#808000',
                teal: '#008080',
                navy: '#000080',
            };

            // Validasi warna
            if (VALID_COLORS[inputColor]) {
                color = VALID_COLORS[inputColor];
            } else if (/^#[0-9A-F]{6}$/i.test(inputColor)) {
                color = inputColor; // Jika format hex valid
            } else {
                return m.reply(
                    `Warna tidak valid. Gunakan salah satu dari:\n\n` +
                    `${Object.keys(VALID_COLORS).map(c => `- ${c}`).join('\n')}`
                );
            }
        }
    } else if (!text && !m.quoted) {
        return m.reply('Reply atau masukkan teks.');
    }

    try {
        await m.reply(msg.wait);
        let result = await API(APIs["Tixo"], '/tools/maker1', {
            text: teks,
            bg: color
        });
        let stiker = await createSticker(false, result, global.info.packname, global.info.author, 50);
        if (stiker) await conn.sendFile(m.chat, stiker, '', global.info.author, m);
    } catch (e) {
        m.reply(msg.error);
    }
};

Tio.help = ['bratv2'];
Tio.tags = ['sticker', 'tools'];
Tio.command = /^(bratv2)$/i;
Tio.limit = true;

export default Tio;

async function createSticker(img, url, packName, authorName, quality) {
    let stickerMetadata = {
        type: 'crop',
        pack: packName,
        author: authorName,
        quality,
    };
    return (new Sticker(img ? img : url, stickerMetadata)).toBuffer();
}