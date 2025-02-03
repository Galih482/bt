/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import axios from 'axios';

let Tio = async (m, { conn, text, usedPrefix, command }) => {
    conn.lahelu = conn.lahelu ? conn.lahelu : {};
    conn.helu = conn.helu ? conn.helu : {};
    let id = m.sender;

    if (!text) {
        return m.reply(`Gunakan seperti dibawah:\n*${usedPrefix + command} meme Spongebob*`);
    }

    try {
        const { data } = await axios.get('https://lahelu.com/api/post/get-search?query=' + encodeURIComponent(text));
        const datas = data.postInfos;

        if (!datas || datas.length === 0) {
            return m.reply('Tidak ada hasil ditemukan.');
        }

        let result = datas.map((item) => ({
            author: item.userUsername,
            judul: item.title,
            media: item.media
        }));

        conn.lahelu[id] = result.map(v => v.media);

        conn.helu[id] = [
            await conn.sendMessage(m.chat, { image: { url: datas[0].media }, caption: `*Reply pesan ini dengan mengetik angka*:\n\n${result.map((item, index) => `\n${index + 1}.*Title*: ${item.judul}\n*Author:* ${item.author}`).join("\n")}` }, { quoted: m})
        ];
    } catch (e) {
        console.error(e);
        m.reply('Terjadi kesalahan saat mengambil data. Silakan coba lagi nanti.');
    }
};

Tio.before = async (m) => {
    conn.lahelu = conn.lahelu ? conn.lahelu : {};
    conn.helu = conn.helu ? conn.helu : {};
    let id = m.sender;

    if (!conn.lahelu[id]) return;
    if (!m.quoted) return;

    if (m.quoted.id === conn.helu[id][0].id) {
        let hasil = conn.lahelu[id][m.text.toLowerCase() - 1];
        try {
            m.reply('Sedang memproses...');
            await conn.sendFile(m.chat, hasil, '', "*Lahelu meme*", m);
            delete conn.lahelu[id];
            delete conn.helu[id];
        } catch (e) {
            console.error(e); 
            m.reply('Terjadi kesalahan saat mengirim file. Silakan coba lagi.');
        }
    }
};

Tio.help = Tio.command = ['lahelu'];
Tio.tags = ['internet'];
Tio.limit = true;

export default Tio;