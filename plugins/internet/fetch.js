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

import fetch from 'node-fetch'
import { format } from 'util'

let Tio = async (m, { text, conn }) => {
    if (!/^https?:\/\//.test(text)) throw 'Awali *URL* dengan http:// atau https://'
    let _url = new URL(text)
    let url = global.API(_url.origin, _url.pathname, Object.fromEntries(_url.searchParams.entries()), 'APIKEY')
    let res = await fetch(url)
    if (res.headers.get('content-length') > 100 * 1024 * 1024 * 1024) {
        throw `Content-Length: ${res.headers.get('content-length')}`
    }
    m.reply(msg.wait)
    if (!/text|json/.test(res.headers.get('content-type'))) return conn.sendFile(m.chat, url, 'file', text, m)
    let txt = await res.buffer()
    try {
        txt = format(JSON.parse(txt + ''))
    } catch (e) {
        txt = txt + ''
    } finally {
        m.reply(txt.slice(0, 65536) + '')
    }
}
Tio.help = ['fetch', 'get']
Tio.tags = ['internet']
Tio.command = /^(fetch|get)$/i
Tio.limit = true
export default Tio