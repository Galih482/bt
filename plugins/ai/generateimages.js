/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import kode from 'kode-scrape'
const {
    ai
} = kode;

let Tio = async (m, {
    conn,
    text,
    command
}) => {
    if (!text) {
        return m.reply("[!] ex: " + command + " girl");
    }
    try {
        if (!m.isGroup) {
            m.reply(msg.wait)
        } else if (m.isGroup) {
            m.reply("Tunggu.. hasil akan dikirim ke private chat")
        }
        let {
            result
        } = await ai.generateImage(text);
        for (let res of result) {
            await conn.sendFile(m.sender, res.url, '', `Model: \`${res.model}\``, m)
            await conn.delay(1000)
        }
    } catch (e) {
        throw eror
    }
}
Tio.help = Tio.command = ["generateimages"]
Tio.tags = ["ai"]
Tio.limit = true

export default Tio