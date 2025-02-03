/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import axios from 'axios';

let Tio = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {

    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw 'Reply gambar Qris.'
    let media = await q.download()

    let [txt, template] = text.split('|');

    if (!txt) return m.reply('Masukan nama Qris');

    if (!template) return m.reply('Masukan Template 1 atau 2');

    await m.reply(msg.wait);

    const buffer = await axios.post(`${global.APIs['Tixo']}/canvas/maker-qris`, {
        text: txt,
        base64: media.toString('base64'),
        template
    }, {
        responseType: 'arraybuffer'
    });

    await conn.sendFile(m.chat, buffer.data, 'Qris.png', `Maker Qris use template *${template}*`, m);
}
Tio.help = Tio.command = ['maker-qris']
Tio.tags = ['maker']
Tio.limit = true

export default Tio