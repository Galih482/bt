import fetch from 'node-fetch'
let timeout = 60000 //60s
let poin = 4000 //reward
let handler = async (m, { conn, usedPrefix }) => {
  conn.tebakbendera = conn.tebakbendera ? conn.tebakbendera : {}
  let id = m.chat
  if (id in conn.tebakbendera) {
    conn.reply(m.chat, '*📤 Masih ada soal belum terjawab di chat ini*', conn.tebakbendera[id][0])
    throw false
  }
  let src = await (await fetch('https://raw.githubusercontent.com/Zyknn/database/main/tebakbendera2.json')).json()
  let json = src[Math.floor(Math.random() * src.length)]
  let caption = `*Bendera Apakah Tersebut?*
  
_⏰Timeout *${(timeout / 1000).toFixed(2)} detik*_
_✍🏻Ketik ${usedPrefix}tebe untuk bantuan_
_💵Bonus: ${poin} Money_`.trim()
  conn.tebakbendera[id] = [
    await conn.sendFile(m.chat, json.img, 'bendera.jpg', caption, m)
    ,
    json, poin,
    setTimeout(async () => {
      if (conn.tebakbendera[id]) await conn.reply(m.chat, `🙌🏻Waktu habis!\n📑Jawabannya adalah: *${json.name}*`, conn.tebakbendera[id][0])
      delete conn.tebakbendera[id]
    }, timeout)
  ]
}
handler.help = ['tebakbendera']
handler.tags = ['game']
handler.command = /^tebakbendera/i
handler.register = true
handler.limit = true

export default handler