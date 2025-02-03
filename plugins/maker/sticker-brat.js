/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

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

    if (text.includes('--gif')) {
    try {
        await m.reply(msg.wait);
        const txt = teks.replace('--gif', '').trim();
        const words = txt.split(" ");
        const tempDir = path.join(process.cwd(), "tmp");
        if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
        const framePaths = [];

        for (let i = 0; i < words.length; i++) {
            const currentText = words.slice(0, i + 1).join(" ");

            const res = await Func.fetchBuffer(`${global.APIs["Tixo"]}/tools/brat?text=${encodeURIComponent(currentText)}`);

            const framePath = path.join(tempDir, `frame${i}.mp4`);
            fs.writeFileSync(framePath, res);
            framePaths.push(framePath);
        }

        const fileListPath = path.join(tempDir, "filelist.txt");
        let fileListContent = "";

        for (let i = 0; i < framePaths.length; i++) {
            fileListContent += `file '${framePaths[i]}'\n`;
            fileListContent += `duration 0.5\n`; // Durasi setiap frame 500 milidetik
        }

        fileListContent += `file '${framePaths[framePaths.length - 1]}'\n`;
        fileListContent += `duration 3\n`; // Frame terakhir memiliki durasi 3 detik

        fs.writeFileSync(fileListPath, fileListContent);

        const outputVideoPath = path.join(tempDir, "output.mp4");
        execSync(
            `ffmpeg -y -f concat -safe 0 -i ${fileListPath} -vf "fps=30" -c:v libx264 -preset veryfast -pix_fmt yuv420p -t 00:00:10 ${outputVideoPath}`,
        );

        const stik = await createSticker(false, outputVideoPath, info.author, info.packname, 20)
        conn.sendFile(m.chat, stik, '', '', m)

        framePaths.forEach((filePath) => fs.unlinkSync(filePath));
        fs.unlinkSync(fileListPath);
        fs.unlinkSync(outputVideoPath);
    } catch (err) {
        console.error(err);
        m.reply("Maaf, terjadi kesalahan saat memproses permintaan.");
    }
} else {
    try {
        await m.react('🕒')
        let result = await API(APIs["Tixo"], '/tools/brat', {
            text: teks
        })
        let stiker = await createSticker(false, result, global.info.packname, global.info.author, 50)
        if (stiker) await conn.sendFile(m.chat, stiker, '', info.author, m)
        m.react('✅')
    } catch (e) {
        m.reply(msg.error)
    }
}
}

Tio.help = ['brat']
Tio.tags = ['sticker', 'tools']
Tio.command = /^(brat)$/i
Tio.limit = true

export default Tio

async function createSticker(img, url, packName, authorName, quality) {
    let stickerMetadata = {
        type: 'crop',
        pack: packName,
        author: authorName,
        quality
    }
    return (new Sticker(img ? img : url, stickerMetadata)).toBuffer()
}