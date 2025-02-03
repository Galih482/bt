import fetch from 'node-fetch';

let Tio = async (m, { command, usedPrefix, conn, text, args }) => {
    if (!text) {
        return m.reply('Masukkan teks untuk query.');
    }

    if (typeof m.react === 'function') {
        await m.react('🔍'); // Tambahkan reaksi emoji
    }

    try {
        const url = `https://api.maelyn.tech/api/blackbox/chat?q=${encodeURIComponent(text)}&apikey=galih`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Gagal mengambil data dari API. Status: ' + response.status);
        }

        const ai = await response.json();
        const res = ai.result || "Tidak ada respons yang valid dari API.";

        await conn.reply(m.chat, res, m);
        if (typeof m.react === 'function') {
            await m.react('✅'); // Reaksi sukses
        }
    } catch (error) {
        console.error('Error:', error.message || error);
        await m.reply('Terjadi kesalahan: ' + (error.message || 'Error tidak diketahui.'));
        if (typeof m.react === 'function') {
            await m.react('❌'); // Reaksi kesalahan
        }
    }
};

Tio.help = ['blackbox']
Tio.tags = ['ai']
Tio.register = Tio.limit = true
Tio.command = /^(b(lack)?b(ox)?)$/i
export default Tio