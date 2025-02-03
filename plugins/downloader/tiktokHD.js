/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
    if (!text) return m.reply(await Func.exam(usedPrefix, command, 'https://vt.tiktok.com/ZSYgBPSLD/'));

    await m.react('🔎')

    const {
        data
    } = await Func.fetchJson(API(APIs["Tixo"], '/downloader/tiktok-hd', {
        url: text
    }))

    let caption = `乂 *T I K T O K*
- *Quality:* ${data.serverHD.quality}
- *Description:* ${data.caption}`

    conn.sendMessage(m.chat, {
        video: {
            url: data.serverHD.url
        },
        caption
    }, {
        quoted: m
    }).then(() => {
        m.react('✔️')
    });
}
Tio.help = ['tiktokhd']
Tio.tags = ['downloader']
Tio.command = /^(t(ik)?t(ok)?hd)$/i
Tio.limit = true
Tio.register = true

export default Tio