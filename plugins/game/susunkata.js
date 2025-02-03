import fetch from 'node-fetch'

let timeout = 60000 //Waktu ( 60s )
let money = 4200  //Reward
let handler = async (m, { conn, usedPrefix }) => {
    conn.susunkata = conn.susunkata ? conn.susunkata : {}
    let id = m.chat
    if (id in conn.susunkata) {
        conn.reply(m.chat, '*📤 Masih ada soal belum terjawab di chat ini*', conn.susunkata[id][0])
        throw false
    }

    let src = await (await fetch('https://raw.githubusercontent.com/Zyknn/database/main/susunkata.json')).json()
    let json = src[Math.floor(Math.random() * src.length)]
    let caption = `_📑${json.soal}_

_🔎 Tipe: ${json.tipe}_
_⏰Timeout *${(timeout / 1000).toFixed(2)} detik*_
_✍🏻Ketik ${usedPrefix}suska untuk bantuan_
_💵Bonus: ${money} Money_
`.trim()
    conn.susunkata[id] = [
        await conn.reply(m.chat, caption, m),
        json, money,
        setTimeout(() => {
            if (conn.susunkata[id]) conn.reply(m.chat, `🙌🏻Waktu habis!\n📑Jawabannya adalah: *${json.jawaban}*`, conn.susunkata[id][0])
            delete conn.susunkata[id]
        }, timeout)
    ]

}
handler.help = ['susunkata']
handler.tags = ['game']
handler.command = /^susunkata|sskata/i
handler.group = true
handler.register = true
handler.limit = true

export default handler


