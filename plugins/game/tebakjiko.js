/*
 * This code was created by Zykuan
 * © 2024 XiezuMedia. All rights reserved.
 * Do not remove this watermark or you will face a penalty.
*/

import fetch from 'node-fetch'

let timeout = 60000 // 60s
let money = 5000 //Reward
let handler = async (m, { conn, usedPrefix }) => {
    conn.tebakjiko = conn.tebakjiko ? conn.tebakjiko : {}
    let id = m.chat
    if (id in conn.tebakjiko) {
        conn.reply(m.chat, '*📤 Masih ada soal belum terjawab di chat ini*', conn.tebakjiko[id][0])
        throw false
    }

    let src = await (await fetch('https://raw.githubusercontent.com/Zyknn/database/main/tebakjiko48.json')).json()
    let json = src[Math.floor(Math.random() * src.length)]
    let caption = `_📑${json.soal}_

_⏰Timeout *${(timeout / 1000).toFixed(2)} detik*_
_✍🏻Ketik ${usedPrefix}hjiko untuk bantuan_
_💵Bonus: ${money} Money_
`.trim()
    conn.tebakjiko[id] = [
        await conn.reply(m.chat, caption, m),
        json, money,
        setTimeout(() => {
            if (conn.tebakjiko[id]) conn.reply(m.chat, `🙌🏻Waktu habis!\n📑Jawabannya adalah: *${json.jawaban}*`, conn.tebakjiko[id][0])
            delete conn.tebakjiko[id]
        }, timeout)
    ]

}
handler.help = ['tebakjiko']
handler.tags = ['game']
handler.command = /^tebakjiko/i
handler.register = true
handler.limit = true

export default handler

