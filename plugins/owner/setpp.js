/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, {
    conn,
    args
}) => {
    let bot = conn.user.jid
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) return m.reply(`Fotonya mana -_`)

    if (/image/.test(mime)) {
        let img = await q.download()
        if (!img) return m.reply(`Fotonya mana -_`)
        conn.updateProfilePicture(bot, img)
        conn.reply(m.chat, 'Selesai Mengganti Profil !', m)
    }
}
Tio.help = ['setppbot']
Tio.tags = ['owner']
Tio.command = /^(setppbot|setpp)$/i
Tio.owner = true

export default Tio