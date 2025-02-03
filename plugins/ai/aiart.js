let Tio = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Perintah ini menghasilkan gambar berdasarkan teks yang diberikan\n\n*Contoh penggunaan:*\n*${usedPrefix + command} <prompt/text> | <resolution> | <model>*\n\n*List Resolution:*\n- Square\n- Wide\n- Portrait\n\n*List Model:*\n- None\n- Cinematic\n- Photographic\n- Anime\n- Manga\n- Digital Art\n- Pixel art\n- Fantasy art\n- Neonpunk\n- 3D Model\n*Gunakan | Sebagai Pemisah*\n*Abaikan Tanda <>*`;
    const args = text.split('|');
    const prompt = args[0].trim();
    const resolution = args[1] ? args[1].trim() : 'Wide';
    const model = args[2] ? args[2].trim() : 'Anime';

    if (!prompt) throw `Perintah ini menghasilkan gambar berdasarkan teks yang diberikan\n\n*Contoh penggunaan:*\n*${usedPrefix + command} <prompt/text> | <resolution> | <model>*\n\n*List Resolution:*\n- Square\n- Wide\n- Portrait\n\n*List Model:*\n- None\n- Cinematic\n- Photographic\n- Anime\n- Manga\n- Digital Art\n- Pixel art\n- Fantasy art\n- Neonpunk\n- 3D Model\n*Gunakan | Sebagai Pemisah*\n*Abaikan Tanda <>*`;
    await m.react('🕒');

    try {
        const res = await fetch(`https://api.maelyn.tech/api/animeart?prompt=${encodeURIComponent(prompt)}&resolution=${encodeURIComponent(resolution)}&model=${encodeURIComponent(model)}&apikey=galih`);
        
        // Pastikan untuk memeriksa apakah respons dari API berhasil
        if (!res.ok) throw new Error('Gagal mendapatkan gambar dari API');

        const data = await res.json();
conn.sendMessage(m.chat, {
    image: { url: data.result.image.url },
    caption: `*Sukses! Gambar telah dihasilkan dengan:*\n\n- *Prompt*: ${data.result.info.prompt}\n- *Resolusi*: ${data.result.info.resolution}\n- *Model*: ${data.result.info.Model.Model}\n- *Style*: ${data.result.info.sdxl_style}`
}, { quoted: m });
        m.react('✅');
    } catch (e) {
        console.error(e);
        conn.reply(m.chat, "Terjadi kesalahan saat mengambil gambar: " + e.message, m);
    }
}

Tio.help = ['aiart', 'animeart'];
Tio.tags = ['ai'];
Tio.register = Tio.limit = true;
Tio.command = /^(aiart|animeart|animart)$/i;

export default Tio;