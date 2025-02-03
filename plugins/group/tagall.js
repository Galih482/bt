/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, {
    conn,
    text,
    participants
}) => {
    let teks = `◇─ Tag All ─◇
*Pesan : ${text ? text : 'kosong'}*\n\n`
    for (let mem of participants) {
        teks += `• @${mem.id.split('@')[0]}\n`
    }
    conn.sendMessage(m.chat, {
        text: teks,
        mentions: participants.map(a => a.id)
    }, {
        quoted: m
    })
}

Tio.help = ['tagall']
Tio.tags = ['group']
Tio.command = ['tagall']
Tio.admin = true
Tio.group = true

export default Tio