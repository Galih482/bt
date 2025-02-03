/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, {conn}) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    if (typeof db.data.users[who] == 'undefined') throw 'Pengguna tidak ada didalam data base'
      const pp = await conn.profilePictureUrl(who, "image").catch((_) => "https://telegra.ph/file/ee60957d56941b8fdd221.jpg")
      
   conn.sendMessage(m.chat, {
text: `➜ ❲ ${global.db.data.users[who].limit} ❳`,
contextInfo: {
externalAdReply: {
title: '🎟️Y O U R  L I M I T',
body: ``,
showAdAttribution: true,
mediaType: 1,
sourceUrl: '',
thumbnailUrl: pp,
renderLargerThumbnail: false
}}
}, {quoted: m})

}
Tio.help = ['limit <@user>']
Tio.tags = ['main']
Tio.command = /^(limit)$/i
Tio.register = true

export default Tio