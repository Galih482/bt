let Tio = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Perintah ini menghasilkan gambar berdasarkan teks yang diberikan\n\n*Contoh penggunaan:*\n*${usedPrefix + command} <prompt/text> | <resolution>*\n\n*List Resolution:*\n- Square\n- Wide\n- Portrait\n\n*Gunakan | Sebagai Pemisah*\n*Abaikan Tanda <>*`;

    const args = text.split('|');
    const prompt = args[0].trim();
    const resolution = args[1] ? args[1].trim() : 'Wide';

    if (!prompt) throw `Perintah ini menghasilkan gambar berdasarkan teks yang diberikan\n\n*Contoh penggunaan:*\n*${usedPrefix + command} <prompt/text> | <resolution>*\n\n*List Resolution:*\n- Square\n- Wide\n- Portrait\n\n*Gunakan | Sebagai Pemisah*\n*Abaikan Tanda <>*`;

    await m.react('🕒');

    try {
        const res = await fetch(`https://api.maelyn.tech/api/dallexl?prompt=${encodeURIComponent(prompt)}&resolution=${encodeURIComponent(resolution)}&apikey=galih`);
        
        // Pastikan respons dari API berhasil
        if (!res.ok) throw new Error('Gagal mendapatkan gambar dari API');

        const data = await res.json();

        if (data.status !== "Success") throw new Error('API mengembalikan status gagal');

        conn.sendMessage(m.chat, {
            image: { url: data.result.url },
            caption: `*Sukses! Gambar telah dihasilkan:*\n\n- *Prompt*: ${prompt}\n- *Resolusi*: ${resolution}\n- *Ukuran*: ${data.result.size}`
        }, { quoted: m });

        m.react('✅');
    } catch (e) {
        console.error(e);
        conn.reply(m.chat, "Terjadi kesalahan saat mengambil gambar: " + e.message, m);
    }
}

Tio.help = ['dallexl'];
Tio.tags = ['ai'];
Tio.register = Tio.limit = true;
Tio.command = /^(dallexl)$/i;

export default Tio;
