/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import fs from 'fs'
import fetch from 'node-fetch'
let Tio = async(m, { conn, text, participants }) => {
const fkontak = {
	"key": {
    "participants":"0@s.whatsapp.net",
		"remoteJid": "status@broadcast",
		"fromMe": false,
		"id": "Halo"
	},
	"message": {
		"contactMessage": {
			"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
		}
	},
	"participant": "0@s.whatsapp.net"
}

    conn.sendMessage(m.chat, { text: text, mentions: participants.map(a => a.id) }, {quoted:fkontak})
    }
Tio.help = ['hidetag']
Tio.tags = ['group']
Tio.command = /^(h(ide)?t(ag)?)$/i
Tio.group = true
Tio.admin = true

export default Tio