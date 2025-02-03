/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
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
            answer,
            sources
        } = await Func.fetchJson(API(APIs["Tixo"], "/ai/thinkai", { text }))

        await m.reply(`✨ ${answer}\n\nSumber:\n${sources.map(v => `[${v.title}] ${v.link}`).join('\n')}`).then(() => {
            m.react('🔥')
        })
    } catch (e) {
        throw e
    }
};

Tio.help = ["thinkai"];
Tio.tags = ["ai"];
Tio.command = /^(thinkai)$/i;
Tio.limit = true

export default Tio;