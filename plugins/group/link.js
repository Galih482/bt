/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import {
    areJidsSameUser
} from '@adiwajshing/baileys'
let Tio = async (m, {
    conn
}) => {
    m.reply('https://chat.whatsapp.com/' + await conn.groupInviteCode(m.chat))
}
Tio.help = ['linkgrup']
Tio.tags = ['group']
Tio.command = /^(linkg(roup|c|rup)?)$/i
Tio.admin = Tio.group = Tio.botAdmin = true

export default Tio