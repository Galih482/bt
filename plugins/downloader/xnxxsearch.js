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
		throw 'Input teks atau reply teks!';
	}
  try {
  await m.react('🔍')
  const search = await fetch(
    `https://api.betabotz.eu.org/api/search/xnxx?query=${text}&apikey=beta-galih`
  );
  const hasil = await search.json();
  
  let teks = `*XNXX RESULTS* \n\n🔍 *KEYWORDS* *${text}*\n\n`;
  let no = 1;
  
  for (let i of hasil.result) {
    teks += `📑 *No* : ${no++}\n📚 *Title* : ${i.title}\n⏱️ *Duration* : ${i.duration}\n🔗 *URL* ${i.link}\n\n─────────────────\n\n`;
  }
  await conn.sendMessage(m.chat, { image: { url: hasil.result[0].thumb }, caption: teks }, { quoted: m });
  m.react('✅')
} catch (e) {
throw `Can't find data!`
}
 };

Tio.tags = ["downloader"];
Tio.help = ["xnxxsearch"];
Tio.command = ["xnxxsearch", "xnxxs"];
Tio.premium = true
export default Tio;