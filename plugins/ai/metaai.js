import fetch from 'node-fetch';

let Tio = async (m, { command, usedPrefix, conn, text, args }) => {
    if (!text) {
        return m.reply("Masukkan promptnya.");
    }

    await m.react('🕘');

    try {
        const apiUrl = `https://api.maelyn.tech/api/metaai/art?prompt=${encodeURIComponent(text)}&apikey=galih`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === "Success") {
            const results = data.result;

            if (Array.isArray(results) && results.length > 0) {
                for (const item of results) {
                    // Cek dan kirim gambar jika ada
                    if (item.ImageUrl) {
                        await conn.sendMessage(
                            m.chat,
                            { image: { url: item.ImageUrl } },
                            { quoted: loadingMessage }
                        );
                    }

                    // Cek dan kirim video jika ada
                    if (item.VideoUrl) {
                        await conn.sendMessage(
                            m.chat,
                            {
                                video: { url: item.VideoUrl },
                                caption: "Video terkait gambar.",
                            },
                            { quoted: loadingMessage }
                        );
                    }
                }
            m.react('✅');
            } else {
                await m.reply("Tidak ada gambar atau video yang ditemukan dalam respons.");
            }
        } else {
            throw new Error(`Gagal mendapatkan hasil. Status: ${data.status}`);
        }
    } catch (error) {
        console.error("Error fetching API result:", error);
        await m.reply("Terjadi kesalahan saat mengambil hasil dari API. Silakan coba lagi nanti.");
    }
};

Tio.help = ['metaart'];
Tio.tags = ['ai'];
Tio.register = Tio.limit = true;
Tio.command = /^(metaart)$/i;

export default Tio;