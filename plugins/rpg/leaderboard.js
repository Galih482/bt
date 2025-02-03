// 🌟 *LEADERBOARD STATS* 🏆
// Crafted with ❤️ by sadxzyq

let handler = async (m, { conn, args, participants }) => {
  let users = Object.entries(global.db.data.users).map(([key, value]) => {
    return {...value, jid: key}
  })
  
  // Menyusun leaderboard berdasarkan beberapa kategori
  let sortedExp = users.map(toNumber('exp')).sort(sort('exp'))
  let sortedLim = users.map(toNumber('limit')).sort(sort('limit'))
  let sortedLevel = users.map(toNumber('level')).sort(sort('level'))
  let sortedMoney = users.map(toNumber('money')).sort(sort('money'))
  let sortedBank = users.map(toNumber('bank')).sort(sort('bank'))
  let sortedAtm = users.map(toNumber('atm')).sort(sort('atm'))
  
  let usersExp = sortedExp.map(enumGetKey)
  let usersLim = sortedLim.map(enumGetKey)
  let usersLevel = sortedLevel.map(enumGetKey)
  let usersMoney = sortedMoney.map(enumGetKey)
  let usersBank = sortedBank.map(enumGetKey)
  let usersAtm = sortedAtm.map(enumGetKey)

  // Menentukan panjang leaderboard yang ditampilkan
  let len = args[0] ? args[0] : 15
  
  let text = `
🌟 *LEADERBOARD* 🌟

🏆 *XP Leaderboard Top #${len}* 🏆
🎯 Kamu: *${usersExp.indexOf(m.sender) + 1}* dari *${usersExp.length}*
${sortedExp.slice(0, len).map(({ jid, exp }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `${conn.getName(jid.split`@`[0])}\nwa.me/${jid.split`@`[0]} *${exp} Exp*` : ''}${jid.split`@`[0]} *${exp} Exp*`).join`\n`}

💎 *Bank Leaderboard Top #${len}* 💎
🎯 Kamu: *${usersBank.indexOf(m.sender) + 1}* dari *${usersBank.length}*
${sortedBank.slice(0, len).map(({ jid, bank }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `${conn.getName(jid.split`@`[0])}\nwa.me/${jid.split`@`[0]} *${bank} Bank*` : ''}${jid.split`@`[0]} *${bank} Bank*`).join`\n`}

🏦 *ATM Leaderboard Top #${len}* 🏦
🎯 Kamu: *${usersAtm.indexOf(m.sender) + 1}* dari *${usersAtm.length}*
${sortedAtm.slice(0, len).map(({ jid, atm }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `${conn.getName(jid.split`@`[0])}\nwa.me/${jid.split`@`[0]} *${atm} Atm*` : ''}${jid.split`@`[0]} *${atm} Atm*`).join`\n`}

💳 *Limit Leaderboard Top #${len}* 💳
🎯 Kamu: *${usersLim.indexOf(m.sender) + 1}* dari *${usersLim.length}*
${sortedLim.slice(0, len).map(({ jid, limit }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `${conn.getName(jid.split`@`[0])}\nwa.me/${jid.split`@`[0]} *${limit} Limit*` : ''}${jid.split`@`[0]} *${limit} Limit*`).join`\n`}

🏅 *Level Leaderboard Top #${len}* 🏅
🎯 Kamu: *${usersLevel.indexOf(m.sender) + 1}* dari *${usersLevel.length}*
${sortedLevel.slice(0, len).map(({ jid, level }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `${conn.getName(jid.split`@`[0])}\nwa.me/${jid.split`@`[0]} *Level ${level}*` : ''}${jid.split`@`[0]} *Level ${level}*`).join`\n`}

💰 *Money Leaderboard Top #${len}* 💰
🎯 Kamu: *${usersMoney.indexOf(m.sender) + 1}* dari *${usersMoney.length}*
${sortedMoney.slice(0, len).map(({ jid, money }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `${conn.getName(jid.split`@`[0])}\nwa.me/${jid.split`@`[0]} *Money ${money}*` : ''}${jid.split`@`[0]} *Money ${money}*`).join`\n`}

🔥 *Ayo, terus tingkatkan level dan kekayaanmu!* 💪
💎 Jangan lupa untuk *claim* hadiahmu dan lakukan aktivitas untuk mendapatkan lebih banyak XP, uang, dan item! 💰
🎯 *Siapa yang akan menjadi TOP #1 selanjutnya?* 🤩
`.trim()

  // Mengirim pesan gambar dan leaderboard
  conn.sendMessage(m.chat, {image: {url: await flaaa.getRandom() + 'Leaderboard'}, caption: text}, {quoted: m})
}

handler.help = ['leaderboard']
handler.tags = ['rpg']
handler.command = /^(l(eader)?b(oard)?)$/i
handler.group = true

export default handler

// Fungsi untuk mengurutkan berdasarkan properti
function sort(property, ascending = true) {
  if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
  else return (...args) => args[ascending & 1] - args[!ascending & 1]
}

// Fungsi untuk konversi ke angka
function toNumber(property, _default = 0) {
  if (property) return (a, i, b) => {
    return {...b[i], [property]: a[property] === undefined ? _default : a[property]}
  }
  else return a => a === undefined ? _default : a
}

// Fungsi untuk mendapatkan key pengguna
function enumGetKey(a) {
  return a.jid
}