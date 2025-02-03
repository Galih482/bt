let Tio = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Perintah ini menghasilkan gambar berdasarkan teks yang diberikan\n\n*Contoh penggunaan:*\n*${usedPrefix + command} <prompt/text>*`;

    const prompt = text.trim();

    if (!prompt) throw `Perintah ini menghasilkan gambar berdasarkan teks yang diberikan\n\n*Contoh penggunaan:*\n*${usedPrefix + command} <prompt/text>*`;

    await m.react('🕒');

    try {
        const res = await fetch(`https://api.maelyn.tech/api/cai/createimage?prompt=${encodeURIComponent(prompt)}&apikey=galih`);
        
        // Pastikan untuk memeriksa apakah respons dari API berhasil
        if (!res.ok) throw new Error('Gagal mendapatkan gambar dari API');

        const data = await res.json();
        conn.sendMessage(m.chat, {
            image: { url: data.result.url },
            caption: `*Sukses! Gambar telah dihasilkan*`
        }, { quoted: m });
        m.react('✅');
    } catch (e) {
        console.error(e);
        conn.reply(m.chat, "Terjadi kesalahan saat mengambil gambar: " + e.message, m);
    }
}

Tio.help = ['cimgai'];
Tio.tags = ['ai'];
Tio.register = Tio.limit = true;
Tio.command = /^(cimgai)$/i;

export default Tio;
