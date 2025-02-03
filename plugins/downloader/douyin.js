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
    text,
    conn
}) => {
    if (!text) return m.reply('masukan url dari douyin');
    try {
        m.reply(wait)
        let {
            media,
            status,
            slide
        } = await downloader.douyin(text);
        if (status !== 200) throw 'ada kesalahan sistem';
        let no = 1
        if (slide) {
            for (let res of media) {
                conn.sendFile(m.chat, res, '', `Image - ${no++}`, m)
                await conn.delay(500)
            }
        } else {
            conn.sendFile(m.chat, media.mp4_hd, '', `\`Result from douyin: ${text}\``, m)
        }

    } catch (e) {
        throw msg.error
    }
}
Tio.help = Tio.command = ['douyin']
Tio.tags = ['downloader']
Tio.limit = true

export default Tio