/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

export async function all(m, {
    dbUser,
    dbChat
}) {
    let user = dbUser[m.sender];
    if (m.chat.endsWith('broadcast')) return;
    if (!m.fromMe) return;
    if (user.ownerTime != 0 && user.owner) {
        if (new Date() * 1 >= user.ownerTime) {
            await m.reply(`Waktu owner kamu sudah habis!`)
            user.ownerTime = 0
            user.owner = false
        }
    };
    if (user.premiumTime != 0 && user.premium) {
        if (new Date() * 1 >= user.premiumTime) {
            await m.reply(`Waktu premium kamu sudah habis!`)
            user.premiumTime = 0
            user.premium = false
        }
    }
    if (m.isGroup) {
    let chats = dbChat[m.chat]
    if (!chats.expired)
        return !0
    if (new Date() * 1 > chats.expired) {
        await conn.reply(m.chat, 'Masa aktif sewa telah habis. Jika anda ingin sewa lagi silahkan hubungi owner.')
        await conn.groupLeave(m.chat)
        chats.expired = null
    }
   }
}