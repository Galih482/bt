let handler = async (m, { conn }) => {
    conn.tebakbendera = conn.tebakbendera ? conn.tebakbendera : {}
    let id = m.chat
    if (!(id in conn.tebakbendera)) throw false
    let json = conn.tebakbendera[id][1]
    m.reply('```📃' + json.name.replace(/[bcdfghjklmnpqrstvwxyz]/g, '_') + '```\n_Balas Soalnya, Bukan Pesan Ini_\n\n> Tebak Bendera')
}
handler.command = /^tebe$/i

export default handler