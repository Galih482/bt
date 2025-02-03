/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

/**
@credit Tio
@Nightmare MD
@Whatsapp Bot
wa.me/6282285357346
**/

import axios from "axios"

let handler = async (m, {
    conn,
    text
}) => {
    if (!text) return m.reply("masukan url")
    let {
        data
    } = await axios.get(`https://widipe.com/subdomain?domain=${text}`)
    m.reply(`List Subdomain\n\n${data.data.map(v => '- ' + v).join('\n')}`)

}
handler.help = ["subdomainlook"]
handler.tags = ["internet"]
handler.limit = true
handler.command = /^(subdo(main)?look(up)?)$/i

export default handler