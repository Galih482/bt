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
           data
        } = await Func.fetchJson(API(APIs["Tixo"], '/ai/simsimi', { text }))

        await m.reply(`✨ ${data.success}`).then(() => {
            m.react('🔥')
        })
    } catch (e) {
        throw e
    }
};

Tio.help = ["simi"];
Tio.tags = ["ai"];
Tio.command = /^(simi)$/i;
Tio.limit = true

export default Tio;