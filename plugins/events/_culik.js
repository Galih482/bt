/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

export async function all(m) {
    if ((m.mtype === 'groupInviteMessage' || m.text.startsWith('Undangan untuk bergabung') || m.text.startsWith('Invitation to join') || m.text.startsWith('Buka tautan ini')) && !m.isBaileys && !m.isGroup) {
        await m.reply('ngapain, mau sewa?.\nhubungi nomer dibawah')
        conn.sendContact(m.chat, [
            [owner, info.nameOwn]
        ], m)
    }
}