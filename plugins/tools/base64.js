/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, { command, text }) => {
  let txt = m.quoted ? m.quoted.text : text;
  if (command === 'base64encode') {
    m.reply(Buffer.from(txt, 'utf-8').toString('base64'))
  } else if (command === 'base64decode') {
    try {
      let decoded = Buffer.from(txt, 'base64').toString('utf-8')
      m.reply(decoded)
    } catch (e) {
      m.reply('Invalid base64 string!')
    }
  }
}
Tio.help = ['base64encode', 'base64decode']
Tio.tags = ['tools']
Tio.command = /^(base64encode|base64decode)$/i

export default Tio