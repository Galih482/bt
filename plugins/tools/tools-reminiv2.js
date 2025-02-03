import fetch from 'node-fetch';
import uploadImage from '../../lib/uploadImage.js';

let Tio = async (m, { conn, usedPrefix, command }) => {
  try {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || '';
    if (/^image/.test(mime) && !/webp/.test(mime)) {
    await m.react('🕒')
      
      // Download the image from the quoted message
      const img = await q.download();
      
      // Upload the image to a hosting service
      const out = await uploadImage(img);
      
      // Send the upscale request to the API
      const api = await fetch(`https://api.maelyn.tech/api/upscale?url=${out}&apikey=galih`);
      const image = await api.json();
      
      if (image.status === "Success" && image.code === 200) {
        const { url, size, expired } = image.result;
        
        // Send the upscaled image back to the user
        await conn.sendFile(m.chat, url, 'upscaled-image.png', `*Gambar berhasil di-upscale!*\n\n- *Ukuran:* ${size}\n- *Expired:* ${expired}`, m);
        m.react('✅')
      } else {
        throw new Error(`API mengembalikan status gagal: ${image.message || 'Tidak diketahui'}`);
      }
    } else {
      m.reply(`Kirim gambar yang valid untuk diproses!\n\nContoh penggunaan:\nBalas gambar dengan perintah:\n${usedPrefix + command}`);
    }
  } catch (e) {
    console.error(e);
    m.reply(`Terjadi kesalahan:\n${e.message}\n\nPastikan Anda mengirim gambar yang valid.`);
  }
}

Tio.help = ['hd', 'hdr']
Tio.tags = ['tools']
Tio.register = Tio.limit = true
Tio.command = /^(hd|hdr|remini)$/i
export default Tio
