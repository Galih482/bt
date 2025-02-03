let Tio = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {
    if (!text) return m.reply(`Contoh: .${command} beautiful Korean woman carry a sword`)
    try {
        await m.react('🕒')
        let pix = await (await fetch('https://endpoint.web.id/ai/sana?key=' + global.end + '&prompt=' + text)).json()
        let shannz = pix.result.image;
        conn.sendMessage(m.chat, { image: { url: shannz }, caption: 'Succes 😼' }, { quoted: m })
        m.react('✅')
    } catch (e) {
        m.reply('*terjadi kesalahan*')
    }
}
Tio.help = ['sana']
Tio.tags = ['ai']
Tio.command = ['sana']

export default Tio