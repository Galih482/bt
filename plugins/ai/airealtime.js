let Tio = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {
    if (!text) return m.reply('masukkan pertanyaan mu!');
    try {
        await m.react('🔍')
        let ask = await (await fetch('https://endpoint.web.id/ai/iask?key=' + global.end + '&query=' + text)).json();
        let imageUrl = ask.result.image[0];
        let answer = ask.result.answer;
        let sources = ask.result.sources.join('\n');

        conn.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption: `${answer}

Sumber${sources}`
        }, { quoted: m });
        m.react('✅')
    } catch (error) {
        console.error(error);
        m.reply('Terjadi kesalahan saat mengambil data.');
    }
}
Tio.help = ['rai']
Tio.tags = ['ai']
Tio.command = ['rai']

export default Tio