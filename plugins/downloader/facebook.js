/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import kode from 'kode-scrape'
const { downloader } = kode;

let Tio = async (m, { conn, command, args, text, usedPrefix }) => {
    if (!text) return m.reply(await Func.exam(usedPrefix, command, 'https://www.facebook.com/100010929794713/posts/1885825845125057/'));

    try {
        await m.reply(msg.wait);
        let result = await downloader.facebook(text);

        let cap = `*${result.description}*\n\n乂 *F A C E B O O K*\n◃───────────▹\n*quality*: ${result.urls && result.urls[0] ? result.urls[0].quality.split(')')[0] + ')' : 'Unknown'}\n*url*: ${text}\n◃───────────▹`;

        await conn.sendMessage(m.chat, {
            video: await Func.fetchBuffer(result.urls && result.urls[1] ? result.urls[1].url : result.urls[0].url),
            caption: cap
        }, { quoted: m });
    } catch (e) {
        m.reply(msg.error);
    }
}

Tio.help = ['sd', 'hd'].map(v => `facebook ${v}`);
Tio.tags = ['downloader'];
Tio.command = /^(facebook|fbdl|fb|facebookdl)$/i;
Tio.limit = true;
Tio.register = true;

export default Tio;