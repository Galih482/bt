import {
    Sticker
} from 'wa-sticker-formatter';
import {
    execSync
} from "child_process"
import fs from "fs"
import path from "path"

let Tio = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    let teks
    if (m.quoted && m.quoted.text) {
        teks = m.quoted.text
    } else if (text) {
        teks = text
    } else if (!text && !m.quoted) return m.reply('reply / masukan teks');

    let captvid = `Pilih`;

    await conn.sendMessage(m.chat, {
        text: captvid,
        footer: `${global.info.nameBot}`,
        buttons: [{
            buttonId: `${usedPrefix}brat ${text}`,
            buttonText: {
                displayText: 'Gambar'
            }
        }, {
            buttonId: `${usedPrefix}bratvid ${text}`,
            buttonText: {
                displayText: "Video"
            }
        }],
        viewOnce: true
    }, {
        quoted: m
    });
};

Tio.help = ['bratv3'].map((v) => v + ' <query>');
Tio.tags = ['maker'];
Tio.command = /^(bratv3)$/i;
Tio.limit = true;
Tio.register = true;

export default Tio;