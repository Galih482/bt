/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import fs from "fs";

let Tio = async (m, { conn, text, command }) => {
    if (!text) return m.reply("masukan nomor user");
    
    let user = JSON.parse(await fs.readFileSync('./system/database/saldo.json', 'utf-8'));
    
    text = text.split("|");
    let tujuan;
    let jumlah;
    
    if (text[0]) 
        tujuan = text[0].replace(/ /g, '').replace(/-/g, '').replace("+", '') + info.jid;
    if (text[1]) 
        jumlah = parseInt(text[1]);

    if (!(tujuan in user)) return m.reply("User tidak ditemukan");

    if (user[tujuan] < jumlah) return m.reply("Saldo tidak cukup");

    user[tujuan] -= jumlah;
    await fs.writeFileSync('./system/database/saldo.json', JSON.stringify(user, null, 2));

    await conn.reply(m.chat, await owen(tujuan.split("@")[0], await rp(jumlah)), m);
    await conn.reply(tujuan, await trx(tujuan.split("@")[0], await rp(jumlah)), null);
}

Tio.help = Tio.command = ["minsaldo"];
Tio.tags = ["topup"];
Tio.rowner = true;

export default Tio;

function owen(no, nominal) {
    return `[ Transaksi Pengurangan Saldo ]

Tujuan: ${no}
Nominal: Rp${nominal}
Status: Sukses`;
}

function trx(no, nominal) {
    return `[ Transaksi Pengurangan Saldo ]

Tujuan: ${no}
Nominal: Rp${nominal}
Status: Sukses

Note: #Saldo hanya dapat digunakan untuk pengurangan`;
}

function rp(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1.$2");
    return x;
}