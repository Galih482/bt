/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import kode from 'kode-scrape'
const { ai } = kode;

const Tio = async (m, {
	conn,
	args,
	usedPrefix,
	command
}) => {
	let text;
	if (args.length >= 1) {
		text = args.slice(0).join(" ");
	} else if (m.quoted && m.quoted.text) {
		text = m.quoted.text;
	} else {
		throw 'Input teks atau reply teks!';
	}

	await m.reply(msg.wait);
try {
		const { results, credit } = await ai.bingImage(global.APIKeys["Bing"], text);
		
		
		for (let file of results) {
						await conn.sendFile(
							m.chat,
							file.url,
							'',
							`*Remaining Credits*: ${credit}\n*Prompt*: ${text}`,
							m,
							false, {
								mentions: [m.sender],
							}
						);
						}
	} catch (error) {
		console.error(`Error in Tio: ${error.message}`);
		await m.reply(`${error}\n\n${error.message}`)
	}
};

Tio.help = ["bing-img *[query]*"];
Tio.tags = ["ai"];
Tio.command = /^(bingim(a)?g(e)?)$/i;
Tio.premium = true
export default Tio;