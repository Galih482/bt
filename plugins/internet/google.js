/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import axios from 'axios';

let Tio = async (m, { conn, args }) => {
  const query = args.join(' ');
  if (!query) return m.reply('Silakan masukkan kata kunci pencarian.');

  await m.reply(msg.wait);
  const results = await google(query);
  if (!results || results.length === 0) return m.reply('Tidak ada hasil ditemukan.');

  let message = '*Hasil Pencarian Google*\n\n';
  for (let result of results) {
    const title = result.title || 'Judul tidak tersedia';
    const snippet = result.snippet || 'Deskripsi tidak tersedia';
    const link = result.link || 'Link tidak tersedia';

    message += `📌 *${title}*\n`;
    message += `_Deskripsi:_ ${snippet}\n`;
    message += `_Link:_ ${link}\n\n`;
  }

  await conn.sendMessage(m.chat, {
    image: { url: 'https://cdn.icon-icons.com/icons2/2699/PNG/512/google_logo_icon_170071.png' },
    caption: message.trim(),
  });
};

Tio.help = Tio.command = ['google'];
Tio.tags = ['internet'];
Tio.limit = true;

export default Tio;

async function google(query) {
  try {
    const response = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
      params: {
        q: query,
        key: 'AIzaSyAajE2Y-Kgl8bjPyFvHQ-PgRUSMWgBEsSk', 
        cx: 'e5c2be9c3f94c4bbb',
      },
    });
    return response.data.items || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}