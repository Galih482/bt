/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import axios from 'axios';

let Tio = async (m, {
    conn,
    args,
    text,
    usedPrefix,
    command
}) => {
    var out

    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    if (!/webp|image|viewOnce/g.test(mime)) return m.reply(`Reply Media Dengan Perintah\n\n${usedPrefix + command}`)
    let buffer = await q.download();
    let base64 = buffer.toString('base64');

    await m.reply(msg.wait)
    try {
        let result = await toPrompt(base64);
        await conn.sendMessage(m.chat, {image: buffer, caption: result}, {quoted: m});
    } catch (e) {
        throw msg.error
    }
}
Tio.help = ['prompt']
Tio.tags = ['tools']
Tio.command = /^(prompt)$/i

export default Tio

async function toPrompt(base64) {
    let data = {
        type: 'prompt',
        image: base64,
        instructions: ''
    }
    let headers = {
        'Content-Type': 'application/json'
    }
    try {
        let response = await axios.post('https://docsbot.ai/api/tools/image-prompter', data, headers)
        return response.data
    } catch (e) {
        throw e.response?.data
    }
}