let handler = async (m, { conn }) => {
    conn.asahotak = conn.asahotak ? conn.asahotak : {}
    let id = m.chat
    if (!(id in conn.asahotak)) throw false
    let json = conn.asahotak[id][1]
    let ans = json.jawaban
    let clue = ans.replace(/[bcdfghjklmnpqrstvwxyz]/g, '_')
    m.reply('```📃' + clue + '```\n_Balas Soalnya, Bukan Pesan Ini_\n\n> Asah Otak')
}
handler.command = /^hasa$/i
export default handler