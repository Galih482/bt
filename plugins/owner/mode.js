/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, {
    conn,
    command,
    dbBot
}) => {
    switch (command) {
        case "self":
            dbBot[conn.user.jid].self = true
            m.reply(await Func.style("Bot Berhasil Self", 1))
            break
        case "public":
            dbBot[conn.user.jid].self = false
            m.reply(await Func.style("Bot Berhasil Public", 1))
            break
    }
}
Tio.help = Tio.command = ["self", "public"];
Tio.tags = ["owner"];
Tio.rowner = true
export default Tio