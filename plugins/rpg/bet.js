let confirm = {}

async function handler(m, { conn, args }) {
    if (m.sender in confirm) throw '⚠️ *Kamu masih melakukan judi! Tunggu hasilnya!*'
    
    try {
        let user = global.db.data.users[m.sender]
        let count = (args[0] && number(parseInt(args[0])) ? Math.max(parseInt(args[0]), 1) : /all/i.test(args[0]) ? Math.floor(parseInt(user.money)) : 1) * 1
        if (user.money < count) return m.reply('❌ *Uang kamu tidak cukup!*')

        if (!(m.sender in confirm)) {
            confirm[m.sender] = {
                sender: m.sender,
                uang: count,
                count,
                timeout: setTimeout(() => (m.reply('⏳ *Waktu habis! Taruhan dibatalkan.*'), delete confirm[m.sender]), 60000)
            }
            user.money -= count
            let txt = `🎰 *Taruhan Dimulai!*\n💰 *Jumlah:* ${count}\n⏳ *Waktu: 60 detik*\n\n*Balas "Iya" untuk lanjut atau "Tidak" untuk batal.*`
            return conn.reply(m.chat, txt, m)
        }
    } catch (e) {
        console.error(e)
        if (m.sender in confirm) {
            let { timeout } = confirm[m.sender]
            clearTimeout(timeout)
            user.money += confirm[m.sender].uang
            delete confirm[m.sender]
            m.reply('⚠️ *Taruhan dibatalkan karena terjadi kesalahan!*')
        }
    }
}

handler.before = async m => {
    if (!(m.sender in confirm)) return
    if (m.isBaileys) return
    let { timeout, count } = confirm[m.sender]
    let user = global.db.data.users[m.sender]
    let moneyDulu = user.money
    let txt = (m.msg && m.msg.selectedDisplayText ? m.msg.selectedDisplayText : m.text ? m.text : '').toLowerCase()

    try {
        if (/^(Iya|y(es|a))?$/i.test(txt)) {
            let Bot = Math.ceil(Math.random() * 91)
            let Kamu = Math.floor(Math.random() * 71)
            let status = 'Kalah'
            let hasilTaruhan

            if (Bot < Kamu) {
                user.money += count * 2
                status = 'Menang'
                hasilTaruhan = `🎉 *Selamat!* Kamu menang dan mendapatkan 💰 *+${count * 2}*`
            } else if (Bot > Kamu) {
                user.money -= count
                hasilTaruhan = `😢 *Yah!* Kamu kalah dan kehilangan 💸 *-${count}*`
            } else {
                status = 'Seri'
                user.money += Math.floor(count / 1.5)
                hasilTaruhan = `⚖️ *Seri!* Kamu mendapatkan kembali 💰 *+${Math.floor(count / 1.5)}*`
            }

            // Tampilkan animasi "Dadu Berputar..."
            let rollingText = "🎲 *Dadu Berputar...* 🎲\n⏳ *Tunggu sebentar...*"
            let rollingMessage = await conn.reply(m.chat, rollingText, m)

            // Delay 3 detik agar terasa nyata
            await new Promise(resolve => setTimeout(resolve, 3000))

            // Edit pesan dengan hasil taruhan
            await conn.sendMessage(m.chat, {
                text: `🎲 *Hasil Taruhan*\n\n🤖 *Bot:* ${Bot}\n🧑 *Kamu:* ${Kamu}\n\n${hasilTaruhan}`,
                edit: rollingMessage.key
            })

            clearTimeout(timeout)
            delete confirm[m.sender]
            return !0
        } else if (/^(Tidak|no)?$/i.test(txt)) {
            clearTimeout(timeout)
            delete confirm[m.sender]
            m.reply('❌ *Taruhan dibatalkan!*')
            return !0
        }

    } catch (e) {
        clearTimeout(timeout)
        delete confirm[m.sender]
        if (moneyDulu > user.money) user.money = moneyDulu
        m.reply('⚠️ *Error saat melakukan judi! Taruhan dibatalkan.*')
        return !0
    } finally {
        clearTimeout(timeout)
        delete confirm[m.sender]
        return !0
    }
}

handler.help = ['judi']
handler.tags = ['rpg']
handler.command = /^(judi|bet)$/i

export default handler

// Fungsi untuk cek angka valid
function number(x = 0) {
    x = parseInt(x)
    return !isNaN(x) && typeof x == 'number'
}
