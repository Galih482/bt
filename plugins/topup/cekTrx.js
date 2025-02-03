/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import {
    Atlantic
} from "../../lib/scraper/Atlantic.js";

let Tio = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    let Depo = new Atlantic({
        api_key: global.APIKeys["atlantic"]
    });
    if (!text) return m.reply(await Func.exam(usedPrefix, command, 'id_trx'));

    const {
        data,
        status
    } = await Depo.statusOrder(text);
    if (!status) return m.reply('sepertinya id trx tidak valid');
    await m.reply(`[ Status ]
 
${Object.keys(data).map(v => `*${v.toUpperCase()}*: ${data[v]}`).join('\n')}`)

}
Tio.help = ["cek_transaksi"];
Tio.tags = ['topup'];
Tio.command = /^(cek_tr(ansaksi)?(x)?)$/i;
export default Tio