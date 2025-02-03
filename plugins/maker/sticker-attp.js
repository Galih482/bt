/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import {
    sticker
} from '../../lib/sticker.js'
let Tio = async (m, {
    conn,
    text
}) => {
    if (!text[0]) return m.reply(`Teksnya Mana Kak?\nContoh: .attp undergood`)
    let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
   
    let stiker = await sticker(null, `https://tenor.googleapis.com/v2/render_dynamic_text?client_key=waffles&key=AIzaSyCbDgY_wZO9guZMktW6MnOGo-nKVFXqaUE&%24alt=proto&text=${encodeURIComponent(text)}&id=258698638&config.output_media_format=2&config.width=320&config.height=200&config.frames_per_second=20&config.composition_type=3`, global.info.packname, global.info.author)
    if (stiker) return conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    throw stiker.toString()
}
Tio.help = ['attp <teks>']
Tio.tags = ['sticker']
Tio.command = /^attp$/i
Tio.limit = true
export default Tio