/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, {
    conn
}) => {
    let text;
    let target;
    if (m.quoted) {
        text = m.quoted.text
        target = m.quoted.sender
    } else if (m.text.length > 6) {
        text = m.text.split("@admin ")[1]
        target = m.sender
    } else return m.reply("kamu mau lapor apa?")


await conn.sendMessage(m.chat, {text: `@${m.chat}`, contextInfo: {
mentionedJid: [target],
groupMentions: [
{
groupSubject: `*${await conn.getName(target) ? await conn.getName(target) : target.split("@")[0]} telah dilaporkan*`,
groupJid: m.chat
}]
}
}, {quoted: m})

    let {
        participants
    } = await conn.groupMetadata(m.chat);
    let admin = Object.values(participants).filter(v => v.admin !== null).map(v => v.id)

    for (let v of admin) {
        await conn.reply(v, `[ \`LAPORAN\` ]\n\n💬: *${text}*\n👤: *@${target.split("@")[0]}*`, null, {
            contextInfo: {
                mentionedJid: [m.sender]
            }
        })
        await conn.delay(500)
    }
}
Tio.customPrefix = /^(@admin)/i;
Tio.command = new RegExp()
Tio.group = true

export default Tio