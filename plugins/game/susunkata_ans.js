import similarity from 'similarity'
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !/Ketik.*suska/i.test(m.quoted.text)) return !0
    this.susunkata = this.susunkata ? this.susunkata : {}
    if (!(id in this.susunkata)) return m.reply('_🍃 Soal itu telah berakhir_\n_✍🏻 Ketik .susunkata untuk bermain lagi !_')
    if (m.quoted.id == this.susunkata[id][0].id) {
            let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
        if (isSurrender) {
            clearTimeout(this.susunkata[id][3])
            delete this.susunkata[id]
            return this.reply(m.chat, '_😿 Yahh menyerah.._\n\n> Susun Kata', m)
        }
        let json = JSON.parse(JSON.stringify(this.susunkata[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].money += this.susunkata[id][2]
            m.reply(`*🥳 Jawaban Benar!*\n💵 +${this.susunkata[id][2]} Money\n\n> Susun Kata`)
            clearTimeout(this.susunkata[id][3])
            delete this.susunkata[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(`_🤏🏻 Dikit Lagi !_\n\n> Susun Kata`)
        else m.reply(`*🙅🏻‍♀️Salah !*\n\n> Susun Kata`)
    }
    return !0
}
handler.exp = 0

export default handler