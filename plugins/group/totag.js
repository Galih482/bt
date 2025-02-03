/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, { conn, usedPrefix , command, text, participants}) => {
	
    let users = participants.map(u => u.id).filter(v => v !== conn.user.jid)
    if (!m.quoted) return m.reply(await Func.exam(usedPrefix, command, ' reply pesan/image'));
    conn.sendMessage(m.chat, { forward: m.quoted.fakeObj, mentions: users } )
}

Tio.help = ['totag']
Tio.tags = ['group']
Tio.command = /^(totag|tag)$/i

Tio.admin = true
Tio.group = true

export default Tio