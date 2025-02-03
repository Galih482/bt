/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import fetch from 'node-fetch'

let timeout = 30000 // 30 detik untuk menjawab
let pointsForCorrectAnswer = 100 // Poin untuk jawaban yang benar

let Tio = async (m, { conn, text }) => {
    conn.trivia = conn.trivia ? conn.trivia : {}
    let id = m.chat

    if (id in conn.trivia) {
        conn.reply(m.chat, '*📤 Masih ada pertanyaan belum terjawab di chat ini*', conn.trivia[id][0])
        throw false
    }

    // Meminta level kesulitan
    const levelMessage = "Pilih level kesulitan:\n1. Easy\n2. Medium\n3. Hard\nKetik angka level yang ingin kamu pilih:"
    if (!text) return conn.reply(m.chat, levelMessage, m)


    let difficulty = text == '1' ? 'easy' : text == '2' ? 'medium' : 'hard';
    
    let src = await (await fetch(`https://opentdb.com/api.php?amount=1&difficulty=${difficulty}&type=multiple`)).json()
    let questionData = src.results[0]

    let question = questionData.question
    let correctAnswer = questionData.correct_answer
    let incorrectAnswers = questionData.incorrect_answers

    let options = [correctAnswer, ...incorrectAnswers].sort(() => Math.random() - 0.5)

    let caption = `_❓ Trivia Question: ${difficulty}_\n\n${question}\n\n_📝 Options:_\n` + options.map((option, index) => `*${index + 1}.* ${option}`).join('\n') + `\n\n_⏰ Waktu: ${(timeout / 1000).toFixed(2)} detik_`
    
    conn.trivia[id] = [
        await conn.reply(m.chat, caption, m),
        correctAnswer,
        pointsForCorrectAnswer,
        setTimeout(() => {
            if (conn.trivia[id]) conn.reply(m.chat, `🙌🏻 Waktu habis! Jawaban benar adalah: *${correctAnswer}*`, conn.trivia[id][0])
            delete conn.trivia[id]
        }, timeout)
    ]
}

Tio.before = async (m) => {
    let id = m.chat
    conn.trivia = conn.trivia ? conn.trivia : {}
        
    if (!(id in conn.trivia)) return;

    let options = conn.trivia[id][1] 
    let selectedOption = parseInt(m.text) - 1 

    if (selectedOption >= 0 && selectedOption < 4) {
        let playerAnswer = conn.trivia[id][1][selectedOption]
        if (playerAnswer === options) {
            global.db.data.users[m.sender].money += conn.trivia[id][2] // Tambah poin ke pengguna
            m.reply(`*🎉 Jawaban benar!* +${conn.trivia[id][2]} poin.\n\n_Trivia selesai!_`)
            clearTimeout(conn.trivia[id][3])
            delete conn.trivia[id]
        } else {
            m.reply(`*🙅🏻‍♀️ Salah!*\nJawaban benar adalah: *${options}*`)
            clearTimeout(conn.trivia[id][3])
            delete conn.trivia[id]
        }
    }

    return true
}

Tio.help = ['trivia']
Tio.command = /^trivia/i
Tio.tags = ['game']
Tio.register = true
Tio.limit = true

export default Tio