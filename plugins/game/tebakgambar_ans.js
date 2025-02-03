import similarity from 'similarity'
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !/Ketik.*hgam/i.test(m.quoted.text)) return !0
    this.tebakgambar = this.tebakgambar ? this.tebakgambar : {}
    if (!(id in this.tebakgambar)) return m.reply('_🍃 Soal itu telah berakhir_\n_✍🏻 Ketik .tebakgambar untuk bermain lagi !_')
    if (m.quoted.id == this.tebakgambar[id][0].id) {
            let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
        if (isSurrender) {
            clearTimeout(this.tebakgambar[id][3])
            delete this.tebakgambar[id]
            return this.reply(m.chat, '_😿 Yahh menyerah.._\n\n> Tebak Gambar', m)
        }
        let json = JSON.parse(JSON.stringify(this.tebakgambar[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].money += this.tebakgambar[id][2]
            m.reply(`*🥳 Jawaban Benar!*\n💵 +${this.tebakgambar[id][2]} Money\n\n> Tebak Gambar`)
            clearTimeout(this.tebakgambar[id][3])
            delete this.tebakgambar[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(`_🤏🏻 Dikit Lagi !_\n\n> Tebak Gambar`)
        else m.reply(`*🙅🏻‍♀️Salah !*\n\n> Tebak Gambar`)
    }
    return !0
}
handler.exp = 0

export default handler