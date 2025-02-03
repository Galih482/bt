/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, {
    conn,
    usedPrefix,
    command
}) => {
    let p = m.quoted ? m.quoted : m
    let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
    if (!/video|audio/.test(mime)) throw `Reply Videonya`
    let q = p.message ? p.message : p.mediaMessage
    conn.relayMessage(m.chat, {
        ptvMessage: q.videoMessage
    }, {})
}
Tio.help = ['toptv']
Tio.tags = ['tools']

Tio.command = /^to(ptv)$/i
Tio.register = true

export default Tio