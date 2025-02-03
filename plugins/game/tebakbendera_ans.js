/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import similarity from 'similarity'
const threshold = 0.72
let Tio = m => m
Tio.before = async function (m) {
    let id = m.chat
    this.tebakbendera = this.tebakbendera ? this.tebakbendera : {}
        
    if (!m.quoted || !m.quoted.fromMe || !m.text || !/Ketik.*tebe/i.test(m.quoted.text)) return !0;
    if (!(id in this.tebakbendera)) return m.reply('_🍃 Soal itu telah berakhir_\n_✍🏻 Ketik .tebakbendera untuk bermain lagi !_')
    if (m.quoted.id == this.tebakbendera[id][0]?.id) {
            let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
        if (isSurrender) {
            clearTimeout(this.tebakbendera[id][3])
            delete this.tebakbendera[id]
            return this.reply(m.chat, '_😿 Yahh menyerah.._\n\n> Tebak Bendera', m)
        }
        let json = JSON.parse(JSON.stringify(this.tebakbendera[id][1]))
        if (m.text.toLowerCase() == json.name.toLowerCase().trim()) {
            global.db.data.users[m.sender].money += this.tebakbendera[id][2]
            m.reply(`*🥳 Jawaban Benar!*\n💵 +${this.tebakbendera[id][2]} Money\n\n> Tebak Bendera`)
            clearTimeout(this.tebakbendera[id][3])
            delete this.tebakbendera[id]
        } else if (similarity(m.text.toLowerCase(), json.name.toLowerCase().trim()) >= threshold) m.reply(`_🤏🏻 Dikit Lagi !_\n\n> Tebak Bendera`)
        else m.reply(`*🙅🏻‍♀️Salah !*\n\n> Tebak Bendera`)
    }
    return !0
}
Tio.exp = 0

export default Tio