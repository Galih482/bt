/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, { usedPrefix, command, conn, text }) => {
  let noReg = Object.values(global.db.data.users).filter(user => user.registered == false)
  let user = db.data.users
  for (let data in user) {
  if (user[data].registered === false) {
    delete user[data];
  } 
  }
  conn.reply(m.chat, `*Sukses membersihkan user yang tidak Registrasi* [ \`\`\`${noReg.length }\`\`\` ]`, verif)
}

Tio.help = ['clearcache','clearunreg']
Tio.tags = ['main']
Tio.command = /^(clearcache|clearunreg)$/i
Tio.rowner = true

export default Tio