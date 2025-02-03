/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import { areJidsSameUser } from '@adiwajshing/baileys'
let handler = async (m, { conn, text, participants }) => {
    let users
if (m.quoted) {
users = m.quoted.sender
} else if (m.mentionedJid[0]) {
users = m.mentionedJid.filter(u => !areJidsSameUser(u, conn.user.id))
} else if (!text) return m.reply('reply/tag member')

    let kickedUser = []
    if (m.quoted) {
    await conn.groupParticipantsUpdate(m.chat, [users], 'remove')
    } else {
    for (let user of users) {
        if (user.endsWith('@s.whatsapp.net') && !(participants.find(v => areJidsSameUser(v.id, user)) || { admin: true }).admin) {
            const res = await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
            kickedUser.concat(res)
            await delay(1 * 1000)
        }
        }
        }
    m.reply(`*✅ Berhasil!* 🥾\n\n> @⁨${m.quoted ? m.quoted.sender.split('@')[0] : kickedUser.map(v => '@' + v.split('@')[0])} telah dikeluarkan dari grup.\n\n*📌 _Gunakan fitur ini untuk menjaga kenyamanan grup._*`, null, { mentions: kickedUser })

}
handler.help = ['kick', 'dor']
handler.tags = ['group']
handler.command = /^(kick|dor)$/i

handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))