/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import fs from 'fs';
import path from 'path';
import os from 'os';
import Jimp from 'jimp';

let Tio = async (m, { conn, text }) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    
    if (!mime) throw 'No media found';
    
    let media = await q.download();

    if (!text) return m.reply('Masukkan teks untuk meme');

    const tmpDir = path.join(os.tmpdir(), 'meme');
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

    const tmpFilePath = path.join(tmpDir, 'background.jpg');

    fs.writeFileSync(tmpFilePath, media);

    const background = await Jimp.read(tmpFilePath);

    const textBackgroundHeight = 150; 
    const memeWidth = background.bitmap.width;
    const memeHeight = background.bitmap.height + textBackgroundHeight;

    const memeCanvas = new Jimp(memeWidth, memeHeight, 0xffffffff); 

    const textBackground = new Jimp(memeWidth, textBackgroundHeight, 0xffffffff);

    let fontHeader = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK); 
    let headerText = text;

    const maxWidth = memeWidth - 20;

    let fontSize = 64;
    if (headerText.length > 45) {
        fontSize = 32;
    }
    if (headerText.length > 70) {
        fontSize = 16;
    }
    if (headerText.length > 120) {
        fontSize = 8;
    }

    fontHeader = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK); 
    textBackground.print(
        fontHeader,
        10,
        8,
        {
            text: headerText,
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
            maxWidth: maxWidth,
        },
        memeWidth,
        textBackgroundHeight
    );

    memeCanvas.composite(textBackground, 0, 0);
    memeCanvas.composite(background, 0, textBackgroundHeight);

    const buffer = await memeCanvas.getBufferAsync(Jimp.MIME_JPEG);

    await conn.sendFile(m.chat, buffer, 'meme.jpg', 'Ini dia memenya!', m);
    console.log('Meme sent successfully!');

    fs.unlinkSync(tmpFilePath);
    console.log('Temporary file deleted');
};

Tio.help = Tio.command = ['meme'];
Tio.tags = ['maker'];

export default Tio;