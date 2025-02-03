import similarity from 'similarity'
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !/Ketik.*calo/i.test(m.quoted.text)) return !0
    this.caklontong = this.caklontong ? this.caklontong : {}
    if (!(id in this.caklontong)) return m.reply('_🍃 Soal itu telah berakhir_\n_✍🏻 Ketik .caklontong untuk bermain lagi !_')
    if (m.quoted.id == this.caklontong[id][0].id) {
            let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
        if (isSurrender) {
            clearTimeout(this.caklontong[id][3])
            delete this.caklontong[id]
            return this.reply(m.chat, '_😿 Yahh menyerah.._\n\n> Cak Lontong', m)
        }
        let json = JSON.parse(JSON.stringify(this.caklontong[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].money += this.caklontong[id][2]
            m.reply(`*🥳 Jawaban Benar!*\n${json.deskripsi}\n💵 +${this.caklontong[id][2]} Money\n\n> Cak Lontong`)
            clearTimeout(this.caklontong[id][3])
            delete this.caklontong[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(`_🤏🏻 Dikit Lagi !_\n\n> Cak Lontong`)
        else m.reply(`*🙅🏻‍♀️Salah !*\n\n> Cak Lontong`)
    }
    return !0
}
handler.exp = 0

export default handler