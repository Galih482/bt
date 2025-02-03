/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, {
	conn,
	text,
	usedPrefix
}) => {
	let response = "• *PREMIUM SUBSCRIPTION*\n\n";
	let totalPremium = 0;

	for (let user in global.db.data.users) {
		if (global.db.data.users[user].premium) {
			let number = user.split("@")[0];
			let name = global.db.data.users[user].name || "";
			let days = Math.abs(Math.floor((global.db.data.users[user].premiumTime - new Date()) / (24 * 60 * 60 * 1000)));
			let hours = Math.abs(Math.floor((global.db.data.users[user].premiumTime - new Date()) / (60 * 60 * 1000))) % 24;
			let minutes = Math.abs(Math.floor((global.db.data.users[user].premiumTime - new Date()) / (60 * 1000))) % 60;

			response += `∝───────•••───────\n◦  *${number}*\n•  ${name}\n*Active period*: ${days} Hari ${hours} Jam ${minutes} Menit\n∝───────•••───────\n`;

			totalPremium++;
		}
	}

	response += `┌  ◦  Total Premium : *${totalPremium}*\n`;
	response += "└  ◦  Upgrade Premium: *.owner*";

	m.reply(response, m.from, {
		contextInfo: {
			mentionedJid: Object.keys(global.db.data.users).filter(jid => global.db.data.users[jid].premium)
		}
	});
}

Tio.help =  ['listpremium']
Tio.command = /^(listprem(ium|iums)?)$/i
Tio.tags = ['info']

Tio.owner = true

export default Tio