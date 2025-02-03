/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/
/* wm sikit😹😹
Plugin lirik lagu type ESM
𝘚𝘶𝘮𝘣𝘦𝘳?
𝘊𝘩: https://whatsapp.com/channel/0029VagEmD96hENqH9AdS72V/335
*/

import axios from 'axios';

let Tio = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    if (!text) throw `Penggunaan: ${usedPrefix}${command} <Judul Lagu>\nContoh: ${usedPrefix}${command} Jiwa yang bersedih`;

    try {
        const { data } = await axios.get(`https://btch.us.kg/lirik?text=${encodeURIComponent(text)}`);
        if (!data?.result) throw 'Lirik tidak ditemukan.';

        const { lyrics, title, artist, thumbnail, url, releasedAt } = data.result;

        const caption = `
┌ ▸ *Judul*   : ${title}
│ ▸ *Artis*   : ${artist}
│ ▸ *Dirilis* : ${releasedAt || 'Tidak tersedia'}
└ ▸ *Detail*  : (${url})

${lyrics}`;

        await conn.sendMessage(m.chat, {
            text: caption,
            contextInfo: {
                externalAdReply: {
                    title: `${title} - ${artist}`,
                    body: "Klik untuk detail lagu",
                    thumbnailUrl: thumbnail,
                    sourceUrl: url,
                },
            },
        });
    } catch (e) {
        console.error(e);
        m.reply('❌ Terjadi kesalahan saat mengambil lirik. Silakan coba lagi nanti.');
    }
};
Tio.help = ['lirik']
Tio.tags = ['internet']
Tio.command = /^(lyric(s)?(lagu)?|lirik(lagu)?)$/i

export default Tio