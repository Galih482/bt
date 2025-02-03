/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import {
    toAudio
} from '../../lib/converter.js'

let Tio = async (m, {
    conn,
    usedPrefix,
    command,
    text
}) => {
    
    let q = m.quoted ? m.quoted : m
    let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
    if (!/video|audio/.test(mime)) throw `Reply Video/Vn Nya`
    let media = await q.download?.()
    if (!media) throw 'Can\'t download media'
    let audio = await toAudio(media, 'mp4')
    let type = text.includes('doc')
    if (!audio.data) throw 'Can\'t convert media to audio'
    conn.sendFile(m.chat, audio.data, 'audio.mp3', '', m, null, {
        mimetype: 'audio/mpeg',
        asDocument: type 
    })
}
Tio.help = ['tomp3']
Tio.tags = ['tools']
Tio.limit = true
Tio.command = /^to(mp3|a(udio)?)$/i

export default Tio