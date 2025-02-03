/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import fetch from 'node-fetch'
import {
    Sticker,
    StickerTypes
} from 'wa-sticker-formatter'

let Tio = async (m, {
    command,
    usedPrefix,
    conn,
    args
}) => {
    m.reply(msg.wait)
    let res = await YesNo()
    let stiker = await createSticker(false, res.image, "Bot say ", (res.answer).toUpperCase(), 30)

    try {
        await m.reply(stiker)
    } catch (e) {
        m.reply(msg.error)
    }
}
Tio.help = ["yesno"]
Tio.tags = ["fun"]
Tio.command = /^(yesno)$/i

export default Tio

async function YesNo() {
    const response = await fetch(
        `https://yesno.wtf/api`
    );
    const data = await response.json();
    return data;
}

async function createSticker(img, url, packName, authorName, quality) {
    let stickerMetadata = {
        type: 'full',
        pack: packName,
        author: authorName,
        quality
    }
    return (new Sticker(img ? img : url, stickerMetadata)).toBuffer()
}