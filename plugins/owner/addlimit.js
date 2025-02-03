/**
@credit Tio
@Tixo MD
@Whatsapp Bot
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

    let jumlah = parseInt(args[0]) || (command === 'resetlimit' ? 20 : 250); 

    if (command === 'resetlimit') {
        users[who].limit = jumlah;
        conn.reply(m.chat, `Sukses mereset limit pengguna ke ${jumlah}!`, m);
    } else if (command === 'addlimit') {
        users[who].limit = (users[who].limit || 0) + jumlah;
        conn.reply(m.chat, `Sukses menambah limit sebanyak ${jumlah} untuk pengguna!`, m);
    } else if (command === 'hapuslimit') {
        users[who].limit = 0; 
        conn.reply(m.chat, `Sukses menghapus limit pengguna!`, m);
    } else {
        throw 'Perintah tidak dikenali!';
    }
};

Tio.help = ['addlimit', 'resetlimit', 'hapuslimit'];
Tio.tags = ['owner'];
Tio.command = /^(addlimit|resetlimit|hapuslimit)$/i;
Tio.owner = true;

export default Tio;