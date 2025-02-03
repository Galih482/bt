/*
 * This code was created by Zykuan
 * © 2024 XiezuMedia. All rights reserved.
 * Do not remove this watermark or you will face a penalty.
*/

let handler = async (m, { conn, usedPrefix, command, text, args }) => {
  let bonusExp = Math.floor(Math.random() * 100)
  let bonusMoney = Math.floor(Math.random() * 1000)
  
  if (!args[0]) return conn.reply(m.chat, `🎯 *Yuk main tebak angka!*\n\nMasukkan angka tebakkanmu antara 1 dan 100 untuk mulai bermain!`, m)
  if (args[0] < 1 || args[0] > 100) return conn.reply(m.chat, `⚠️ *Ups!*\n\nTebakannya harus antara 1 dan 100 ya! Coba lagi deh.`, m)
  
  let number = Math.floor(Math.random() * 100) + 1
  let userGuess = parseInt(args[0])
  
  let result = (userGuess === number) 
    ? `🎉 *Selamat! Kamu berhasil menebak dengan benar!*\n\n✨ Bonus: +${bonusExp} XP\n💰 Uang: +Rp${bonusMoney}`
    : `😢 *Sayang sekali, tebakanmu kurang tepat.*\n\nAngka yang benar adalah *${number}*. Coba lagi yuk!`
  
  let user = global.db.data.users[m.sender]
  
  if (userGuess === number) {
    user.exp += bonusExp
    user.money += bonusMoney
  }
  
  conn.reply(m.chat, result, m)
}

handler.help = ['tebakangka <angka>']
handler.tags = ['game']
handler.command = /^(tebakangka)$/i

export default handler