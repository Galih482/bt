/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, {
    text
}) => {

    let result = await Func.fetchJson(`https://api.ipify.org`);
    await m.reply(`Ip device: ${result}`)
}
Tio.help = ["myip"]
Tio.tags = ["owner"]
Tio.command = /^(myip|ipku)$/i
Tio.rowner = true

export default Tio