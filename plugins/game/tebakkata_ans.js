import similarity from 'similarity'
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !/Ketik.*teka/i.test(m.quoted.text)) return !0
    this.tebakkata = this.tebakkata ? this.tebakkata : {}
    if (!(id in this.tebakkata)) return m.reply('_🍃 Soal itu telah berakhir_\n_✍🏻 Ketik .tebakkata untuk bermain lagi !_')
    if (m.quoted.id == this.tebakkata[id][0].id) {
            let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
        if (isSurrender) {
            clearTimeout(this.tebakkata[id][3])
            delete this.tebakkata[id]
            return this.reply(m.chat, '_😹 Yahh menyerah.._\n\n> Tebak Kata', m)
        }
        let json = JSON.parse(JSON.stringify(this.tebakkata[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].money += this.tebakkata[id][2]
            m.reply(`*🥳 Jawaban Benar!*\n💵 +${this.tebakkata[id][2]} Money\n\n> Tebak Kata`)
            clearTimeout(this.tebakkata[id][3])
            delete this.tebakkata[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(`_🤏🏻 Dikit Lagi !_\n\n> Tebak Kata`)
        else m.reply(`*🙅🏻‍♀️Salah !*\n\n> Tebak Kata`)
    }
    return !0
}
handler.exp = 0

export default handler