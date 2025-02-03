/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, { conn, usedPrefix, command }) => {
    const notStickerMessage = `✳️ Tanggapi stiker dengan :\n\n *${usedPrefix + command}*`
    if (!m.quoted) throw notStickerMessage
    const q = m.quoted || m
    let mime = q.mediaType || ''
    if (/webp/.test(mime)) throw notStickerMessage
    let media = await q.download()
    await conn.sendMessage(m.chat, {image: media, caption: 'nih'}, {quoted: m})
}
Tio.help = ['toimg']
Tio.tags = ['sticker']
Tio.command = /^(toim(a)?g(e)?)$/i

export default Tio