/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

let Tio = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    if (!args[0] || !args[1]) return m.reply(await Func.exam(usedPrefix, command, '576790961(id) 10032(zone)'))
    const {
        result
    } = await Func.fetchJson(API(APIs["Tixo"], "/stalker/ml", {
        id: args[0],
        zone: args[1]
    }))
    await m.reply(result.message);
}
Tio.help = Tio.command = ['mlstalk']
Tio.tags = ['stalker']
export default Tio