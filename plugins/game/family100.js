import fetch from 'node-fetch'

const winScore = 2500 //Reward Money per Jawaban
async function handler(m) {
    this.game = this.game ? this.game : {}
    let id = 'family100_' + m.chat
    if (id in this.game) {
        this.reply(m.chat, 'Masih ada kuis yang belum terjawab di chat ini', this.game[id].msg)
        throw false
    }

    const res = await fetch('https://raw.githubusercontent.com/Zyknn/database/main/family100.json')
    const data = await res.json()

    const json = data[Math.floor(Math.random() * data.length)]

    if (!json.jawaban || !Array.isArray(json.jawaban)) {
        this.reply(m.chat, 'Json Data May Be Error...', m)
        return
    }

    let caption = `*📑 Soal:* ${json.soal || 'Soal tidak tersedia'}
*⏰Waktu:* 90 detik
💡 Terdapat *${json.jawaban.length}* jawaban${json.jawaban.find(v => v.includes(' ')) ? `
`: ''}
💸 +${winScore} Money tiap jawaban benar
_(beberapa jawaban terdapat spasi)_`.trim()

    this.game[id] = {
        id,
        msg: await this.reply(m.chat, caption, m),
        ...json,
        terjawab: Array.from(json.jawaban, () => false),
        winScore,
        waktu: setTimeout(() => {
            conn.reply(m.chat, `*😿 Soal telah berakhir*\n*📑 Soal:* ` + this.game[id].soal + '\n\n*✨Jawaban:*\n• ' + this.game[id].jawaban.map(v => v).join('\n• '), m)
            delete this.game[id]
        }, 90000)
    }
}

handler.help = ['family100']
handler.tags = ['game']
handler.command = /^family100$/i
handler.register = true
handler.limit = true

export default handler