/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    if (!text) return m.reply(await Func.exam(usedPrefix, command, '<url video sosmed>'))
    try {
        m.reply(msg.wait)
        const result = await Func.fetchJson(API(APIs["Tixo"], "/downloader/aio-v2", { url: text }));
        const videoHD = result.result.video.filter(v => v.format === "MP4");
        if (videoHD) {
            await conn.sendFile(m.chat, videoHD[0].downloadLink, '', result.result.title, m);
        } else {
            m.reply("No HD video found.")
        }
    } catch (e) {
      m.reply(msg.error)

    }
}

Tio.help = ["aio"]
Tio.tags = ["downloader"]
Tio.command = /^(aio)$/i
export default Tio