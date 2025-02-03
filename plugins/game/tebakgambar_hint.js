let handler = async (m, { conn }) => {
    conn.tebakgambar = conn.tebakgambar ? conn.tebakgambar : {}
    let id = m.chat
    if (!(id in conn.tebakgambar)) throw false
    let json = conn.tebakgambar[id][1]
    let ans = json.jawaban.trim()
    let clue = ans.replace(/[AIUEOaiueo]/g, '_')
    conn.reply(m.chat, '```📃' + clue + '```\n_Balas Soalnya, Bukan Pesan Ini_\n\n> Tebak Gambar', conn.tebakgambar[id][0])
}
handler.command = /^hgam$/i
export default handler
