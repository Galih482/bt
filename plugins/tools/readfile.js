/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

let handler = async (m, { conn }) => {
    if (!m.quoted) return m.reply('Balas pesan yang berisi file untuk dibaca.')

    let mime = m.quoted.mimetype || ''
    if (mime.includes('zip')) {
        return m.reply('File .zip tidak didukung.')
    }

    if (
        !mime.startsWith('text/') &&
        !mime.includes('javascript') &&
        !mime.includes('html') &&
        !mime.includes('css') &&
        !mime.includes('json') &&
        !mime.includes('xml') &&
        !mime.includes('csv') &&
        !mime.includes('markdown') &&
        !mime.includes('plain')
    ) {
        return m.reply('File yang didukung hanya format teks seperti .txt, .js, .html, .css, .json, .xml, .csv, atau .md.')
    }

    try {
        let media = await m.quoted.download()
        let teks = media.toString('utf-8')
        if (teks.length > 4000) {
            return m.reply('File terlalu panjang untuk ditampilkan.')
        }
        m.reply(teks)
    } catch (err) {
        console.error(err)
        m.reply('Terjadi kesalahan saat membaca file.')
    }
}

handler.help = ['readfile']
handler.command = ['readfile']
handler.tags = ['tools']

export default handler