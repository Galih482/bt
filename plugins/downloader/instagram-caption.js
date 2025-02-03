/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

let Tio = async (m, {
    conn,
    usedPrefix,
    command,
    text
}) => {
    if (!text) {
        return m.reply(await Func.exam(usedPrefix, command, 'https://www.instagram.com/reel/CsC2PQCNgM1/?igshid=NTc4MTIwNjQ2YQ=='))
    }

    try {
        await m.react('🕐');
        let media = await Func.fetchJson(API(APIs["Tixo"], '/downloader/igram', {
            url: text
        }));

        let {
            videoURL,
            caption,
            time,
            like,
            commentsCount,
            comments
        } = media.result;
        let commentsList = comments.map(c => `- ${c.username}: ${c.message}`).join('\n');

        let message = `
*Caption:* ${caption || 'No caption'}
*Posted:* ${time}
*Likes:* ${like}
*Comments (${commentsCount}):*
${readMore}
${commentsList || 'No comments'}
        `.trim();
        for (let i of videoURL) {
            await conn.sendFile(m.chat, i, '', message, m);
        }
    } catch (e) {
        console.error(e);
        m.reply('An error occurred while fetching the media. Please try again later.');
    }
}

Tio.help = ["instagram-caption"];
Tio.tags = ['downloader'];
Tio.command = /^(i(nsta)?g(ram)?(-)?cap(tion)?)$/i;
Tio.limit = true;
Tio.register = true;

export default Tio;