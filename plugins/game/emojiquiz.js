/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import fetch from 'node-fetch';

let timeout = 30000; // 30 detik untuk menjawab
let pointsForCorrectAnswer = 100; // Poin untuk jawaban yang benar

let Tio = async (m, { conn }) => {
    conn.emojiQuiz = conn.emojiQuiz ? conn.emojiQuiz : {};
    let id = m.chat;

    if (id in conn.emojiQuiz) {
        conn.reply(m.chat, '*📤 Masih ada kuis belum terjawab di chat ini*', conn.emojiQuiz[id][0]);
        throw false;
    }

    // Daftar pertanyaan emoji yang lebih banyak
    const emojiQuestions = [
        { emojis: '🚗💨', answer: 'Mobil Balap' }, // Mobil Balap
        { emojis: '👑🐍', answer: 'Ratu Ular' }, // Ratu Ular
        { emojis: '🌧️🌈', answer: 'Pelangi' }, // Pelangi
        { emojis: '🍔🍟', answer: 'Fast Food' }, // Fast Food
        { emojis: '🎬🍿', answer: 'Film' }, // Film
        { emojis: '🐍🍏', answer: 'Buah Terlarang' }, // Buah Terlarang
        { emojis: '👻🎃', answer: 'Halloween' }, // Halloween
        { emojis: '💔😢', answer: 'Putus Cinta' }, // Putus Cinta
        { emojis: '🦁👑', answer: 'Raja Hutan' }, // Raja Hutan
        { emojis: '🌍✈️', answer: 'Berpetualang' }, // Berpetualang
        { emojis: '👩‍🎤🎤', answer: 'Penyanyi' }, // Penyanyi
        { emojis: '🤖🚀', answer: 'Robot' }, // Robot
        { emojis: '🏖️🌊', answer: 'Pantai' }, // Pantai
        { emojis: '🍕🍕', answer: 'Pizza' }, // Pizza
        { emojis: '🎨🖌️', answer: 'Seni' }, // Seni
        { emojis: '🍦☀️', answer: 'Es Krim' }, // Es Krim
        { emojis: '⚽🏆', answer: 'Juara Sepak Bola' }, // Juara Sepak Bola
        { emojis: '👨‍🚀🌌', answer: 'Astronot' }, // Astronot
        { emojis: '📖🧙‍♂️', answer: 'Buku Sihir' }, // Buku Sihir
        { emojis: '🕵️‍♂️🔍', answer: 'Detektif' }, // Detektif
        { emojis: '🦄🌈', answer: 'Unicorn' }, // Unicorn
        { emojis: '🎡🎠', answer: 'Karnaval' }, // Karnaval
    ];

    // Ambil pertanyaan secara acak
    let randomQuestion = emojiQuestions[Math.floor(Math.random() * emojiQuestions.length)];
    let questionEmojis = randomQuestion.emojis;
    let correctAnswer = randomQuestion.answer;

    // Buat tampilan pertanyaan
    let caption = `_❓ Kuis Emoji:_\n\n🌟 Tebak frasa dari emoji berikut:\n${questionEmojis}\n\n_⏰ Waktu: ${(timeout / 1000).toFixed(2)} detik_`;

    // Simpan pertanyaan dan jawaban di chat
    conn.emojiQuiz[id] = [
        await conn.reply(m.chat, caption, m),
        correctAnswer,
        pointsForCorrectAnswer,
        setTimeout(() => {
            if (conn.emojiQuiz[id]) conn.reply(m.chat, `🙌🏻 Waktu habis! Jawaban benar adalah: *${correctAnswer}*`, conn.emojiQuiz[id][0]);
            delete conn.emojiQuiz[id];
        }, timeout)
    ];
}

// Cek jawaban pemain
Tio.before = async (m) => {
    let id = m.chat;
    conn.emojiQuiz = conn.emojiQuiz ? conn.emojiQuiz : {};
    
    if (!(id in conn.emojiQuiz)) return;

    let correctAnswer = conn.emojiQuiz[id][1]; // Jawaban yang benar

    // Cek jawaban pemain
    if (m.text.toLowerCase().trim() === correctAnswer.toLowerCase()) {
        global.db.data.users[m.sender].money += conn.emojiQuiz[id][2]; // Tambah poin ke pengguna
        m.reply(`*🎉 Jawaban benar!* +${conn.emojiQuiz[id][2]} poin.\n\n_Kuis selesai!_`);
        clearTimeout(conn.emojiQuiz[id][3]);
        delete conn.emojiQuiz[id];
    } else {
        m.reply(`*🙅🏻‍♀️ Salah!*\nJawaban benar adalah: *${correctAnswer}*`);
        clearTimeout(conn.emojiQuiz[id][3]);
        delete conn.emojiQuiz[id];
    }

    return true;
}

Tio.help = ['emojiQuiz'];
Tio.command = /^emojiquiz/i;
Tio.tags = ['game'];
Tio.register = true;
Tio.limit = true;

export default Tio;