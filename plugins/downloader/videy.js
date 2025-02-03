/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import kode from 'kode-scrape'
const { downloader } = kode;

let Tio = async (m, {
    text
}) => {
    if (!text) return m.reply('masukan url dari videy.co')
    if (!(await cek(text)).isValid) return m.reply('itu bukan link dari videy.co')
    let result = await downloader.videy(text);
    if (result.status) {
        await conn.sendFile(m.chat, `${result.url}`, '', "*DOWNLOADER videy.co*", m)
    } else {
        throw "ada kesalahan"
    }

}
Tio.help = ['videy']
Tio.tags = ['downloader']
Tio.command = /^(videy)$/i
Tio.limit = 7
Tio.register = true

export default Tio

function cek(url) {
    const pattern = /^https?:\/\/videy\.co\/v\?id=([\w-]+)$/;

    const match = url.match(pattern);
    if (match) {
        return {
            isValid: true,
            id: match[1]
        };
    } else {
        return {
            isValid: false,
            id: null
        };
    }
}