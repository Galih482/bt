/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

const { getBinaryNodeChild, getBinaryNodeChildren } = (await import('@adiwajshing/baileys')).default

let Tio = async (m, { conn, text, participants }) => {
    let link = await conn.groupInviteCode(m.chat)
    if (!text) throw 'Mana nomer nya yang mau di-add ke grup!'

    let nomor = text.replace(/ /g, '').replace(/-/g, '').replace("+", '')
    let _participants = participants.map(user => user.id)

    let users = (await Promise.all(
        nomor.split(',')
            .map(v => v.replace(/[^0-9]/g, ''))
            .filter(v => v.length > 4 && v.length < 20 && !_participants.includes(v + '@s.whatsapp.net'))
            .map(async v => [
                v,
                await conn.onWhatsApp(v + '@s.whatsapp.net')
            ])
    )).filter(v => v[1][0]?.exists).map(v => v[0] + '@c.us')

    const response = await conn.query({
        tag: 'iq',
        attrs: {
            type: 'set',
            xmlns: 'w:g2',
            to: m.chat,
        },
        content: users.map(jid => ({
            tag: 'add',
            attrs: {},
            content: [{ tag: 'participant', attrs: { jid } }]
        }))
    })

    const add = getBinaryNodeChild(response, 'add')
    const participant = getBinaryNodeChildren(add, 'participant')

    for (const user of participant.filter(item => item.attrs.error == 403)) {
        const jid = user.attrs.jid
        let teks = `Mengundang @${jid.split('@')[0]} menggunakan link invite...`
        m.reply(teks)

        let codes = await conn.groupInviteCode(m.chat)
        conn.sendModify(jid, `Buka tautan ini untuk bergabung ke grup WhatsApp saya:\nhttps://chat.whatsapp.com/${codes}`, null, {
            ads: true,
            title: await conn.getName(m.chat),
            body: "Undangan chat grup",
            url: `https://chat.whatsapp.com/${codes}`,
            thumbnailUrl: await conn.profilePictureUrl(m.chat, 'image').catch(() => media.avatar),
            largeThumb: false
        })
    }
}

Tio.help = ['add']
Tio.tags = ['group']
Tio.command = /^(add)$/i

Tio.admin = true
Tio.group = true
Tio.botAdmin = true

export default Tio