/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import cp, { exec as _exec } from 'child_process'
import { promisify } from 'util'
let exec = promisify(_exec).bind(cp)

let Tio = async (m, {conn, text}) => {
if (!text) throw 'masukan nama hostname'
try {
if (global.conn.user.jid == conn.user.jid) {
let teks = 'hostnamectl set-hostname '

await exec(teks+text)
await m.reply('*Sukses mengganti nama hostname* ke- ' + text)
}
} catch (e) {
throw e
} 
}

Tio.help = Tio.command = ['hostname']
Tio.tags = ['owner']
Tio.owner = true

export default Tio