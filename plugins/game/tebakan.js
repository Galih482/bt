/*
 * This code was created by Zykuan
 * © 2024 XiezuMedia. All rights reserved.
 * Do not remove this watermark or you will face a penalty.
*/

import fetch from 'node-fetch'

let timeout = 60000 // 60s
let money = 2500 //Reward
let handler = async (m, { conn, usedPrefix }) => {
    conn.tebaktebakan = conn.tebaktebakan ? conn.tebaktebakan : {}
    let id = m.chat
    if (id in conn.tebaktebakan) {
        conn.reply(m.chat, '*📤 Masih ada soal belum terjawab di chat ini*', conn.tebaktebakan[id][0])
        throw false
    }

    let src = await (await fetch('https://raw.githubusercontent.com/Zyknn/database/main/tebaktebakan.json')).json()
    let json = src[Math.floor(Math.random() * src.length)]
    let caption = `_📑${json.soal}_

_⏰Timeout *${(timeout / 1000).toFixed(2)} detik*_
_✍🏻Ketik ${usedPrefix}hteb untuk bantuan_
_💵Bonus: ${money} Money_
`.trim()
    conn.tebaktebakan[id] = [
        await conn.reply(m.chat, caption, m),
        json, money,
        setTimeout(() => {
            if (conn.tebaktebakan[id]) conn.reply(m.chat, `🙌🏻Waktu habis!\n📑Jawabannya adalah: *${json.jawaban}*`, conn.tebaktebakan[id][0])
            delete conn.tebaktebakan[id]
        }, timeout)
    ]

}
handler.help = ['tebaktebakan']
handler.tags = ['game']
handler.command = /^tebaktebakan/i
handler.register = true
handler.limit = true

export default handler

