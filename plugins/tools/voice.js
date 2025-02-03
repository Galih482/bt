/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import { readFileSync } from 'fs'
import axios from 'axios'
import { all, inst } from "../../lib/scraper/voice.js"

let Tio = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
    if (!/audio/.test(mime)) throw `*Reply audionya*`
    conn.reply(m.chat, `*_Sedang mencover lagu, tunggu 1 sampai 5 menit_*`, m);
    let media = await q.download?.()
    if (!media) throw 'Can\'t download media'
    let { vocal } = await inst(media)
    let buffer = await Func.fetchBuffer(vocal)
    let { base64 } = await all(command, buffer)
    conn.sendMessage(m.chat, { audio: { url: base64 }, viewOnce: false, ptt: true, mimetype: "audio/mpeg", fileName: "vn.mp3", waveform: [100,0,100,0,100,0,100] }, { quoted: m })
}

Tio.help = ['kobo', 'zeta', 'gura', 'kaela', 'pekora', 'miko', 'subaru', 'korone', 'luna', 'anya', 'reine', 'calli', 'kroni'].map(v => v + ' <reply>')
Tio.tags = ['tools']

Tio.command = ['kobo', 'zeta', 'gura', 'kaela', 'pekora', 'miko', 'subaru', 'korone', 'luna', 'anya', 'reine', 'calli', 'kroni']
Tio.premium = true

export default Tio