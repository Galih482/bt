/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    let isClose = { // Switch Case Like :v
        'open': 'not_announcement',
        'close': 'announcement',
        'unlock': 'unlocked',
        'lock': 'locked',
    } [(args[0] || '')]
    if (isClose === undefined)
        throw `
*Format salah! Contoh :*
  *○ ${usedPrefix + command} close*
  *○ ${usedPrefix + command} open*
  *○ ${usedPrefix + command} unlock*
  *○ ${usedPrefix + command} lock*
`.trim()
    await conn.groupSettingUpdate(m.chat, isClose)
}
Tio.help = ['group *open / close*']
Tio.tags = ['group']
Tio.command = /^(gc|group|grup)$/i
Tio.admin = Tio.group = Tio.botAdmin = true

export default Tio