/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

let handler = async (m, {
    conn,
    usedPrefix,
    command,
    text
}) => {
    if (!text) return m.reply(await Func.exam(usedPrefix, command, '😄'))

    const getEmoji = (text) => {
        return Array.from(text)[0]?.codePointAt(0)?.toString(16);
    };

    let codeId = await getEmoji(text);
    if (!codeId) throw `*• Example :* ${usedPrefix + command} *[emoji]*`;

    let result = `https://fonts.gstatic.com/s/e/notoemoji/latest/${codeId}/512.webp`;
    if (!result) throw "*[ x ]* Emoji Not found";

    await conn.sendFile(m.chat, result, 'emoji.webp', '', m);
};

handler.help = ['emoji'];
handler.tags = ['sticker'];
handler.command = /^(emoji(gif)?)$/i;
handler.limit = true
export default handler;