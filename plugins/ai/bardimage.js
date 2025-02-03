import fetch from 'node-fetch';
import uploadImage from '../../lib/uploadImage.js';

let Tio = async (m, { conn, text, usedPrefix, command }) => {
  try {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || '';

    if (/^image/.test(mime) && !/webp/.test(mime)) {
      await m.react('🕒');

      const img = await q.download();
      if (!img) throw new Error('Gagal mengunduh gambar.');

      const out = await uploadImage(img);
      if (!out) throw new Error('Gagal mengunggah gambar.');

      const queryParam = text || 'gambar apa ini';
      const apiURL = `https://api.maelyn.tech/api/blackbox/image?url=${out}&q=${encodeURIComponent(queryParam)}&apikey=galih`;

      const apiResponse = await fetch(apiURL);
      if (!apiResponse.ok) throw new Error('Gagal menghubungi API.');

      const image = await apiResponse.json();

      if (image.status === "Success" && image.code === 200) {
        const { result, powered } = image;

        await conn.sendMessage(
          m.chat,
          {
            image: { url: out }, // Gunakan URL gambar yang diunggah
            caption: `${result}`, // Gunakan hasil deskripsi dari API
          },
          { quoted: m }
        );
        await m.react('✅');
      } else {
        throw new Error(`API mengembalikan status gagal: ${image.message || 'Tidak diketahui'}`);
      }
    } else {
      m.reply(
        `Kirim gambar yang valid untuk diproses!\n\nContoh penggunaan:\nBalas gambar dengan perintah:\n${usedPrefix + command} [teks opsional]`
      );
    }
  } catch (e) {
    console.error(e);
    m.reply(`Terjadi kesalahan:\n${e.message}\n\nPastikan Anda mengirim gambar yang valid.`);
  }
};

Tio.help = ['bardimg'];
Tio.tags = ['ai'];
Tio.register = true;
Tio.limit = true;
Tio.command = /^(bardimg)$/i;

export default Tio;
