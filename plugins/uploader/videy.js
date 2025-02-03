/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import { uploadVideo } from '../../lib/uploader.js'

let handler = async (m) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw 'No media found'
    let media = await q.download()

    let {
        cdn,
        ori
    } = await uploadVideo(media);

    await conn.sendButton(m.chat, [{
        name: "cta_copy",
        buttonParamsJson: JSON.stringify({display_text: "Cdn", id: "123", copy_code: `${cdn}`})
    }, {
        name: "cta_copy",
        buttonParamsJson: JSON.stringify({display_text: "Original", id: "123", copy_code: `${ori}`})
    }], m, {
        thumb: true,
        content: "Berikut hasil uploader dari website videy.co\n",
        wm: "uploader videy.co",
        type: 'video',
        thumbnailUrl: cdn
    })

}
handler.help = ['uploadvideo']
handler.tags = ['tools']
handler.command = /^(uploadvideo)$/i
handler.limit = true
handler.register = true

export default handler