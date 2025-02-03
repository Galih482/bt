/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/


let Tio = async (m, {
    conn,
    text,
    usedPrefix,
    command,
    Func
}) => {
    if (!text) return m.reply(await Func.exam(usedPrefix, command, ' Kucing'))
    try {
        await m.reply(msg.wait);
        const {
            result
        } = await Func.fetchJson(API(APIs["Tixo"], '/ai/blackbox-generator', { text }));
        await conn.sendMessage(m.chat, {
            image: {
                url: result
            },
            caption: "BlackBox Generator"
        }, {
            quoted: m
        })

    } catch (e) {
        throw msg.error
    }
}
Tio.help = ["blackboxgenerator"]
Tio.tags = ["ai"]
Tio.command = /^(b(lack)?b(ox)?gen(erator)?)$/i
Tio.limit = true

export default Tio