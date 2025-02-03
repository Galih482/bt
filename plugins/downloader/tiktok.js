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
    args,
    command,
    usedPrefix
}) => {
    if (!text) return m.reply(await Func.exam(usedPrefix, command, 'https://vt.tiktok.com/ZSYgBPSLD/'));

    if (!(text.includes('http://') || text.includes('https://'))) return m.reply(`url invalid, please input a valid url. Try with add http:// or https://`)
    if (!text.includes('tiktok.com')) return m.reply(`Invalid Tiktok URL.`)
    try {
        const {
            isSlide,
            result,
            title,
            author
        } = await downloader.tiktok(text);
        let no = 1

        if (isSlide == true) {
            await m.reply('*Terdeteksi URL Tiktok Slide\nFoto Dikirim ke Chat Pribadi*')
            let cap = `乂 *TIK TOK SLIDE*\n\n`
            for (let img of result) {


                await conn.sendMessage(m.sender, {
                    image: await Func.fetchBuffer(img)
                })
                await conn.delay(500)
            }
        } else if (isSlide == false) {
            await m.reply('*TERDETEKSI URL TIKTOK VIDEO*')
            let vd = `*${title}*

- Author: ${author}`

            await conn.sendMessage(m.chat, {
                video: await Func.fetchBuffer(result),
                caption: vd
            }, {
                quoted: m
            })

        }
    } catch (e) {
        throw msg.error
    }
}

Tio.help = ['tiktok']
Tio.tags = ['downloader']
Tio.command = /^(t(ik)?t(ok)?|t(ik)?t(ok)?dl)$/i

Tio.register = true
Tio.limit = true

export default Tio