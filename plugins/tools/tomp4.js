/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import {
    sticker
} from '../../lib/sticker.js'
import {
    uploadFile,
    uploadImage
} from '../../lib/uploader.js'
import {
    webp2mp4
} from '../../lib/webp2mp4.js'
import {
    Sticker,
    StickerTypes
} from 'wa-sticker-formatter'
import {
    ffmpeg
} from '../../lib/converter.js'

let Tio = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    let stiker = false
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!m.quoted) return m.reply(await Func.exam(usedPrefix, command, 'reply sticker gif nya'));

    let img = await q.download?.()
    let stek = new Sticker(img, {
        pack: info.packname,
        author: info.author,
        type: StickerTypes.FULL
    })
    let buffer = await stek.toBuffer()
    let out
    try {
        if (/webp/g.test(mime)) out = await webp2mp4(img)
        else if (/image/g.test(mime)) out = await uploadImage(img)
        else if (/video/g.test(mime)) out = await uploadFile(img)
        else if (/audio/g.test(mime)) out = await ffmpeg(media, [
            '-filter_complex', 'color',
            '-pix_fmt', 'yuv420p',
            '-crf', '51',
            '-c:a', 'copy',
            '-shortest'
        ], 'mp3', 'mp4')
        if (typeof out !== 'string') out = await uploadImage(img)
        else if (/gif/g.test(mime)) out = stek
    } catch (e) {
        m.reply(msg.error);
    }
    await conn.sendFile(m.chat, out, 'tovid.mp4', '✅ sticker a video', m)
}
Tio.help = ['tovideo']
Tio.tags = ['tools']
Tio.command = /^t(o(vid(eos?|s)?|mp4)|vid(eos?|s)?|mp4)$/i

export default Tio