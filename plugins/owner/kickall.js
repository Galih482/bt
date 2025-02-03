/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

let Tio = async (m, { conn, participants }) => {
let user = participants.map(x => x.id)
let gc = await conn.groupMetadata(m.chat)
for (let a of user) {
if (a !== conn.user.jid && a !== gc.owner && a !== owner + info.jid) {
conn.groupParticipantsUpdate(m.chat, [a], "remove")
}
}
}
Tio.command = ['kickall']
Tio.tags = ['group']
Tio.help = ['kickall']
Tio.owner = Tio.group = true 
export default Tio