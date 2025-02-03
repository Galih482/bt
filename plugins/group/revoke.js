/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, {
    isAdmin,
    isOwner,
    conn,
    command
}) => {

    await conn.groupRevokeInvite(m.chat)
    await conn.reply(m.chat, `Sukses ${command} link group, link baru telah di kirim ke chat private`, m)
    await conn.delay(500)
    let linknya = await conn.groupInviteCode(m.chat)
    await conn.reply(m.sender, `*Revoke Link Group*\nhttps://chat.whatsapp.com/${linknya}`, null)
}
Tio.help = ['revoke']
Tio.tags = ['group']
Tio.command = /^revoke$/i
Tio.group = true
Tio.admin = true
Tio.botAdmin = true

export default Tio