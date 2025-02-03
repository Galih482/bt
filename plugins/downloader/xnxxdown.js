import fetch from 'node-fetch';

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
		throw '```Masukan link!```';
	}
 try {
 await m.react('🕘')
let anu = await fetch(`https://api.betabotz.eu.org/api/download/xnxxdl?url=${text}&apikey=${lann}`)
let hasil = await anu.json() 

conn.sendMessage(m.chat, { video: { url: hasil.result.url }, fileName: 'xnxx.mp4', mimetype: 'video/mp4' }, { quoted: m })
m.react('✅')
 } catch (e) {
 throw `*Server error!*`
 }
}
Tio.help = ['xnxxdown']
Tio.command = ['xnxxdown', 'xnxxdownload', 'xnxxd']
Tio.tags = ["downloader"];
export default Tio;