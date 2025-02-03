/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import kode from 'kode-scrape'
const { tools } = kode;

let Tio = async (m, {
    args,
    command,
    usedPrefix
}) => {
    const usage = "*Example:*\n" + usedPrefix + command + " (Input text or reply text to beauty code)"
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else return m.reply(usage)

    if (command === "beautyjs") {
        try {
            const beautifulJS = tools.beautifyJS(text);
            await m.reply(beautifulJS)
        } catch (e) {
            throw msg.error
        }
    }
    if (command === "beautycss") {
        try {
            const beautifulCSS = tools.beautifyCSS(text);
            await m.reply(beautifulCSS)
        } catch (e) {
            throw msg.error
    }
    }
    if (command === "beautyhtml") {
        try {
            const beautifulHTML = tools.beautifyHTML(text);
            await m.reply(beautifulHTML)
        } catch (e) {
            throw msg.error
    }
    }
}
Tio.help = ["beauty *[js/css/html]*"]
Tio.tags = ["tools"]
Tio.command = /^beauty(js|css|html)$/i
Tio.premium = true
export default Tio