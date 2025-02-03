/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import {
    toPTT
} from '../../lib/converter.js'

let Tio = async (m, {
    conn,
    usedPrefix,
    command
}) => {
    let q = m.quoted ? m.quoted : m
    let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
    if (!/video|audio/.test(mime)) throw `Reply Video/Audionya`
    let media = await q.download?.()
    if (!media) throw 'Can\'t download media'
    let audio = await toPTT(media, 'mp4')
    if (!audio.data) throw 'Can\'t convert media to audio'
    conn.sendFile(m.chat, audio.data, 'audio.mp3', '', m, true, {
        mimetype: 'audio/mp4'
    })
}
Tio.help = ['tovn']
Tio.tags = ['tools']

Tio.command = /^to(vn|(ptt)?)$/i
Tio.register = true

export default Tio