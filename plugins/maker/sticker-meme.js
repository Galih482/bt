/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import { cdnTixo } from "../../lib/uploader.js";
import { sticker } from "../../lib/sticker.js";

let Tio = async (m, { conn, text, usedPrefix, command }) => {
    let teks = text.split('|')
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) return m.reply(`Balas Gambar Dengan Perintah\n\n${usedPrefix + command} ${teks[0] ? teks[0] : 'teks atas'} | ${teks[1] ? teks[1] : 'teks bawah'}`);
    if (!/image\/(jpe?g|png|webp)/.test(mime)) throw `Mime ${mime} tidak didukung!`
   m.reply(msg.wait)
    let img = await q.download()
    let url = await cdnTixo(img);
    
    let meme = `https://api.memegen.link/images/custom/${encodeURIComponent(teks[0] ? teks[0] : ' ')}/${encodeURIComponent(teks[1] ? teks[1] : ' ')}.png?background=${url.url}`
    let stiker = await sticker(false, meme, global.info.packname, global.info.author)

    if (stiker) await conn.sendFile(m.chat, stiker, '', null, m)
}
Tio.help = ['smeme']
Tio.tags = ['tools']
Tio.command = /^(smeme)$/i

Tio.limit = true

export default Tio