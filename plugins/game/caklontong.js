import fetch from 'node-fetch'

let timeout = 60000 //Waktu ( 60s )
let money = 4200  //Reward
let handler = async (m, { conn, usedPrefix }) => {
    conn.caklontong = conn.caklontong ? conn.caklontong : {}
    let id = m.chat
    if (id in conn.caklontong) {
        conn.reply(m.chat, '*📤 Masih ada soal belum terjawab di chat ini*', conn.caklontong[id][0])
        throw false
    }

    let src = await (await fetch('https://raw.githubusercontent.com/Zyknn/database/main/caklontong.json')).json()
    let json = src[Math.floor(Math.random() * src.length)]
    let caption = `_📑${json.soal}_

_⏰Timeout *${(timeout / 1000).toFixed(2)} detik*_
_✍🏻Ketik ${usedPrefix}calo untuk bantuan_
_💵Bonus: ${money} Money_
`.trim()
    conn.caklontong[id] = [
        await conn.reply(m.chat, caption, m),
        json, money,
        setTimeout(() => {
            if (conn.caklontong[id]) conn.reply(m.chat, `🙌🏻Waktu habis!\n📑Jawabannya adalah: *${json.jawaban}*\n📄${json.deskripsi}`, conn.caklontong[id][0])
            delete conn.caklontong[id]
        }, timeout)
    ]

}
handler.help = ['caklontong']
handler.tags = ['game']
handler.command = /^caklontong/i
handler.group = true
handler.register = true
handler.limit = true

export default handler


