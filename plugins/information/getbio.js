/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, { conn, text, command }) => {
  try {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
    else who = m.quoted.sender ? m.quoted.sender : m.sender
    let bio = await conn.fetchStatus(who)
    m.reply(bio.status)
  } catch {
    if (text) throw `bio is private!`
    else try {
      let who = m.quoted ? m.quoted.sender : m.sender
      let bio = await conn.fetchStatus(who)
      m.reply(bio.status)
    } catch {
      throw `bio is private!`
    }
  }
}
Tio.help = ['getbio']
Tio.tags = ['group']
Tio.command = /^(getbio(data)?)$/i
export default Tio