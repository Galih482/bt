/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import fs from 'fs'
import syntaxError from 'syntax-error'
import path from 'path'

const _fs = fs.promises
const watermark = `\/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**\/\n\n`
let Tio = async (m, { text, usedPrefix, command, __dirname }) => {
   let input = `[!] *wrong input*

Ex: ${usedPrefix + command} example.js`
   if (!text) return m.reply(input)
   if (!m.quoted) throw `Balas/quote media/text yang ingin disimpan`
    
   if (/p(lugin)?/i.test(command)) {
       let filename = text.replace(/plugin(s)\//i, '') + (/\.js$/i.test(text) ? '' : '.js')
       const error = syntaxError(m.quoted.text, filename, {
           sourceType: 'module',
           allowReturnOutsideFunction: true,
           allowAwaitOutsideFunction: true
       })
       if (error) throw error

       const isJSON = /\.json$/i.test(filename)
       let WM = isJSON ? '' : m.quoted.text.includes(watermark) ? '' : watermark 

       const pathFile = path.join(__dirname, filename)
       await _fs.writeFile(pathFile, WM + m.quoted.text.replace(/handler/g, 'Tio'))
       m.reply(`Successfully saved to *${filename}*
`.trim())
   } else {
       const isJavascript = m.quoted.text && !m.quoted.mediaMessage && /\.js/.test(text)
       if (isJavascript) {
           const error = syntaxError(m.quoted.text, text, {
               sourceType: 'module',
               allowReturnOutsideFunction: true,
               allowAwaitOutsideFunction: true
           })
           if (error) throw error
           await _fs.writeFile(text, m.quoted.text.replace(/Tio/g, 'Tio'))
           m.reply(`Successfully saved to *${text}*
`.trim())
       } else if (m.quoted.mediaMessage) {
           const media = await m.quoted.download()
           await _fs.writeFile(text, media)
           m.reply(`Successfully saved media to *${text}*
`.trim())
       } else {
           throw 'Not supported!!'
       }
   }
}
Tio.help = ['plugin', 'scraper'].map(v => `save ${v} <name file>`)
Tio.tags = ['owner']
Tio.command = /^(save|sf(p)?)$/i

Tio.rowner = true

export default Tio