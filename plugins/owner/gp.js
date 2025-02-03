/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import cp, { exec as _exec } from 'child_process'
import { promisify } from 'util'
let exec = promisify(_exec).bind(cp)

let Tio = async (m, { conn, isROwner, usedPrefix, command, text }) => {
switch (command) {
case 'gp': case 'getplugin':
    if (!isROwner) return
    let ar = Object.keys(plugins)
    let ar1 = ar.map(v => v.replace('.js', ''))
    if (!text) return m.reply(await Func.exam(usedPrefix, command, ' own-gp'));
    if (!ar1.includes(text)) return m.reply(`Tidak dapat menemukan file *[ ${text} ]*\n\n${ar1.map(v => '- ' + v).join`\n`}`)
    let o
    try {
        o = await exec('cat plugins/' + text + '.js')
    } catch (e) {
        o = e
    } finally {
        let { stdout, stderr } = o
        if (stdout.trim()) m.reply(stdout)
        if (stderr.trim()) m.reply(stderr)
    }
    break
    case 'gf':
    if (!isROwner) return
    if (!text) throw `Enter a file name`

    let O
    try {
        O = await exec('cat ' + text)
    } catch (e) {
        O = e
    } finally {
        let { stdout, stderr } = O
        if (stdout.trim()) m.reply(stdout)
        if (stderr.trim()) m.reply(stderr)
    }
    break 
}
}
Tio.help = Tio.command = ['getplugin','gp','gf']
Tio.tags = ['owner']
Tio.rowner = true

export default Tio