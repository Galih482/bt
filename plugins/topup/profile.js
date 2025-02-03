/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import {
    TopUp
} from "../../lib/scraper/MauPedia.js";
import {
    Atlantic
} from "../../lib/scraper/Atlantic.js";
import { follSun } from '../../lib/scraper/LapakSosmed.js';
import util from 'util';

let Tio = async (m, {
    conn,
    text
}) => {

    switch (text) {
    case 'litensi':
             let { id, api_key: keys } = global.smm['litensi'];
            try {

                const {
                    data
                } = await axios.post('https://litensi.id/api/profile', {
                    api_id: id,
                    api_key: keys
                })
                await m.reply(`Name: ${data.data.username}
Full name: ${data.data.full_name}
Balance: Rp${await rp(data.data.balance)}
`)
            } catch (w) {
                throw w
            }
            break;
        case 'maupedia':

            const {
                key,
                sign,
                secret
            } = global.smm["maupedia"];
            let topup = new TopUp({
                key,
                sign,
                secret
            });
            const {
                result,
                data,
                message
            } = await topup.profile()
            if (result == true) {
                await m.reply(`[ Profile Maupedia ]

Nama: ${data.full_name}
User: ${data.username}
Balance: Rp${await rp(data.balance)}
Earning: ${data.earning}
Point: ${data.point}
Level: ${data.level}`)

            } else if (result == false) {
                await m.reply(message)
            }
            break;
        case 'atlantic':
            let Depo = new Atlantic({
                api_key: global.APIKeys["atlantic"]
            });
            const {
                data: datas
            } = await Depo.profile();
            try {
                await m.reply(`[ Atlantic ]
 
${Object.keys(datas).map(v => `*${v.toUpperCase()}*: ${datas[v]}`).join('\n')}`)
            } catch (e) {
                m.reply(e.data.message)
            }
            break;
            case 'lapaksosmed':
            const { api_id, api_key } = global.smm['lapak'];
            const CekProfile = await new follSun(api_id, api_key).cekProfile();
            m.reply(`Profile Berhasil Ditemukan\n\nFull Name: ${util.format(CekProfile.data.full_name)}\nUsername: ${util.format(CekProfile.data.username)}\nSaldo: Rp ${util.format(CekProfile.data.balance)}`);
            break;
        default:
            return m.reply(`[ Akun Yang tersedia ]\n\n- maupedia\n- atlantic\n- litensi\n- lapaksosmed\n\ncontoh: *.akun maupedia*`)
    }
}
Tio.help = Tio.command = ["akun", "account"]
Tio.tags = ["topup"]
Tio.rowner = true

export default Tio

function rp(x) {
    x = x.toString();
    let pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1.$2");
    return x;
}