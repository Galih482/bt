let handler = async (m, { args, usedPrefix }) => {
    let user = global.db.data.users[m.sender]

    if (user.health >= 100) {
        return m.reply(`💖 Kamu sudah *sehat sepenuhnya*! Tidak perlu minum potion lagi! 🎉`.trim())
    }

    let buffs = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 100, 100] // Nilai buff berdasarkan user.cat
    let buff = buffs[user.cat] || 0 // Mengambil nilai buff, default ke 0 jika tidak valid
    const heal = 15 + (buff * 4)

    let maxHeal = Math.round((100 - user.health) / heal)
    let count = Math.max(1, Math.min(Number.MAX_SAFE_INTEGER, (isNumber(args[0]) ? parseInt(args[0]) : maxHeal)))

    if (user.potion < count) {
        return m.reply(`
🚨 *Potion Tidak Cukup!* 🚨
🧪 Potion yang kamu punya: *${user.potion}*
💰 Ketik *${usedPrefix}shop beli potion ${count - user.potion}* untuk membeli lebih banyak!
`.trim())
    }

    user.potion -= count
    user.health = Math.min(100, user.health + (heal * count)) // Batas maksimal health adalah 100

    m.reply(`
✨ *Potion Diminum!* ✨
💖 Kamu menggunakan *${count}* potion dan sekarang sehat kembali!  
🔥 *Health:* ${user.health}/100 ❤️
🚀 Tetap semangat dalam petualanganmu! 🌟
`.trim())
}

handler.help = ['heal']
handler.tags = ['rpg']
handler.command = /^(heal)$/i

export default handler

function isNumber(value) {
    return !isNaN(value) && typeof value === 'number'
}
