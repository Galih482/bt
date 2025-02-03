/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import fs from 'fs'

let Tio = async (m, {
    conn,
    args,
    text,
    usedPrefix,
    command
}) => {
    
	if (!text) return m.reply(await Func.exam(usedPrefix, command, '.|index.js'));
				var folder = text.split('|')[0]
				var file = text.split('|')[1]
				if (!folder) return m.reply(`nama foldernya apa banh?`)
				if (!file) return m.reply(`nama filenya apa banh?`)
				var user_bot = await fs.readFileSync(`./${folder}/${file}`)
				conn.sendMessage(m.chat, {
					document: user_bot,
					mimetype: 'document/application',
					fileName: `${file}`
				}, {
					quoted: m
					})
}
Tio.help = ['getfile']
Tio.tags = ['owner']
Tio.command = /^(getfile)$/i
Tio.rowner = true

export default Tio