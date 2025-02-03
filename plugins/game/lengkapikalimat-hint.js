let handler = async (m, { conn }) => {
    conn.lengkapikalimat = conn.lengkapikalimat ? conn.lengkapikalimat : {}
    let id = m.chat
    if (!(id in conn.lengkapikalimat)) throw false
    let json = conn.lengkapikalimat[id][1]
    conn.reply(m.chat, '```📃' + json.jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```\n_Balas Soalnya, Bukan Pesan Ini_\n\n> Lengkapi Kalimat', m)
}
handler.command = /^hlen$/i

export default handler