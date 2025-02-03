import fetch from 'node-fetch';

let Tio = async (m, { command, usedPrefix, conn, text, args }) => {
    if (!text) {
        return m.reply('Masukkan teks untuk query.');
    }

    if (typeof m.react === 'function') {
        await m.react('🔍'); // Tambahkan reaksi emoji
    }

    try {
        const url = `https://aihub.xtermai.xyz/api/chat/bard?query=${encodeURIComponent(text)}&key=AIzaaIQ1kEueoBkB2ZCM`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Gagal mengambil data dari API. Status: ' + response.status);
        }

        const ai = await response.json();
        const res = ai.chatUi || "Tidak ada respons yang valid dari API.";

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

Tio.help = ["bard"];
Tio.tags = ["ai"];
Tio.command = /^(bard)$/i;
Tio.limit = true;

export default Tio;
