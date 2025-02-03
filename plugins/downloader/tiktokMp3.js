/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import axios from 'axios';

let Tio = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(await Func.exam(usedPrefix, command, 'https://vt.tiktok.com/ZSYgBPSLD/'))

    try {
        await m.reply(msg.wait);
        
        let json = await Func.fetchJson(API(APIs['Tixo'], '/downloader/tiktok', { url: text }))
        let { data: result } = json;

        let image = await conn.sendMessage(m.chat, {image: {url: result.cover}, caption: `*${result.music_info.title}*\n\n
- Id: ${result.music_info.id}
- Author: ${result.music_info.author}
- Original: ${result.music_info.original}
- Album: ${result.music_info.album}
- Duration: ${result.music_info.duration}`}, {quoted: m});

await conn.sendMessage(m.chat, {audio: {url: result.music}, mimetype: 'audio/mpeg', ptt: false}, {quoted: image});
    } catch (error) {
        m.reply('Maaf, terjadi kesalahan.');
        console.error(error);
    }
};

Tio.help = ["tiktokmp3"];
Tio.tags = ['downloader'];
Tio.command = /^(t(ik)?t(ok)audio|t(ik)?t(ok)?mp3)$/i;

export default Tio;