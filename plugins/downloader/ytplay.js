import yts from 'yt-search';
import fetch from 'node-fetch';

var Tio = async (m, {
    conn,
    command,
    text,
    usedPrefix
}) => {
        if (!text) throw '*Contoh* : `.play Serana`';
        await m.react('🔍');

    try {
        const searchResults = await yts(text);
        const video = searchResults.videos[0];
        if (!video) throw ' Tidak ditemukan hasil untuk pencarian tersebut.';

        const { title, url, timestamp, ago, views, author, thumbnail } = video;

        const apiUrl = `https://api.vreden.web.id/api/ytmp3?url=${encodeURIComponent(url)}`;
        const { result } = await fetch(apiUrl).then((res) => res.json());

        if (!result?.status || !result?.download?.url) throw ' Gagal mengunduh audio.';

        const audioBuffer = await fetch(result.download.url).then((res) => res.buffer());
        await conn.sendMessage(m.chat, { 
            audio: audioBuffer, 
            mimetype: 'audio/mpeg', 
            fileName: `${title}.mp3`,
            contextInfo: {
            externalAdReply: {
                title: title,
                body: 'Glasly-AI𓂃 ִֶָ𐀔',
                mediaType: 2,
                mediaUrl: url,
                thumbnailUrl: thumbnail,
                sourceUrl: url,
                containsAutoReply: true,
                renderLargerThumbnail: false,
                showAdAttribution: false,
            }
        }
        }, { quoted: m });
        m.react('✅');
    } catch (e) {
        m.reply(' Terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi.');
    }
};

Tio.help = ['play'].map((v) => v + ' <query>');
Tio.tags = ['downloader'];
Tio.command = /^((yt)?play)$/i;
Tio.limit = true;
Tio.register = true;

export default Tio;