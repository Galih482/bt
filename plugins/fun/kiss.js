/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, {
    conn
}) => {

    let who = m.isGroup && m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : (m.quoted ? m.quoted.sender : m.sender)
    await conn.sendMessage(m.chat, {
        image: {
            url: 'https://i.ibb.co.com/myKS8X0/IMG-20240716-WA0089.jpg'
        },
        caption: `@${m.sender.split("@")[0]} *Kiss* @${who.split("@")[0]}`,
        contextInfo: {
            mentionedJid: [m.sender, who]
        }
    }, {
        quoted: m
    })
}
Tio.help = Tio.command = ['kiss', 'cium']
Tio.tags = ['fun']
export default Tio