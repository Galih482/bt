import fetch from 'node-fetch'
let timeout = 60000 //60s
let poin = 4000 //reward
let handler = async (m, { conn, usedPrefix }) => {
  conn.tebakgambar = conn.tebakgambar ? conn.tebakgambar : {}
  let id = m.chat
  if (id in conn.tebakgambar) {
    conn.reply(m.chat, '*📤 Masih ada soal belum terjawab di chat ini*', conn.tebakgambar[id][0])
    throw false
  }
  let src = await (await fetch('https://raw.githubusercontent.com/Zyknn/database/main/tebakgambar.json')).json()
  let json = src[Math.floor(Math.random() * src.length)]
  let caption = `📑${json.deskripsi}
  
_⏰Timeout *${(timeout / 1000).toFixed(2)} detik*_
_✍🏻Ketik ${usedPrefix}hgam untuk bantuan_
_💵Bonus: ${poin} Money_`.trim()
  conn.tebakgambar[id] = [
    await conn.sendFile(m.chat, json.img, 'tebakgambar.jpg', caption, m)
    ,
    json, poin,
    setTimeout(async () => {
      if (conn.tebakgambar[id]) await conn.reply(m.chat, `🙌🏻Waktu habis!\n📑Jawabannya adalah: *${json.jawaban}*`, conn.tebakgambar[id][0])
      delete conn.tebakgambar[id]
    }, timeout)
  ]
}
handler.help = ['tebakgambar']
handler.tags = ['game']
handler.command = /^tebakgambar/i
handler.register = true
handler.limit = true

export default handler