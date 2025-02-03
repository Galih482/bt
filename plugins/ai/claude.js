/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {

    if (!text) return m.reply('> ✨Hallo ada yang bisa saya bantu?')
    try {
    await m.react('🔮')
    const caption= await Func.fetchJson(API(APIs['Tixo'], '/ai/claude', { text }))
     await conn.sendMessage(m.chat, {image: {url: 'https://cdn.tioxy.xyz/uploads/file-1728184225051.webp'}, caption}, {quoted: m})
    } catch (e) {
        m.reply(msg.error)
    }
}
Tio.help = ["claude"]
Tio.tags = ["ai"]
Tio.command = /^(claude(ai)?)$/i
Tio.limit = true

export default Tio