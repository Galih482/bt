/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import { addExif } from '../../lib/sticker.js'


let Tio = async (m, { conn, text }) => {
  if (!m.quoted) throw 'Quoted the sticker!'
  let stiker = false
  try {
    let [author, packname] = text.split('|')
    let mime = m.quoted.mimetype || ''
    if (!/webp/.test(mime)) throw 'Reply Sticker!'
    let img = await m.quoted.download()
    if (!img) throw 'Reply a sticker!'
    stiker = await addExif(img, packname || info.packname , author || info.author)
  } catch (e) {
    console.error(e)
    if (Buffer.isBuffer(e)) stiker = e
  } finally {
    if (stiker) conn.sendFile(m.chat, stiker, 'wm.webp', '', m, false, { asSticker: true })
    else throw 'Conversion failed'
  }
}
Tio.help = ['wm']
Tio.tags = ['sticker']
Tio.command = /^(wm|colong|take)$/i

export default Tio