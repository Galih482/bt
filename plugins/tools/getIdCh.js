/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, {conn}) => {
if (!m.quoted) throw 'reply saluran channel nya lah'
try {
let id = (await m.getQuotedObj()).msg.contextInfo.forwardedNewsletterMessageInfo
await m.reply(`Name: ${id.newsletterName}\nId: ${id.newsletterJid}`)
} catch (e) {
throw 'Harus chat dari channel bang'
}
}
Tio.help = Tio.command = ['ci']
Tio.tags = ['tools']
export default Tio