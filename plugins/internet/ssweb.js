/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import axios from 'axios'

let Tio = async (m, {
    conn,
    text,
    command,
    usedPrefix
}) => {
    if (!text) return m.reply(await Func.exam(usedPrefix, command, 'https://github.com/'));
    m.reply(msg.wait)
    let {
        data
    } = await axios.get(`https://api.pikwy.com/?tkn=125&d=3000&u=${encodeURIComponent(text)}&fs=1&w=1280&h=1200&s=100&z=100&f=jpg&rt=jweb`)
    await conn.sendFile(m.chat, data.iurl, '', text, m)

}
Tio.help = ['ssweb']
Tio.tags = ['internet']
Tio.command = /^(ssweb)$/i
Tio.limit = true

export default Tio