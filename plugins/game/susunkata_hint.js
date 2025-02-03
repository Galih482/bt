let handler = async (m, { conn }) => {
    conn.susunkata = conn.susunkata ? conn.susunkata : {}
    let id = m.chat
    if (!(id in conn.susunkata)) throw false
    let json = conn.susunkata[id][1]
    let ans = json.jawaban.trim()
    let clue = ans.replace(/[AIUEOaiueo]/g, '_')
    conn.reply(m.chat, '```📃' + clue + '```\n_Balas Soalnya, Bukan Pesan Ini_\n\n> Susun Kata', conn.susunkata[id][0])
}
handler.command = /^suska$/i
export default handler
