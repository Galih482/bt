/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, { conn, text }) => {

if (!text) throw 'No Text'

conn.sendFile(m.chat, global.API('https://some-random-api.com', '/canvas/misc/youtube-comment', {
avatar: await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'),
comment: text,
username: conn.getName(m.sender)
}), 'error.png', '*THANKS FOR COMMENT*', m)
}

Tio.help = ['ytcoment']
Tio.tags = ['maker'] 
Tio.command = /^(ytcoment)$/i

export default Tio