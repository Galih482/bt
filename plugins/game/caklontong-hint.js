let handler = async (m, { conn }) => {
    conn.caklontong = conn.caklontong ? conn.caklontong : {}
    let id = m.chat
    if (!(id in conn.caklontong)) throw false
    let json = conn.caklontong[id][1]
    let ans = json.jawaban.trim()
    let clue = ans.replace(/[AIUEOaiueo]/g, '_')
    conn.reply(m.chat, '```📃' + clue + '```\n_Balas Soalnya, Bukan Pesan Ini_\n\n> Cak Lontong', conn.caklontong[id][0])
}
handler.command = /^calo$/i
export default handler
