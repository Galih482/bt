/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, { conn, args, command }) => {
let fitur = Object.values(plugins).filter(v => v.help ).map(v => v.help).flat(1)
 await conn.reply(m.chat, `➠ Total Fitur ${global.info.nameBot} Saat ini ❞\n\n➠ Total: ${fitur.length} Fitur`, verif)
}
Tio.help = ['totalfitur']
Tio.tags = ['main']
Tio.command = ['totalfitur']
Tio.execpt = true 
export default Tio