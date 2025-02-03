/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import { createHash } from 'crypto'

let Tio = async function (m, { conn, text, usedPrefix }) {
  
  let sn = createHash('md5').update(m.sender).digest('hex')
  let name = await conn.getName(m.sender)
  const pepe = await conn.profilePictureUrl(m.sender, "image").catch((_) => "https://telegra.ph/file/ee60957d56941b8fdd221.jpg")
 
await conn.sendModify(m.chat, sn, verif, {
ads: true,
title: '📄 Y O U R  S E R I A L  N U M B E R',
body: 'copy the text below',
thumbnailUrl: pepe,
url: '',
largeThumb: true
})
}

Tio.help = ['ceksn']
Tio.tags = ['main']
Tio.command = /^(ceksn)$/i
Tio.register = true
export default Tio