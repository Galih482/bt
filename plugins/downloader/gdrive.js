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
    usedPrefix,
    command,
    text
}) => {
    
    if (!text) return m.reply(await Func.exam(usedPrefix, command, ' https://dirve.google.com/contoh_doang'))
    m.reply(msg.wait)
    downloader.GDriveDl(text).then(async (res) => {
        if (!res) throw res
        await m.reply(JSON.stringify(res, null, 2))
        conn.sendMessage(m.chat, {
            document: {
                url: res.downloadUrl
            },
            fileName: res.fileName,
            mimetype: res.mimetype
        }, {
            quoted: m
        })
    })
}
Tio.help = ['gdrive <link>']
Tio.tags = ['downloader']
Tio.command = /^(gdrive)$/i
Tio.limit = true
Tio.register = true

export default Tio