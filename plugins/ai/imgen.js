/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

let Tio = async (m, {
    conn,
    text
}) => {
    if (!text) return m.reply('masukan prompt.');
    try {
         
        await m.react('🔮');
        await conn.sendMessage(m.chat, {
            image: await Func.fetchBuffer(`https://imgen.duck.mom/prompt/${encodeURIComponent(text)}`),
            caption: `\`\`\`${text}\`\`\``
        }, {
            quoted: m
        })
        await m.react('✨');
    } catch (err) {
        m.reply(msg.error)
    }
}
Tio.help = Tio.command = ['imgen']
Tio.tags = ['main']
export default Tio