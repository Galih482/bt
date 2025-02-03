/*
wa.me/6282285357346
github: https://github.com/Tiooxy
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import {
    WAMessageStubType
} from '@adiwajshing/baileys'
import PhoneNumber from 'awesome-phonenumber'
import chalk from 'chalk'
import {
    watchFile
} from 'fs'

const urlRegex = (await import('url-regex-safe')).default({
    strict: false
})

export default async function(m, conn = {
    user: {}
}) {
    let _name = await conn.getName(m.sender)
    let sender = PhoneNumber('+' + m.sender.replace('@s.whatsapp.net', '')).getNumber('international') + (_name ? ' ~' + _name : '')
    let chat = await conn.getName(m.chat)
    let filesize = (m.msg ?
        m.msg.vcard ?
        m.msg.vcard.length :
        m.msg.fileLength ?
        m.msg.fileLength.low || m.msg.fileLength :
        m.msg.axolotlSenderKeyDistributionMessage ?
        m.msg.axolotlSenderKeyDistributionMessage.length :
        m.text ?
        m.text.length :
        0 :
        m.text ? m.text.length : 0) || 0
    let user = global.db.data.users[m.sender]
    let me = PhoneNumber('+' + (conn.user?.jid).replace('@s.whatsapp.net', '')).getNumber('international')
    console.table({
        "Waktu": new Date(m.messageTimestamp ? m.messageTimestamp.low * 1000 || m.messageTimestamp * 1000 : Date.now()).toTimeString(),
        "Size": `${filesize === 0 ? 0 : (filesize / 1000 ** Math.floor(Math.log(filesize) / Math.log(1000))).toFixed(1)} ${['', 'K', 'M', 'G', 'T', 'P'][Math.floor(Math.log(filesize) / Math.log(1000))] || ''}B`,
        "Dari": sender,
        "Dari chat": `${m.chat}${chat ? ' ~' + chat : ''}`,
        "Chat": m.mtype ? m.mtype.replace(/message$/i, '').replace('audio', m.msg.ptt ? 'PTT' : 'audio').replace(/^./, v => v.toUpperCase()) : ''
    });


    if (typeof m.text === 'string' && m.text) {
        let log = m.text.replace(/\u200e+/g, '')
        let mdRegex = /(?<=(?:^|[\s\n])\S?)(?:([*_~])(.+?)\1|```((?:.||[\n\r])+?)```)(?=\S?(?:[\s\n]|$))/g
        let mdFormat = (depth = 4) => (_, type, text, monospace) => {
            let types = {
                _: 'italic',
                '*': 'bold',
                '~': 'strikethrough'
            }
            text = text || monospace
            let formatted = !types[type] || depth < 1 ? text : chalk[types[type]](text.replace(mdRegex, mdFormat(depth - 1)))
            return formatted
        }
        if (log.length < 4096)
            log = log.replace(urlRegex, (url, i, text) => {
                let end = url.length + i
                return i === 0 || end === text.length || (/^\s$/.test(text[end]) && /^\s$/.test(text[i - 1])) ? chalk.blueBright(url) : url
            })
        log = log.replace(mdRegex, mdFormat(4))
        if (m.mentionedJid)
            for (let user of m.mentionedJid) log = log.replace('@' + user.split`@` [0], chalk.blueBright('@' + await conn.getName(user)))
        console.log(m.error != null ? chalk.red(log) : m.isCommand ? chalk.yellow(log) : log)
    }
    if (m.messageStubParameters) console.log(m.messageStubParameters.map(jid => {
        jid = conn.decodeJid(jid)
        let name = conn.getName(jid)
        return chalk.gray(PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international') + (name ? ' ~' + name : ''))
    }).join(', '))
    if (/document/i.test(m.mtype)) console.log(`🗂️ ${m.msg.fileName || m.msg.displayName || 'Document'}`)
    else if (/ContactsArray/i.test(m.mtype)) console.log(`👨‍👩‍👧‍👦 ${' ' || ''}`)
    else if (/contact/i.test(m.mtype)) console.log(`👨 ${m.msg.displayName || ''}`)
    else if (/audio/i.test(m.mtype)) {
        const duration = m.msg.seconds
        console.log(`${m.msg.ptt ? '🎤 (PTT ' : '🎵 ('}AUDIO) ${Math.floor(duration / 60).toString().padStart(2, 0)}:${(duration % 60).toString().padStart(2, 0)}`)
    }

    console.log()
}

let file = global.__filename(import.meta.url)
watchFile(file, () => {
    console.log(chalk.redBright("Update 'lib/print.js'"))
})