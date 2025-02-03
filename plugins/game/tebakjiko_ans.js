import similarity from 'similarity'
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !/Ketik.*hjiko/i.test(m.quoted.text)) return !0
    this.tebakjiko = this.tebakjiko ? this.tebakjiko : {}
    if (!(id in this.tebakjiko)) return m.reply('_🍃 Soal itu telah berakhir_\n_✍🏻 Ketik .tebakjiko untuk bermain lagi !_')
    if (m.quoted.id == this.tebakjiko[id][0].id) {
            let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
        if (isSurrender) {
            clearTimeout(this.tebakjiko[id][3])
            delete this.tebakjiko[id]
            return this.reply(m.chat, '_😹 Yahh menyerah.._\n\n> Tebak Jiko48', m)
        }
        let json = JSON.parse(JSON.stringify(this.tebakjiko[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].money += this.tebakjiko[id][2]
            m.reply(`*🥳 Jawaban Benar!*\n💵 +${this.tebakjiko[id][2]} Money\n\n> Tebak Jiko48`)
            clearTimeout(this.tebakjiko[id][3])
            delete this.tebakjiko[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(`_🤏🏻 Dikit Lagi !_\n\n> Tebak Jiko48`)
        else m.reply(`*🙅🏻‍♀️Salah !*\n\n> Tebak Jiko48`)
    }
    return !0
}
handler.exp = 0

export default handler