let Tio = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `${usedPrefix + command} q big cat with sharp teeth`;
    await m.react('🕒');

    try {
        const res = await fetch(`https://api.maelyn.tech/api/blackbox/imagine?prompt=${encodeURIComponent(text)}&apikey=galih`);
        
        // Pastikan untuk memeriksa apakah respons dari API berhasil
        if (!res.ok) throw new Error('Gagal mendapatkan gambar dari API');

        const data = await res.json(); // Mengambil data JSON dari respons
        if (!data.result || !data.result.url) throw new Error('URL gambar tidak ditemukan');

                conn.sendMessage(m.chat, {
            image: { url: data.result.url },
            caption: `Sukses`
        }, { quoted: m });
        m.react('✅');
    } catch (e) {
        console.error(e);
        conn.reply(m.chat, "Terjadi kesalahan saat mengambil gambar: " + e.message, m);
    }
}

Tio.help = ['blackboximage'];
Tio.tags = ['ai'];
Tio.register = Tio.limit = true;
Tio.command = /^(b(lack)?b(ox)?im(a)?g(e)?)$/i;

export default Tio;