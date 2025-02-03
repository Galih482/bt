/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, {
    conn,
    participants,
    groupMetadata
}) => {
    const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => media.avatar);
    const groupAdmins = participants.filter(p => p.admin)
    const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
    const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-` [0] + '@s.whatsapp.net'
    let text = `「 *Tag Admin* 」\n

*Group Admins:*
${listAdmin}
`.trim()
    conn.sendFile(m.chat, pp, 'pp.jpg', text, m, false, {
        mentions: [...groupAdmins.map(v => v.id), owner]
    })
}

Tio.help = ['tagadmin']
Tio.tags = ['group']
Tio.command = /^(tagadmin)$/i

Tio.group = true

export default Tio