/**
🎭 *AFK System - Versi Realistis* 🎭
📌 @credit: Tio | Tixo MD | Whatsapp Bot
📞 wa.me/6282285357346
**/

let handler = async (m, { text }) => {
    let user = global.db.data.users[m.sender]
    user.afk = Date.now() // Set waktu AFK dalam milidetik
    user.afkReason = text || 'Tidak ada alasan yang diberikan... 💤'

    await conn.sendMessage(m.chat, { 
        text: `🚀 *Mode AFK Aktif!* 🚀\n\n🔹 *Nama:* @${m.sender.split('@')[0]}\n🔹 *Status:* *AFK*\n🔹 *Alasan:* ${user.afkReason}\n⏳ *Mulai dari:* ${formatTime(Date.now())}\n\n💡 *Balas pesan ini atau ketik sesuatu untuk kembali!*`, 
        mentions: [m.sender] 
    }, { quoted: m })
}

handler.help = ['afk']
handler.tags = ['group']
handler.command = /^afk$/i
handler.group = true

handler.before = async (m) => {
    let user = global.db.data.users[m.sender]
    if (!m.isGroup) return

    // Cek jika pengguna kembali dari AFK
    if (user.afk > -1) {
        let duration = Date.now() - user.afk
        m.reply(`🎉 *Selamat datang kembali, @${m.sender.split('@')[0]}!* 🎉\n\n📌 *Alasan AFK:* ${user.afkReason}\n⏳ *Durasi:* ${formatDuration(duration)}\n💡 *Kembali beraktivitas seperti biasa!*`)
        
        user.afk = -1
        user.afkReason = ''
        user.tagCount = 0 // Reset jumlah tag saat kembali dari AFK
    }

    let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
    for (let jid of jids) {
        let targetUser = global.db.data.users[jid]
        if (!targetUser || targetUser.afk < 0) return

        // Inisialisasi jumlah tag jika belum ada
        targetUser.tagCount = (targetUser.tagCount || 0) + 1

        let remainingTags = 5 - targetUser.tagCount

        if (targetUser.tagCount > 5) {
            let fine = 10000
            let userMoney = global.db.data.users[m.sender].money || 0

            if (userMoney >= fine) {
                global.db.data.users[m.sender].money -= fine
                m.reply(`⚠️ *Peringatan! Kamu terlalu sering mengganggu pengguna AFK!* ⚠️\n💰 *Denda: -Rp${fine}*\n💸 *Sisa saldo:* Rp${global.db.data.users[m.sender].money}\n\n💡 *Jangan tag terlalu sering!*`)
            } else {
                m.reply(`❌ *Denda gagal! Uang kamu tidak cukup!* ❌\n💰 *Saldo saat ini:* Rp${userMoney}\n💡 *Untungnya kamu tidak dikenakan denda kali ini...*`)
            }

            targetUser.tagCount = 0 // Reset jumlah tag setelah penalti
            return
        }

        let reason = targetUser.afkReason || 'Tidak ada alasan'
        let afkDuration = Date.now() - targetUser.afk

        m.reply(`⛔ *Pengguna sedang AFK! Jangan ganggu!* ⛔\n\n📝 *Alasan:* ${reason}\n⏳ *Sudah AFK selama:* ${formatDuration(afkDuration)}\n🚀 *Sisa tag yang diperbolehkan sebelum penalti:* ${remainingTags}`)
    }
}

export default handler

// 🔹 Format Waktu (WIB - GMT+7)
function formatTime(timestamp) {
    let date = new Date(timestamp + 7 * 3600000) // Tambahkan 7 jam untuk WIB (GMT+7)
    let hours = date.getUTCHours().toString().padStart(2, '0')
    let minutes = date.getUTCMinutes().toString().padStart(2, '0')
    let seconds = date.getUTCSeconds().toString().padStart(2, '0')
    return `${hours}:${minutes}:${seconds} WIB`
}

// 🔹 Format Durasi (Hari, Jam, Menit, Detik)
function formatDuration(ms) {
    let d = Math.floor(ms / 86400000) // Hari
    let h = Math.floor(ms / 3600000) % 24 // Jam
    let m = Math.floor(ms / 60000) % 60 // Menit
    let s = Math.floor(ms / 1000) % 60 // Detik
    return `${d > 0 ? `${d} hari, ` : ''}${h > 0 ? `${h} jam, ` : ''}${m > 0 ? `${m} menit, ` : ''}${s > 0 ? `${s} detik` : ''}`
}
