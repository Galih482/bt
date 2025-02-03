/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

const Tio = async (m, { conn }) => {
	if (!m.quoted) {
		return m.reply("Reply to viewOnce message");
	}

	const quoted = m.quoted;
	const isViewOnce = Object.keys(quoted?.message || {})
		.map((key) => quoted?.message[key]?.viewOnce)
		.includes(true);

	if (!isViewOnce) {
		return m.reply("Reply to viewOnce message");
	}

	const buffer = await m?.quoted?.download?.().catch(() => {});
	const media = m?.quoted?.mediaMessage[m?.quoted?.mediaType];
	const mtype = media?.mimetype;
	const isImage = /image/.test(mtype) ? "image" : false;
	const isVideo = /video/.test(mtype) ? "video" : false;
	const isAudio = /audio/.test(mtype) ? "audio" : false;
	const isMedia = isImage || isVideo || isAudio;

	conn.sendMessage(
		m.chat,
		{
			...(isMedia && { [isMedia]: buffer }),
			...(media?.caption && { caption: media?.caption }),
		},
		{ quoted: m }
	);
};

Tio.help = ["readviewonce"];
Tio.tags = ["tools"];
Tio.command = ["readviewonce", "rvo"];

export default Tio;