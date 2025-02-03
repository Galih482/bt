/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, { text, conn, usedPrefix, command }) => {
	let org = `*Contoh:*\n${usedPrefix + command} @${m.sender.split("@")[0]}`
	let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false
	if (!who && (command === "block" || command === "unblock")) return m.reply(org)
	
	let res = [];
	console.log(command)
	switch (command) {
		case "blok":
		case "block":
			if (who) await conn.updateBlockStatus(who, "block").then(() => {
				res.push(who);
			})
			else conn.reply(m.chat, why, m, { mentions: [m.sender] })
			break

        case "unblok":
        case "unblock":
        	if (who) await conn.updateBlockStatus(who, "unblock").then(() => {
				res.push(who);
			})
			else conn.reply(m.chat, why, m, { mentions: [m.sender] })
        	break

		case "blocklist":
		case "listblock":
			await conn.fetchBlocklist().then(async data => {
				let txt = `*「  Daftar Nomor Yang Diblokir  」*\n\n*Total:* ${data.length}\n\n┌─\n`
				for (let i of data) {
					txt += `├ @${i.split("@")[0]}\n`
				}
				txt += "└────"
				return conn.reply(m.chat, txt, m, { mentions: await conn.parseMention(txt) })
			}).catch(err => {
				console.log(err);
				throw 'tidak ada yang diblokir!'
			})
			break
	}

	if (res[0]) conn.reply(m.chat, `\n   Sukses ${command} ${res ? `${res.map(v => '@' + v.split("@")[0])}` : ''}`, m, { mentions: res })
}

Tio.help = ["block", "unblock", "blocklist"]
Tio.tags = ["owner"]
Tio.command = /^(block|unblock|blocklist|listblock)$/i
Tio.rowner = true

export default Tio