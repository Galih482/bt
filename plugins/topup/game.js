/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import {
    TopUp
} from "../../lib/scraper/MauPedia.js";
import fs from "fs";

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

let Tio = async (m, {
    conn,
    text,
    command
}) => {
    conn.topup = conn.topup || {};
    const id = m.sender;

    if (id in conn.topup) return m.reply("Kamu masih ada topup yang belum diselesaikan.");
    let user = JSON.parse(await fs.readFileSync('./system/database/saldo.json', 'utf-8'));
    if (!(id in user)) return m.reply("Maaf kamu tidak memiliki saldo.\nSilahkan ketik *.charge* untuk mengisis ulang saldo anda.");
    
    conn.topup[id] = {
        sender: id,
        data: {
            sesi: "select",
            game: '',
            kode: '',
            id: '',
            zone: '',
            trxid: '',
            list: '',
            harga: '',
            timeoutId: ''
        }
    };

const games = [
    { name: "MOBILE LEGENDS MEMBERSHIP", id: "mobile legends membership" },
    { name: "FREE FIRE MEMBERSHIP", id: "free fire membership" },
    { name: "PUBG MOBILE", id: "pubg mobile" },
    { name: "PUBG MOBILE GLOBAL", id: "pubg mobile global" },
    { name: "MOBILE LEGENDS", id: "mobile legends" },
    { name: "ACE RACER", id: "ace racer" },
    { name: "FREE FIRE", id: "free fire" },
    { name: "CALL OF DUTY MOBILE", id: "call of duty mobile" },
    { name: "ARENA BREAKOUT", id: "arena breakout" },
    { name: "GENSHIN IMPACT", id: "genshin impact" },
];

let message = `Berikut list game\nNote: Ketik kembali ID game yang berada di list\n\n`;

games.forEach((game, index) => {
    message += `${index + 1}. ${game.name}\n- id: ${game.id}\n\n`;
});

message += `Jika ada game lain, silakan ketik berdasarkan nama game (harus lengkap).`;

m.reply(message);

}

Tio.help = Tio.command = ["topup"];
Tio.tags = ["topup"];
Tio.register = Tio.premium = true;

Tio.before = async (m, {
    conn
}) => {
    conn.topup = conn.topup || {};
    const id = m.sender;
    let user = JSON.parse(await fs.readFileSync('./system/database/saldo.json', 'utf-8'));
    if (!(id in conn.topup)) return;
    if (m.isGroup) return;
    
    let {
        sender,
        data
    } = conn.topup[id];

    switch (m.text) {
        case "kode":
            data.sesi = "kode";
            await m.reply("Silahkan ketik kode topup!");
            break;
        case "id":
            data.sesi = "id";
            await m.reply("Silahkan ketik id akun!");
            break;
        case "zone":
            data.sesi = "zone";
            await m.reply("Silahkan ketik zone akun!");
            break;
        
        default:
         if (m.text == "cancel") {
                    delete conn.topup[id];
                    return m.reply("TopUp telah dibatalkan.");
              } else if (data.sesi == "select") {
                if (!m.text) return

                const {
                    result,
                    data: list,
                    message
                } = await topup.list_game(m.text);
                if (result == true) {
                    data.game = m.text.toLowerCase();
                    data.sesi = "kode";
                    data.list = list
                    await m.reply(`${list.map(v => `kode: ${v.code}\ngame: ${v.game}\nname: ${v.name}\nprice: ${v.price.current}\nserver: ${v.server}\nstatus: ${v.status == "available" ? "✅" : "✖️"}`).join("\n\n")}`);
                    await m.reply("masukan kode topup")
                } else if (result == false) {
                    await m.reply('game tidak ditemukan, silahkan input game secara benar')
                }
            } else if (data.sesi == "kode") {
                let find = Object.values(data.list).find(v => v.code == m.text)
                if (!find) return m.reply("kode tidak valid, silahkan input secara benar")
                data.kode = m.text;
                data.harga = find.price.current
                data.sesi = "id";
                await m.reply(`*Kode*: ${data.kode}\n\nLanjut input ID game Anda`);
                

            } else if (data.sesi == "id") {
                if (isNaN(m.text)) return m.reply("ID harus berupa angka saja");
                data.id = m.text;
                data.sesi = "zone";
                await m.reply(`*ID*: ${data.id}\n\nLanjut input zone game Anda\n#Jika game tidak menggunakan zone ID cukup ketik "not"`);
            } else if (data.sesi == "zone") {
                data.zone = m.text == "not" ? "" : m.text;
                data.sesi = "finish";
                await m.reply(`Verifikasi Data\n*Game*: ${data.game}\n*ID*: ${data.id}\n*Zone*: ${data.zone || 'Tidak Ada'}\nPrice: Rp${data.harga}\n\nJika data sudah benar ketik *YES*\nKetik *CANCEL* (membatalkan topup)\n\nJika ada kesalahan ketik:\n- code (mengganti kode topup)\n- id (mengganti ID akun)\n- zone (mengganti zone akun)`);
            } else if (data.sesi == "finish") {
                if (m.text == "YES") {
                if (user < data.harga) {
                 m.reply(`Saldo kamu kurang ${await minus(user.saldo, data.harga)}\nsilahkan charge saldo dengan mengetik: .charge`)
                 delete conn.topup[id]
                 } else {
                    const {
                        result,
                        data: top,
                        message
                    } = await topup.topup_game(data.kode, data.id, data.zone);
                    if (result == true) {
                        user -= top.price
                        data.trxid = top.trxid;
                        await conn.reply(sender, `TopUp Proses\n\nTrxid: ${top.trxid}\nID: ${top.data}\nZone: ${top.zone}\nLayanan: ${top.service}\nStatus: ${top.status}\nHarga: Rp${top.price}\n\nPesan: ${message}`, m);
                        await conn.reply(owner + info.jid, `TopUp Proses\n\nTrxid: ${top.trxid}\nID: ${top.data}\nZone: ${top.zone}\nLayanan: ${top.service}\nStatus: ${top.status}\nHarga: Rp${top.price}\nPembeli: ${sender.split("@")[0]}\n\nPesan: ${message}`, null);
                        await fs.writeFileSync('./system/database/saldo.json', JSON.stringify(user, null, 2));
                        
                    data.timeoutId = setTimeout(async() => {
                            let cek = await topup.cek_game(data.trxid);
                            if (cek.data.status == "success") {
                                await conn.reply(sender, `TopUp Selesai\n\nTrxid: ${cek.data.trxid}\nID: ${cek.data.data}\nZone: ${cek.data.zone}\nLayanan: ${cek.data.service}\nStatus: ${cek.data.status}\nHarga: Rp${cek.data.price}\n\nPesan: ${cek.message}`, null);
                                clearTimeout(data.timeoutId);
                                delete conn.topup[id];
                            }
                        }, 1000 * 15);
                        
                    } else if (result == false) {
                        await m.reply(message);
                        delete conn.topup[id];
                    }
                    }
                }
            }
            break;
    }
}

export default Tio;

function minus(nilai1, nilai2) {
  return Math.abs(nilai1 - nilai2);
}