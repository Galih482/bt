/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import axios from "axios"
const {
    FormData,
    Blob
} = await import('formdata-node');
const {
    fileTypeFromBuffer
} = await import('file-type');

let Tio = async (m) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw 'No media found'
    let media = await q.download()
try {
    let {
        name,
        url,
        size
    } = await tourl(media);

    m.reply(`- Result: ${url}\n- Name: ${name}\n- Size: ${size}`)
} catch (e) {
throw e
}
}
Tio.help = ['cdn']
Tio.tags = ['uploader']
Tio.command = /^(cdn)$/i
Tio.limit = true
Tio.register = true

export default Tio

async function tourl(buffer) {
try {
    const {
        ext,
        mime
    } = await fileTypeFromBuffer(buffer)
    let form = new FormData()
    const blob = new Blob([buffer.toArrayBuffer()], {
        type: mime
    })
    form.append('file', blob, 'tmp.' + ext)
    let res = await fetch('https://cdn.tioxy.xyz/api/upload', {
        method: 'POST',
        body: form
    })
    let img = await res.json()
    return img
} catch (e) {
return e
}
}