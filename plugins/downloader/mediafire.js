/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, {
    usedPrefix,
    command,
    conn,
    isPrems,
    text
}) => {
    if (!text) return m.reply(await Func.exam(usedPrefix, command, 'https://www.mediafire.com/file/pwxob70rpgma9lz/GBWhatsApp_v8.75%2528Tutorial_Yud%2529.apk/file'));

    if (!(text.includes('http://') || text.includes('https://'))) return m.reply(`url tidak valid, harap masukkan url yang valid. Coba dengan menambahkan http:// or https://`)
    if (!text.includes('mediafire.com')) throw 'Link bukan MediaFire'

    try {
        await m.reply(msg.wait)

        const {
            result
        } = await Func.fetchJson(API(APIs["Tixo"], '/downloader/mediafire', {
            url: text
        }));
        const {
            fileName,
            link,
            size
        } = result;

        if (!isPrems && size[1] >= 30) return m.reply(`*File Over Limit*: ${size[1] + size[2]}\n\nSilahkan beli premium untuk menambah batas limit Download Mediafire`.toUpperCase())
const fileExtension = link.split('.').pop().toLowerCase();
        let mimeType;

        switch (fileExtension) {
            case 'apk':
                mimeType = 'application/vnd.android.package-archive';
                break;
            case 'zip':
                mimeType = 'application/zip';
                break;
            case 'pdf':
                mimeType = 'application/pdf';
                break;
            case 'jpg':
            case 'jpeg':
                mimeType = 'image/jpeg';
                break;
            case 'png':
                mimeType = 'image/png';
                break;
            case 'mp4':
                mimeType = 'video/mp4';
                break;
            
            default:
                mimeType = 'application/octet-stream'; 
        }
        const caption = `*MEDIAFIRE DOWNLOADER*

📄 *Name* : ${fileName}
⚖️ *Size* : ${size[1] + size[2]}
🔗 *Link* : ${text}`
        await conn.sendFile(m.chat, link, `${fileName}`, caption, m, null, {
            mimetype: mimeType,
            asDocument: true
        })
    } catch (err) {
        m.reply(msg.error);
    }
}
Tio.help = ['mediafire']
Tio.tags = ['downloader']
Tio.command = /^(mediafire|mf)$/i
Tio.register = true
Tio.limit = true

export default Tio