/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import fs from 'fs'
let Tio = async (m, { conn, text }) => {
    m.reply('Tunggu Sebentar, Sedang mengambil file Database')
    let sesi = await fs.readFileSync('./database.json')
    return await conn.sendMessage(m.chat, { document: sesi, mimetype: 'application/json', fileName: 'database.json' }, { quoted: m })
}
Tio.help = ['getdb']
Tio.tags = ['owner']
Tio.command = /^(getdb)$/i
Tio.rowner = true

export default Tio