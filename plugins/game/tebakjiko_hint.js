let handler = async (m, { conn }) => {
    conn.tebakjiko = conn.tebakjiko ? conn.tebakjiko : {}
    let id = m.chat
    if (!(id in conn.tebakjiko)) throw false
    let json = conn.tebakjiko[id][1]
    let ans = json.jawaban.trim()
    let clue = ans.replace(/[AIUEOaiueo]/g, '_')
    conn.reply(m.chat, '```📃' + clue + '```\n_Balas Soalnya, Bukan Pesan Ini_\n\n> Tebak Jiko48', conn.tebakjiko[id][0])
}
handler.command = /^hjiko$/i
export default handler
