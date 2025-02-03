/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import { sticker } from '../../lib/sticker.js'
import { ttp } from '../../lib/scraper/ttp.js'

let Tio = async (m, { conn, args, text, usedPrefix, command }) => {
let input = `[!] *wrong input*
	
Ex : ${usedPrefix + command} Pagi sayang
or
${usedPrefix + command} reply teks`

	if (!text) return m.reply(input)
	let stiker = false
	let api = await ttp(text)
stiker = await sticker(false, api[0].url, info.packname, info.author)
conn.sendFile(m.chat, stiker, 's.webp', m)
}
Tio.help = ['ttp']
Tio.tags = ['sticker']
Tio.command = /^(ttp)$/i

export default Tio