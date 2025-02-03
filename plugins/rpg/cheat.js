/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    let bot = db.data.settings[conn.user.jid];

    if (!user.cheatTime) user.cheatTime = 0;
    if (new Date() - user.cheatTime < 86400000) throw `Tunggu setelah ${await time(user.cheatTime + 86400000 - new Date())}`; // cooldown 12 hours

    let coinValue = 99999;
    let limitValue = 1000;
    let expValue = 9999;

    global.db.data.users[m.sender].money = coinValue;
    global.db.data.users[m.sender].limit = limitValue;
    global.db.data.users[m.sender].exp = expValue;

    user.cheatTime = new Date() * 1;

    m.reply(`[ *P R E M I U M* 👑]\n\n*Selamat Kamu Mendapatkan*:\n*Koin:* ${coinValue}\n*Limit:* ${limitValue}\n*Exp:* ${expValue}`);
}

handler.command = /^(cheat)$/i;
handler.premium = true;
handler.cooldown = 1;
export default handler;

function time(ms) {
    let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    return [d, ' *Hari* ', h, ' *Jam* ', m, ' *Menit* ', s, ' *Detik* '].map(v => v.toString().padStart(2, 0)).join('');
}