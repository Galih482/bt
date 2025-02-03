/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import fs from 'fs';
import { webcrack } from 'webcrack';

let Tio = async (m, { text, usedPrefix, command }) => {
    let inputText;

    if (m.quoted && m.quoted.text) {
        inputText = m.quoted.text;
    } else if (text) {
        inputText = text;
    } else if (m.quoted && m.quoted.mimetype) {

        let fileBuffer = await m.quoted.download();
        if (!fileBuffer) throw 'Gagal mengunduh file, coba lagi!';
        inputText = fileBuffer.toString();
    } else {
        throw 'Balas dengan teks atau kirim teks langsung!';
    }

    try {
        let { code } = await webcrack(inputText);

        let resultFilePath = './tmp/result.js';
        await fs.writeFileSync(resultFilePath, code.replace('denc;', ''));

        let resultBuffer = await fs.readFileSync(resultFilePath);

        await m.reply(code.replace('denc;', ''));
        await conn.sendMessage(m.chat, {
            document: resultBuffer,
            mimetype: 'application/javascript',
            fileName: 'deobfuscated.js',
        }, { quoted: m });

        fs.unlinkSync(resultFilePath);
    } catch (e) {
        throw `Error saat memproses: ${e.message}`;
    }
};

Tio.help = ['deobfuscator'];
Tio.tags = ['tools'];
Tio.command = /^(deobfus(cator)?|denc(rypt)?)$/i;
Tio.register = true;
Tio.limit = true;

export default Tio;