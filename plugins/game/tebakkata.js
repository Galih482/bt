/*
 * This code was created by Zykuan
 * © 2024 XiezuMedia. All rights reserved.
 * Do not remove this watermark or you will face a penalty.
*/

import fetch from 'node-fetch'

let timeout = 60000 // 60s
let money = 2500 //Reward
let handler = async (m, { conn, usedPrefix }) => {
    conn.tebakkata = conn.tebakkata ? conn.tebakkata : {}
    let id = m.chat
    if (id in conn.tebakkata) {
        conn.reply(m.chat, '*📤 Masih ada soal belum terjawab di chat ini*', conn.tebakkata[id][0])
        throw false
    }

    let src = await (await fetch('https://raw.githubusercontent.com/Zyknn/database/main/tebakkata.json')).json()
    let json = src[Math.floor(Math.random() * src.length)]
    let caption = `_📑${json.soal}_

_⏰Timeout *${(timeout / 1000).toFixed(2)} detik*_
_✍🏻Ketik ${usedPrefix}teka untuk bantuan_
_💵Bonus: ${money} Money_
`.trim()
    conn.tebakkata[id] = [
        await conn.reply(m.chat, caption, m),
        json, money,
        setTimeout(() => {
            if (conn.tebakkata[id]) conn.reply(m.chat, `🙌🏻Waktu habis!\n📑Jawabannya adalah: *${json.jawaban}*`, conn.tebakkata[id][0])
            delete conn.tebakkata[id]
        }, timeout)
    ]

}
handler.help = ['tebakkata']
handler.tags = ['game']
handler.command = /^tebakkata/i
handler.register = true
handler.limit = true

export default handler

