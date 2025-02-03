/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import cp, { exec as _exec } from 'child_process'
import { promisify } from 'util'
let exec = promisify(_exec).bind(cp)
let Tio = async (m, { conn, isOwner, command, text }) => {
  if (global.conn.user.jid != conn.user.jid) return
  m.reply('Executing...')
  let o
  try {
    o = await exec(command.trimStart()  + ' ' + text.trimEnd())
  } catch (e) {
    o = e
  } finally {
    let { stdout, stderr } = o
    if (stdout.trim()) m.reply(stdout)
    if (stderr.trim()) m.reply(stderr)
  }
}
Tio.customPrefix = /^[$] /
Tio.command = new RegExp
Tio.rowner = true
export default Tio