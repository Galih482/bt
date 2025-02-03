/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, {
    text
}) => {
    if (!text) return m.reply(await Func.exam(usedPrefix, command, '11.222.32.32'));
    let result = await Func.fetchJson(`http://ipinfo.io/${text}/json?token=882ffefc502ce1`);
    await m.reply(Object.keys(result).map(v => `- *${v.toUpperCase()}*: ${result[v]}`).join('\n'))
}
Tio.help = ["trackip"]
Tio.tags = ["tools"]
Tio.command = /^(trackip|lacakip)$/i
Tio.premium = true

export default Tio