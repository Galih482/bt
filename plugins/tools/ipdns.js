/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, {conn, text, usedPrefix, command}) => {
if (!text) return m.reply(await Func.exam(usedPrefix, command, 'google.com'));
 let { address } = await Func.fetchJson(API(APIs['Tixo'], '/tools/ipdomain', { url: text }))
 await m.reply(`Cek Ip domain\n\n- Domain: ${text}\n- Ip: ${address}`);
}
Tio.help = Tio.command = ['ipdns'];
Tio.tags = ["tools"];
Tio.limit = true

export default Tio