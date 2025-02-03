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
    const { result, photo } = await Func.fetchJson(API(APIs['Tixo'], '/ai/gemini', { text, model: 'gemini-1.0-pro' }))
        const {
            key
        } = await conn.sendMessage(m.chat, {
            image: {
                url: photo
            },
            caption: msg.wait
        }, {
            quoted: m,
        })
        
        setTimeout(async() => {
        await conn.sendMessage(m.chat, {
            image: {
                url: photo
            },
            caption:  `\`✨Gemini Ai\`\n\n${result}`,
            edit: key
        }, {
            quoted: m,
        })
        }, 500)
    } catch (e) {
        m.reply(msg.error)
    }
}
Tio.help = ["gemini"]
Tio.tags = ["ai"]
Tio.command = /^(gemini(ai)?)$/i
Tio.limit = true

export default Tio