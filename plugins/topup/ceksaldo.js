/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import fs from "fs";

let Tio = async (m, { conn }) => {
    let user = JSON.parse(await fs.readFileSync('./system/database/saldo.json', 'utf-8'));

    let sender = m.sender;
    if (!(sender in user)) return m.reply("Saldo tidak ditemukan untuk pengguna ini.");
    let saldo = user[sender];
    await conn.reply(m.chat, `Saldo Anda saat ini: Rp${rp(saldo)}`, m);
}

Tio.help = Tio.command = ["ceksaldo"];
Tio.tags = ["topup"];
Tio.rowner = false;

export default Tio;

function rp(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) {
        x = x.replace(pattern, "$1.$2");
    }
    return x;
}