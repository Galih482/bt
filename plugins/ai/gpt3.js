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
        } = await Func.fetchJson(API(APIs["Tixo"], '/ai/gpt', { text }))

        await m.reply(`✨ ${reply.answer}`).then(() => {
            m.react('🔥')
        })
    } catch (e) {
        throw e
    }
};

Tio.help = ["gpt-3"];
Tio.tags = ["ai"];
Tio.command = /^(gpt(-)?3)$/i;
Tio.limit = true

export default Tio;