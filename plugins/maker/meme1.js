/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import Jimp from "jimp";

let Tio = async (m, {
    conn,
    text,
    command,
    usedPrefix
}) => {

    if (!text) return m.reply(await Func.exam(usedPrefix, command, 'text1|text2'));

    const [text1, text2] = text.split("|");
    if (!text1 || !text2) return m.reply(await Func.exam(usedPrefix, command, 'text1|text2'))
    if (text1.length > 12 || text2.length > 12) return m.reply('Maximal teks hanya 13 karakter');

    const buffer = await create(text1, text2);
    await conn.sendFile(m.chat, buffer, '', command, m);
}
Tio.help = Tio.command = ['meme1']
Tio.tags = ['maker']
export default Tio


async function create(text, text2) {
    try {
        const image = await Jimp.read('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA_7-yyMAOlef1gtRyl1I3Jh_R1AeuffIa1rAZGh7qCzb9DIY_rU6Ux8Rh&s=10');

        const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
        image.print(font, 300, 100, text);
        image.print(font, 300, 380, text2);
        const buffer = await image.getBufferAsync(Jimp.MIME_JPEG);
        return buffer
    } catch (error) {
        console.error('Error processing image:', error);
        throw error;
    }
}