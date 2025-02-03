/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import fetch from 'node-fetch';
import { tmpFiles } from '../../lib/uploader.js';

let Tio = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {

    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw 'No media found'
    let media = await q.download()

    try {

        await m.reply(msg.wait);
        const url = await tmpFiles(media);
        const RESULT = await hdimage(url);

        await conn.sendMessage(m.chat, {
            image: {
                url: RESULT
            },
            caption: `SUKSES`
        }, {
            quoted: m
        });

    } catch (e) {
        await m.reply(msg.error)
    }
}
Tio.help = ["esrgan"]
Tio.tags = ["ai"]
Tio.command = /^(esrgan)$/i
Tio.limit = true

export default Tio

async function hdimage(imageUrl) {
    const response = await fetch('https://pxpic.com/callPhotoEnhancer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            imageUrl
        })
    })
    const result = await response.json();
    return result.resultImageUrl
}