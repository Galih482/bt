import yts from 'yt-search';

var Tio = async (m, {
    conn,
    command,
    text,
    usedPrefix
}) => {
    if (!text) return m.reply(await Func.exam(usedPrefix, command, 'https://youtube.com/watch?v=bzpXVCqNCoQ'));
    await m.react('🔍')

    let src = await yts(text);
    let yt = src.videos[0];
    
    return conn.sendMessage(m.chat, {
        audio: {
            url: `https://ytdl.botwaaa.web.id/yt/dl?url=${yt.url}&type=audio`
        },
        mimetype: 'audio/mpeg',
        contextInfo: {
            externalAdReply: {
                title: yt.title,
                body: 'Glasly-AI',
                mediaType: 2,
                mediaUrl: yt.url,
                thumbnailUrl: yt.thumbnail,
                sourceUrl: yt.url,
                containsAutoReply: true,
                renderLargerThumbnail: false,
                showAdAttribution: false,
            }
        }
    }, { quoted: m });
    m.react('✅')
};

Tio.help = ['ytaudio'];
Tio.tags = ['downloader'];
Tio.command = /^(y(ou)?t(ube)?a(udio)?|ytmp3)$/i;
Tio.limit = true;
Tio.register = true;

export default Tio;