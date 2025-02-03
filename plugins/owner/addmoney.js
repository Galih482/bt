/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

let Tio = async (m, { conn, command, text, args }) => {
    

    let who;
    if (m.quoted) {
        who = m.quoted.sender;
    } else if (m.isGroup) {
        who = m.mentionedJid[0] 
            ? m.mentionedJid[0] 
            : args[1] 
                ? args[1] + '@s.whatsapp.net' 
                : false;
    } else if (args[1]) {
        who = args[1] + '@s.whatsapp.net';
    }

    if (!who) throw 'Pengguna tidak ditemukan!';

    let users = global.db.data.users;
    if (!users[who]) throw 'Pengguna belum terdaftar di database!';

    let jumlah = parseInt(args[0]) 

     if (command === 'addmoney') {
        users[who].money = (users[who].money || 0) + jumlah;
        conn.reply(m.chat, `Sukses menambah money sebanyak ${jumlah} untuk pengguna!`, m);
    } else if (command === 'delmoney') {
        users[who].money = 0; 
        conn.reply(m.chat, `Sukses menghapus money user!`, m);
    } else {
        throw 'Perintah tidak dikenali!';
    }
};

Tio.help = ['addmoney', 'delmoney'];
Tio.tags = ['owner'];
Tio.command = /^(addmoney|delmoney)$/i;
Tio.owner = true;

export default Tio;