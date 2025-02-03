/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

async function Tio(m) {
    if (!m.quoted) throw 'reply pesan!'
    let q = this.serializeM(await m.getQuotedObj())
    if (!q.quoted) throw 'pesan yang anda reply tidak mengandung reply!'
    await q.quoted.copyNForward(m.chat, true)
}
Tio.command = /^q$/i
export default Tio