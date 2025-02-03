/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

let Tio = async (m, { conn, text, usedPrefix, command }) => {
    let list = Object.keys(db.data.users)
    let deletedCount = 0
    let ownerJid = conn.user.jid

    for (let x of list) {
        if (x !== owner + info.jid && x !== conn.user.jid) {
            delete db.data.users[x]
            deletedCount++
        }
    }
    await m.reply(`Berhasil: ${deletedCount} pengguna dihapus dari database.`)
}

Tio.help = ['resetuser']
Tio.tags = ['owner']
Tio.command = /^(resetuser)$/i
Tio.rowner = true

export default Tio