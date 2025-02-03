/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import axios from 'axios'

let Tio = async (m, { conn, text, args, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    
    if (!mime) throw 'Media not found. Please reply to an image.'
    if (!text) return m.reply('masukan warna seperti blue');
    
    try {
        let img = await q.download()
        await m.reply('Processing...') 
        let base64 = img.toString('base64') 
        let response = await axios.post('https://site.tioxy.xyz/tools/bg-color', {
            base64Data: base64,
            color: text
        })

        let buffer = Buffer.from(response.data.data, 'base64') 
        let caption = `*Result from*: ${usedPrefix + command}`

        await conn.sendMessage(m.chat, {
            image: buffer,
            caption: caption
        }, {
            quoted: m
        })
    } catch (e) {
        console.error(e)
        m.reply('Sorry, an error occurred while processing the image.')
    }
}

Tio.help = ['backgroundcolor']
Tio.tags = ['tools']
Tio.command = /^(b(ack)?g(round)?color)$/i
Tio.limit = true
Tio.register = true

export default Tio