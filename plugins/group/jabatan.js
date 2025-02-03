/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import { areJidsSameUser } from '@adiwajshing/baileys'
let Tio = async (m, { conn, command, participants }) => {
let users
    if (m.quoted) {
        users = [m.quoted.sender]
    } else if (m.isGroup && m.mentionedJid && m.mentionedJid[0]) {
        users = m.mentionedJid.filter(u => !areJidsSameUser(u, conn.user.id))
    } else return m.reply('reply/tag member')
    let type = command == 'promote' ? 'promote' : 'demote';
    for (let user of users) {
            const res = await conn.groupParticipantsUpdate(m.chat, [user], type)
            await conn.delay(500)
    await m.reply(`@${user.split('@')[0]} telah menjadi admin`)
    }
}
Tio.help = ['promote','demote']
Tio.tags = ['group']
Tio.command = /^(promote|demote)$/i
Tio.admin = true
Tio.group = true
Tio.botAdmin = true

export default Tio