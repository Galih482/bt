/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, {
    conn,
    args,
    usedPrefix,
    command,
    text
}) => {
    if (!text) return m.reply(await Func.exam(usedPrefix, command, 'https://www.instagram.com/reels/audio/1682413708871467/'))

    try {
        await m.react('🕐');
        const {
            result
        } = await Func.fetchJson(API(APIs["Tixo"], '/downloader/instagram-audio', {
            url: text
        }));
        const {
            thumbnail,
            urlOriginal,
            audio
        } = result;

        const image = await conn.sendMessage(m.chat, {
            image: {
                url: thumbnail
            },
            caption: `Instagram Audio\n\n- *Source*: ${urlOriginal}`
        }, {
            quoted: m
        });

        await conn.sendMessage(m.chat, {
            audio: {
                url: audio
            },
            mimetype: 'audio/mpeg',
            ptt: false
        }, {
            quoted: image
        });

    } catch (e) {
      m.reply(msg.error);
        
    }
};

Tio.help = ["instagram-audio"];
Tio.tags = ['downloader'];
Tio.command = /^(i(nsta)?g(ram)?(-)?audio)$/i;
Tio.limit = true;
Tio.register = true;

export default Tio;