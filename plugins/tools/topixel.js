import fetch from 'node-fetch';
import uploadImage from '../../lib/uploadImage.js';

let Tio = async (m, { conn, usedPrefix, command }) => {
  try {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || '';
    
    if (/^image/.test(mime) && !/webp/.test(mime)) {
      await m.react('🕒');
      
      // Download the image from the quoted message
      const img = await q.download();
      
      // Upload the image to a hosting service
      const out = await uploadImage(img);
      
      // Send the upscale request to the API
      const api = await fetch(`https://api.maelyn.tech/api/topixelart?url=${out}&apikey=galih`);
      const image = await api.json();
      
      // Check the API response
      if (image.status === "Success" && image.code === 200) {
        const { url } = image.result;

        // Check for command options
        if (m.text.includes('--sticker')) {
          // Send as Sticker
          await conn.sendFile(m.chat, url, 'upscaled-image.webp', 
            `Succes`, m);
        } else if (m.text.includes('--image')) {
          // Send as Image
          await conn.sendMessage(m.chat, {
            image: { url: url },
            caption: '`Succes`'
          }, { quoted: m });
        } else {
          // Default action if no option is provided
          await conn.sendMessage(m.chat, {
            image: { url: url },
            caption: '`Succes`'
          }, { quoted: m });
        }

        await m.react('✅');
      } else {
        throw new Error(`API mengembalikan status gagal: ${image.message || 'Tidak diketahui'}`);
      }
    } else {
      m.reply(`Kirim gambar yang valid untuk diproses!\n\nContoh penggunaan:\nBalas gambar dengan perintah:\n${usedPrefix + command} --sticker atau ${usedPrefix + command} --image`);
    }
  } catch (e) {
    console.error(e);
    m.reply(`Terjadi kesalahan:\n${e.message}\n\nPastikan Anda mengirim gambar yang valid.`);
  }
};

Tio.help = ['topixel'];
Tio.tags = ['tools'];
Tio.register = Tio.limit = true;
Tio.command = /^(topixel)$/i;

export default Tio;