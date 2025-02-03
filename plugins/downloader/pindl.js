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
    text,
    usedPrefix,
    command
}) => {
    if (!text) return m.reply(await Func.exam(usedPrefix, command, ' https://id.pinterest.com/pin/575757133623547811/'))

    try {
        m.reply(msg.wait)
        const {
            medias,
            title,
            duration
        } = await downloader.pinterestDownload(text);
        let mp4 = medias.filter(v => v.extension == "mp4");
        if (mp4.length !== 0) {
            await conn.sendMessage(m.chat, {
                video: {
                    url: mp4[0].url
                },
                caption: `\`${title}\`\nQuality: ${mp4[0].quality}\nSize: ${await global.Func.toSize(mp4[0].size)}`
            }, {
                quoted: m
            })
        } else {
            await conn.sendFile(m.chat, medias[1].url, '', `\`${title}\``, m)
        }

    } catch (e) {
        throw msg.error
    }
}
Tio.help = ["pindownload"]
Tio.command = /^(pind(own)?l(oad)?)$/i
Tio.tags = ["downloader"]

export default Tio