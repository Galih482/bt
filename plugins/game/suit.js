/*
 * This code was created by Zykuan
 * © 2024 XiezuMedia. All rights reserved.
 * Do not remove this watermark or you will face a penalty.
*/

let handler = async (m, { text, usedPrefix }) => {
    let salah = `🔍 *Pilihan yang tersedia:*\n\n✂️ *gunting* | 📄 *kertas* | 🪨 *batu*\n\nContoh penggunaan: ${usedPrefix}suit gunting\n\n*Pastikan untuk memberi spasi!*`
    
    if (!text) throw salah

    let astro = Math.random()
    if (astro < 0.34) {
        astro = 'batu'
    } else if (astro < 0.67) {
        astro = 'gunting'
    } else {
        astro = 'kertas'
    }

    if (text === astro) {
        m.reply(`🤝 *Seri!*\nKamu: ${text}\nBot: ${astro}`)
    } else if (text === 'batu') {
        if (astro === 'gunting') {
            global.db.data.users[m.sender].money += 1000
            m.reply(`🏆 *Kamu menang!* +Rp1000\nKamu: ${text}\nBot: ${astro}`)
        } else {
            m.reply(`😢 *Kamu kalah!*\nKamu: ${text}\nBot: ${astro}`)
        }
    } else if (text === 'gunting') {
        if (astro === 'kertas') {
            global.db.data.users[m.sender].money += 1000
            m.reply(`🏆 *Kamu menang!* +Rp1000\nKamu: ${text}\nBot: ${astro}`)
        } else {
            m.reply(`😢 *Kamu kalah!*\nKamu: ${text}\nBot: ${astro}`)
        }
    } else if (text === 'kertas') {
        if (astro === 'batu') {
            global.db.data.users[m.sender].money += 1000
            m.reply(`🏆 *Kamu menang!* +Rp1000\nKamu: ${text}\nBot: ${astro}`)
        } else {
            m.reply(`😢 *Kamu kalah!*\nKamu: ${text}\nBot: ${astro}`)
        }
    } else {
        throw salah
    }
}
handler.help = ['suit']
handler.tags = ['game']
handler.command = /^(suit)$/i
handler.register = true
handler.limit = true

export default handler