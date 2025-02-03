/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, {
    conn,
    command
}) => {

    let who = m.isGroup && m.mentionedJid[0] && m.mentionedJid ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
    let pp = await conn.profilePictureUrl(who, 'image').catch((_) => media.avatar)
    await conn.sendMessage(m.chat, {
        image: {
            url: pp
        },
        caption: `Foto profile @${who.split('@')[0]}`,
        mentions: [who]
    })

}
Tio.help = ['getpp <@tag/reply>']
Tio.tags = ['group']
Tio.command = /^(getpp|getpic?t?|pp)$/i

export default Tio