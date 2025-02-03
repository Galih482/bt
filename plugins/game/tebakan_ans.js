import similarity from 'similarity'
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !/Ketik.*hteb/i.test(m.quoted.text)) return !0
    this.tebaktebakan = this.tebaktebakan ? this.tebaktebakan : {}
    if (!(id in this.tebaktebakan)) return m.reply('_🍃 Soal itu telah berakhir_\n_✍🏻 Ketik .tebaktebakan untuk bermain lagi !_')
    if (m.quoted.id == this.tebaktebakan[id][0].id) {
            let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
        if (isSurrender) {
            clearTimeout(this.tebaktebakan[id][3])
            delete this.tebaktebakan[id]
            return this.reply(m.chat, '_😹 Yahh menyerah.._\n\n> Tebak Tebakan', m)
        }
        let json = JSON.parse(JSON.stringify(this.tebaktebakan[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].money += this.tebaktebakan[id][2]
            m.reply(`*🥳 Jawaban Benar!*\n💵 +${this.tebaktebakan[id][2]} Money\n\n> Tebak Tebakan`)
            clearTimeout(this.tebaktebakan[id][3])
            delete this.tebaktebakan[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(`_🤏🏻 Dikit Lagi !_\n\n> Tebak Tebakan`)
        else m.reply(`*🙅🏻‍♀️Salah !*\n\n> Tebak Tebakan`)
    }
    return !0
}
handler.exp = 0

export default handler