/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, {
    conn,
    usedPrefix,
    command,
    text
}) => {
    if (!text)
        return m.reply(await Func.exam(usedPrefix, command, 'hai'))

    try {
        await m.react('💬')
        let {
           message: reply
        } = await Func.fetchJson(API(APIs["Tixo"], '/ai/youai', { text }))

        await m.reply(`✨ ${reply}`).then(() => {
            m.react('🔥')
        })
    } catch (e) {
        throw e
    }
};

Tio.help = ["youai"];
Tio.tags = ["ai"];
Tio.command = /^(youai)$/i;
Tio.limit = true

export default Tio;