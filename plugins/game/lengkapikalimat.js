/*
 * This code was created by Zykuan
 * © 2024 XiezuMedia. All rights reserved.
 * Do not remove this watermark or you will face a penalty.
*/

import fetch from 'node-fetch'

let timeout = 30000 //SetWaktu (30 Detik)
let money = 4500 //RewardMoney
let handler = async (m, { conn, usedPrefix }) => {
    conn.lengkapikalimat = conn.lengkapikalimat ? conn.lengkapikalimat : {}
    let id = m.chat
    if (id in conn.lengkapikalimat) {
        conn.reply(m.chat, '*📤 Masih ada soal belum terjawab di chat ini*', conn.lengkapikalimat[id][0])
        throw false
    }

    let src = await (await fetch('https://raw.githubusercontent.com/Zyknn/database/main/lengkapikalimat.json')).json()
    let json = src[Math.floor(Math.random() * src.length)]
    let caption = `📑${json.pertanyaan}

_⏰Timeout *${(timeout / 1000).toFixed(2)} detik*_
_✍🏻Ketik ${usedPrefix}hlen untuk bantuan_
_💵Bonus: ${money} Money_
`.trim()
    conn.lengkapikalimat[id] = [
        await conn.reply(m.chat, caption, m),
        json, money,
        setTimeout(() => {
            if (conn.lengkapikalimat[id]) conn.reply(m.chat, `🙌🏻Waktu habis!\n📑Jawabannya adalah: *${json.jawaban}*`, conn.lengkapikalimat[id][0])
            delete conn.lengkapikalimat[id]
        }, timeout)
    ]

}
handler.help = ['lengkapikalimat']
handler.tags = ['game']
handler.command = /^lengkapikalimat/i
handler.group = true
handler.register = true
handler.limit = true

export default handler


