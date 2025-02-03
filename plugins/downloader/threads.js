/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, {
    conn,
    text,
    command,
    usedPrefix
}) => {
    if (!text) return m.reply(await Func.exam(usedPrefix, command, 'https://www.threads.net/@lysa_tangkulung/post/C9E6EHtxSDJ?xmt=AQGzQLLa0XYPeolw9muZOKoojZNohPqWtvmGbgEj7jtu7Q'))

    try {
        await m.reply(msg.wait)
        let {
            result: res
        } = await Func.fetchJson(API(APIs['Tixo'], '/downloader/threads', {
            url: text
        }));
        let {
            title,
            result,
            isVideo
        } = res;
        for (let i of result) {
            await conn.sendFile(m.chat, i.url, '', isVideo ? title : '', m)
        }

    } catch (e) {
        m.reply(msg.error)
    }
}
Tio.help = Tio.command = ["threads"]
Tio.tags = ["downloader"]

export default Tio