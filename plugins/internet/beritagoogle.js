import fetch from 'node-fetch';

const Tio = async (m, { conn, args, usedPrefix, command }) => {
	let text;
	if (args.length >= 1) {
		text = args.slice(0).join(" ");
	} else if (m.quoted && m.quoted.text) {
		text = m.quoted.text;
	} else {
		throw 'Harap masukkan teks atau reply ke teks!';
	}

	try {
		await m.react('🔍');

		const res = await fetch(
			`https://api.maelyn.tech/api/gnewslast?topic=${encodeURIComponent(text)}&apikey=galih`
		);
		if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
console.log('res= ', res) 

		const data = await res.json();
console.log('data=', data)

		if (data.status === "Success" && Array.isArray(data.result) && data.result.length > 0) {
			let replyText = `🔎 Hasil pencarian untuk *"${text}"*:\n\n`;
			for (let item of data.result) {
				replyText += `𝓼 *${item.title}*\n`;
				replyText += `*🔗 URL:* ${item.link}\n`;
				replyText += `*📰 Sumber:* ${item.source}\n`;
				replyText += `*⏰ Waktu:* ${item.time}\n`;
				replyText += `*🗓️ Tanggal:* ${item.datetime}\n\n`;
			}
			m.reply(replyText);
		} else {
			await m.react("❌");
			m.reply("❗ Tidak ada hasil pencarian yang ditemukan.");
		}
	} catch (error) {
		console.error(error);
		await m.react("❌");
		m.reply("⚠️ Terjadi kesalahan saat mengambil data. Silakan coba lagi nanti.");
	}
};

Tio.tags = ["internet"];
Tio.help = ["googleberita", "gnews"];
Tio.command = ["googleberita", "gnews"];
Tio.premium = false;
Tio.register = true;

export default Tio;