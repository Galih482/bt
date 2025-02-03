/*
 * This code was created by Zykuan
 * © 2024 XiezuMedia. All rights reserved.
 * Do not remove this watermark or you will face a penalty.
*/

let handler = async (m, { conn, text }) => {
  let user = global.db.data.users[m.sender]
  let opponent = m.mentionedJid[0]
  
  if (!user || !global.db.data.users[opponent]) {
    return m.reply('*Contoh*: .bertarung @user\n\nTag lawanmu untuk memulai pertarungan!')
  }
  
  conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  })
  
  let alasanKalah = `${pickRandom(['bodoh gitu doang aja kalah tolol lu di denda', 'lemah lu kontol mending lu di rumah aja dah lu di denda dek', 'Jangan beratem kalo cupu dek wkwkwk kamu di denda', 'Dasar tolol lawan itu doang aja ga bisa lu di denda', 'Hadehh sono lu mending di rumah aja deh lu di denda'])}`
  let alasanMenang = `${pickRandom(['kamu berhasil menggunakan kekuatan elemental untuk menghancurkan pertahanan lawan dan mendapatkan', 'kamu berhasil melancarkan serangan mematikan dengan gerakan akrobatik yang membingungkan lawan, dan mendapatkan', 'Kamu berhasil menang karena baru selesai coli dan mendapatkan', 'Kamu berhasil menang karena menyogok lawan dan mendapatkan', 'Kamu berhasil menang karena bot merasa kasihan sama kamu dan mendapatkan', 'Kamu berhasil menang karena kamu melawan orang cupu dan mendapatkan'])}`

  let betAmount = Math.floor(Math.random() * (10000000 - 10000 + 1)) + 10000 
  
  if (user.money < betAmount) {
    return m.reply(`💸 Uang Anda tidak mencukupi untuk bertarung!\n\nButuh setidaknya: *Rp ${betAmount}*\nSaldo Anda saat ini: *Rp ${user.money}*\n\nCobalah kumpulkan lebih banyak uang sebelum bertarung.`)
  }
  
  if (user.lastWar && (new Date() - user.lastWar) < 10000) {
    let remainingTime = Math.ceil((10000 - (new Date() - user.lastWar)) / 1000)
    return m.reply(`⏳ Anda harus menunggu ${remainingTime} detik sebelum bisa bertarung lagi.\n\nSabar dulu, istirahat sejenak!`)
  }
  
  m.reply('💥 Mempersiapkan arena...') 
  
  setTimeout(() => {
    m.reply('🏟 Mendapatkan arena...') 
    
    setTimeout(() => {
      m.reply('⚔️ Bertarung dimulai...')
      
      setTimeout(() => {
        let result = Math.random() >= 0.5 
        let wonAmount = result ? betAmount : -betAmount 
        
        user.money += wonAmount
        global.db.data.users[opponent].money -= wonAmount
        
        let opponentName = conn.getName(opponent) 
        
        let caption = `❏  *A R E N A  B E R T A R U N G*\n\n`
        caption += `👥 Lawan Anda: ${opponentName}\n`
        caption += `🏅 Level Anda: [${global.db.data.users[m.sender].level}]\n\n`
        
        if (result) {
          caption += `🎉 *Menang!*\n${alasanMenang}\n💰 Hadiah: *Rp ${betAmount}*\n`
          caption += `💸 Saldo Anda saat ini: *Rp ${user.money}*\n`
          conn.sendFile(m.chat, 'https://telegra.ph/file/e3d5059b970d60bc438ac.jpg', 'Menang.jpg', caption, m)
        } else {
          caption += `💀 *Kalah!*\n${alasanKalah}\n💸 Kerugian: *Rp ${betAmount}*\n`
          caption += `💸 Saldo Anda saat ini: *Rp ${user.money}*\n`
          conn.sendFile(m.chat, 'https://telegra.ph/file/86b2dc906fb444b8bb6f7.jpg', 'Kalah.jpg', caption, m)
        }

        user.lastWar = new Date() 
        
        setTimeout(() => {
          m.reply('⏳ Anda bisa bertarung lagi dalam 5 detik.\nPersiapkan strategi baru!')
        }, 5000)
      }, 2000)
    }, 2000) 
  }, 2000) 
}

handler.help = ['bertarung @user', 'fight @user']
handler.tags = ['game']
handler.command = /^(fight|bertarung)$/i
handler.group = true
handler.register = true

export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}