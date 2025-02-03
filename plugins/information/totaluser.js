/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, {
    usedPrefix,
    command,
    conn,
    text
}) => {
    let mentionedJid = [m.sender]
    let name = conn.getName(m.sender)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let kon = `乂 *U S E R*
 
- *Current Database ${totalreg} User*
- *Currently Registered ${rtotalreg} User*`
    await m.reply(kon)
}
Tio.help = ['user']
Tio.tags = ['main']
Tio.command = /^(pengguna|(jumlah)?database|user)$/i

export default Tio