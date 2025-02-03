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
    conn
}) => {
    let who;
    if (m.menrionedJid && m.mentionedJid[0]) {
        who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    } else if (m.quoted && m.quoted.sender) {
        who = m.quoted.sender
    } else {
        who = m.sender
    }
    let user = db.data.users[who]

    let days = Math.abs(Math.floor((user.premiumTime - new Date()) / (24 * 60 * 60 * 1000)));
    let hours = Math.abs(Math.floor((user.premiumTime - new Date()) / (60 * 60 * 1000))) % 24;
    let minutes = Math.abs(Math.floor((user.premiumTime - new Date()) / (60 * 1000))) % 60;
    let prem = `${days} Hari ${hours} Jam ${minutes} Menit`

    let cap = `*Check Premium*

*Name:* @${who.split("@")[0]}
*Premium*: ${user.premium ? "Premium" : "Gratisan"}
*Expired*: \`${user.premium ? prem : "No expired"}\``

    await m.reply(cap)
}
Tio.help = ['cekpremium']
Tio.tags = ['info']
Tio.register = true
Tio.command = /^(cekprem(ium)?)$/i;
export default Tio