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
@Support dengan Donasi ✨
wa.me/6282285357346
**/
import { Sticker } from 'wa-sticker-formatter'

let Tio = async (m, {
    conn,
    text
}) => {
    if (!text) return m.reply('Masukan emoji');
    try {
        
        const result = await createSticker(await Func.fetchBuffer(`${global.APIs["Tixo"]}/tools/emoji?emoji=${text}`), false, info.packname, info.author, 10)
        await conn.sendFile(m.chat, result, '', '', m);

    } catch (err) {
        console.log(err)
        m.reply(msg.error);
    }
}
Tio.help = Tio.command = ['semoji']
Tio.tags = ['sticker']

export default Tio

async function createSticker(img, url, packName, authorName, quality) {
	let stickerMetadata = {
		type: 'full',
		pack: packName,
		author: authorName,
		quality
	}
	return (new Sticker(img ? img : url, stickerMetadata)).toBuffer()
}