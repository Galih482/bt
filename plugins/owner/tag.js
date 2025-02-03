/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, { participants }) => {
    conn.sendMessage(m.chat, {
        text: '🔥',
        mentions: participants.map(a => a.id)
    })
}
Tio.help = ["h"]
Tio.tags = ['owner']
Tio.command = /^(h)$/i
Tio.rowner = true

export default Tio