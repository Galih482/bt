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
    if (!text) return m.reply('pilih nomor 1-70');
    if (isNaN(text) || text > 70) return m.reply('Harus angka / tidak bisa lebih dari 70');
    
    try {

        await m.reply(msg.wait);
        const url = await tmpFiles(media);
        const RESULT = await filter(url, text);

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
Tio.help = ["filterai"]
Tio.tags = ["ai"]
Tio.command = /^(filterai)$/i
Tio.limit = true

export default Tio

async function filter(imageUrl, filterKey) {
const response = await fetch('https://pxpic.com/callAddFilterToPhoto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                imageUrl: imageUrl,
                filterKey: filterKey
            }),
})
const result = await response.json();
return result.resultImageUrl 
}