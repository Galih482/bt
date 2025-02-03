/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import gtts from 'node-gtts'
import {
    readFileSync,
    unlinkSync
} from 'fs'
import {
    join
} from 'path'

const defaultLang = 'id'
let Tio = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {

    let lang = args[0]
    let text = args.slice(1).join(' ')
    if ((args[0] || '').length !== 2) {
        lang = defaultLang
        text = args.join(' ')
    }
    if (!text && m.quoted?.text) text = m.quoted.text

    let res
    try {
        res = await tts(text, lang)
    } catch (e) {
        m.reply(e + '')
        text = args.join(' ')
        if (!text) return m.reply(await Func.exam(usedPrefix, command, 'id hai pedo'));
        res = await tts(text, defaultLang)
    } finally {
        if (res) conn.sendFile(m.chat, res, 'tts.opus', null, m, true)
    }
}
Tio.help = ['tts']
Tio.tags = ['tools']
Tio.command = /^g?tts$/i
Tio.register = true
Tio.limit = true

export default Tio

function tts(text, lang = 'id') {
    console.log(lang, text)
    return new Promise((resolve, reject) => {
        try {
            let tts = gtts(lang)
            let filePath = join(global.__dirname(import.meta.url), '../../tmp', (1 * new Date) + '.wav')
            tts.save(filePath, text, () => {
                resolve(readFileSync(filePath))
                unlinkSync(filePath)
            })
        } catch (e) {
            reject(e)
        }
    })
}