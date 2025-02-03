import fetch from 'node-fetch';

let Tio = async (m, { command, usedPrefix, conn, text, args }) => {
    if (!text) {
        return m.reply('Perintah ini menghasilkan story/cerita berdasarkan teks yang diberikan\n\n*Contoh penggunaan:*\n*.storygenerator <topic/text> | <writing> | <genre>*\n\n*List Writing:*\n- standar\n- complex\n- creative\n- simple\n\n*List Genre:*\n- Science Fiction\n- Mystery\n- Fantasy\n- Descriptive\n*Gunakan | Sebagai Pemisah*\n*Abaikan Tanda <>*');
    }

    // Memisahkan teks, writing, dan genre menggunakan '|'
    const params = text.split('|').map(param => param.trim());
    const topic = params[0]; // Teks utama
    const writing = params[1] || 'creative'; // Default ke 'Writing_Story' jika tidak ada
    const genre = params[2] || 'Mystery'; // Default ke 'Genre_Story' jika tidak ada

    if (!topic) {
        return m.reply('Teks utama tidak boleh kosong.');
    }

    if (typeof m.react === 'function') {
        await m.react('🔍'); // Tambahkan reaksi emoji
    }

    try {
        const url = `https://api.maelyn.tech/api/storygenerator?topic=${encodeURIComponent(topic)}&writing=${encodeURIComponent(writing)}&genre=${encodeURIComponent(genre)}&apikey=galih`;

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

Tio.help = ['storygenerator'];
Tio.tags = ['ai'];
Tio.register = Tio.limit = true;
Tio.command = /^(storygen|storygenerator)$/i;
export default Tio;