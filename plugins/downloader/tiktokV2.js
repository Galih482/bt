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

        if (result.images) {
            await m.reply('Terdeteksi TikTok slide!');
            for (let imageUrl of result.images) {
                await conn.sendMessage(
                    m.chat, 
                    { image: { url: imageUrl }, caption: result.title }, 
                    { quoted: m }
                );
            }
        } else {
            await m.reply('Terdeteksi TikTok video!');
            await conn.sendMessage(
                m.chat, 
                { 
                    video: { url: result.play }, 
                    caption: `*${result.title}*\n\n
👤: ${result.author.nickname}
▶️: ${result.play_count}
👍: ${result.digg_count}
💬: ${result.comment_count}
🔄: ${result.share_count}
⬇️: ${result.download_count}
📌: ${result.collect_count}` 
                }, 
                { quoted: m }
            );
        }
    } catch (error) {
        m.reply('Maaf, terjadi kesalahan.');
        console.error(error);
    }
};

Tio.help = ["tiktok-v2"];
Tio.tags = ['downloader'];
Tio.command = /^(t(ik)?t(ok)?(-)?v2)$/i;

export default Tio;