/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async(m, { conn, text }) => {
  if (!text) throw `No Prefix detected...`
if (text == 'null') {
opts["noprefix"] = true
} else if (text == 'multi') {
opts['noprefix'] = false
} else {
global.prefix = new RegExp('^[' + (text || global.opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')
opts["noprefix"] = false
}
  await m.reply(`Prefix telah ditukar ke *${text}*`)
}
Tio.help = ['setprefix'].map(v => v + ' [prefix]')
Tio.tags = ['owner']
Tio.command = /^(setprefix)$/i

Tio.rowner = true

export default Tio