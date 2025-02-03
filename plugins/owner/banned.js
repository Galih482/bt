/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

let Tio = async (m, { conn, text, command, participants }) => {
    // Unban Chat
    if (/^(unbanchat|ubnc)$/i.test(command)) {
        if (!m.isGroup) return m.reply("khusus dalam grup")
        global.db.data.chats[m.chat].isBanned = false
        return m.reply('Chat berhasil di-unban!')
    }
    
    // Unban User
    if (/^(unban(ned)?)$/i.test(command)) {
        let who = m.isGroup && m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text + info.jid : false
        if (!who) return;
        let users = global.db.data.users
        users[who].banned = false
        users[who].bannedDate = 0
        users[who].warn = 0
        return conn.reply(m.chat, 'User berhasil di-unban!', m)
    }

    // Ban Chat
    if (/^(ban(ned)?chat|bnc)$/i.test(command)) {
        if (!m.isGroup) return m.reply("khusus dalam grup")
        global.db.data.chats[m.chat].isBanned = true
        return m.reply('Chat berhasil di-ban!')
    }

    // Ban User
    if (/^(banned)$/i.test(command)) {
        let who = m.isGroup && m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text + info.jid : false
        if (!who) return;
        let users = global.db.data.users
        users[who].banned = true
        await conn.reply(who, 'Kamu telah terbanned karena melanggar aturan Bot', null)
        return conn.reply(m.chat, `Berhasil banned ` + who.split('@')[0], m)
    }
}

Tio.help = ['unbanchat', 'unbanned', 'bannedchat', 'banned']
Tio.tags = ['owner']
Tio.command = /^(unbanchat|ubnc|unban(ned)?|ban(ned)?chat|bnc|banned)$/i
Tio.rowner = true

export default Tio