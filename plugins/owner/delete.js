/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import path, {
    join
} from 'path'
import {
    unlinkSync,
    existsSync
} from 'fs'

let Tio = async (m, {
    conn,
    usedPrefix,
    usedPrefix: _p,
    __dirname,
    args,
    text,
    command
}) => {

switch (command) {
case 'df':
    let ar = Object.keys(plugins)
    let ar1 = ar.map(v => v.replace('.js', ''))
    if (!text) return m.reply(await Func.exam(usedPrefix, command, 'app'));
    if (!ar1.includes(args[0])) return m.reply(`Tidak dapat menemukan file *[ ${text} ]*\n\n${ar1.map(v => '- ' + v).join(`\n`)}`)
    const file = 'plugins/' + args[0] + '.js'
    unlinkSync(file)
    conn.reply(m.chat, `Succes deleted "plugins/${args[0]}.js"`, m)
break
case 'rm':
    if (!text) return m.reply(await Func.exam(usedPrefix, command, 'app.js'));
    try {
        unlinkSync(text)
        conn.reply(m.chat, `Succes deleted "${text}"`, m)
    } catch (e) {
        m.reply('folder not found :' + e)
    } finally {

    }
    break 
    }
}
Tio.help = ['df','rm']
Tio.tags = ['owner']
Tio.command = /^(df|rm)$/i

Tio.rowner = true

export default Tio