/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import kode from 'kode-scrape'
const { downloader } = kode;

let Tio = async (m, {
    conn,
    text,
    command
}) => {
    if (!text) throw "masukan url";

    try {
        await m.reply(msg.wait);

        let {
            title,
            thumbnail,
            source,
            medias
        } = await downloader.xhs(text);

        if (medias[0].extension == "mp4") {
            await conn.sendMessage(m.chat, {
                video: {
                    url: medias[1].url
                },
                caption: `Title: ${title}\nSource: ${source}`
            }, {
                quoted: m
            })
        } else if (medias[0].extension == "jpg") {
            for (let res of medias) {
                await conn.sendMessage(m.chat, {
                    image: {
                        url: res.url
                    },
                    caption: `Title: ${title}\nSource: ${source}`
                }, {
                    quoted: m
                })
                await conn.delay(500)
            }
        } else throw "gagal fetch data"
    } catch (e) {
        throw msg.error
    }
}
Tio.help = Tio.command = ['xhs']
Tio.tags = ['downloader']

export default Tio