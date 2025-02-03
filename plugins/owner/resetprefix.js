/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, {
    conn
}) => {

    global.prefix = new RegExp('^[' + (opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']');

    opts['noprefix'] = false

    await m.reply(`Prefix berhasil direset`)

}
Tio.help = ['resetprefix']
Tio.tags = ['owner']
Tio.command = /^(resetprefix)$/i
Tio.rowner = true

export default Tio