/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import kode from 'kode-scrape'
const {
    downloader
} = kode;

let Tio = async (m, {
    conn,
    text
}) => {
    if (!text) throw "[example] : .soundcloud https://on.soundcloud.com/gVG8z"

    try {
        await m.reply(msg.wait)
        let {
            title,
            link
        } = await downloader.soundcloud(text);
        await conn.sendFile(m.chat, link, '', null, m, false)
    } catch (e) {
        throw msg.error
    }
}
Tio.help = Tio.command = ["soundcloud"]
Tio.tags = ["downloader"]
Tio.limit = true

export default Tio