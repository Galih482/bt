let handler = async (m, { conn }) => {
    conn.tebaktebakan = conn.tebaktebakan ? conn.tebaktebakan : {}
    let id = m.chat
    if (!(id in conn.tebaktebakan)) throw false
    let json = conn.tebaktebakan[id][1]
    let ans = json.jawaban.trim()
    let clue = ans.replace(/[AIUEOaiueo]/g, '_')
    conn.reply(m.chat, '```📃' + clue + '```\n_Balas Soalnya, Bukan Pesan Ini_\n\n> Tebak Tebakan', conn.tebaktebakan[id][0])
}
handler.command = /^hteb$/i
export default handler
