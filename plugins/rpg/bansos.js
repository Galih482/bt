/*
📞 wa.me/6282285357346  
💻 Github: https://github.com/sadxzyq  
📷 Instagram: https://instagram.com/tulisan.ku.id  
⚠️ *INI WM GW COK JAN DIHAPUS*  
*/

import fetch from 'node-fetch';
import fs from 'fs';

let handler = async (m, { conn, args, usedPrefix }) => {
    try {
        let u = global.db.data.users[m.sender];
        u.lastbansos = u.lastbansos || 0;

        let Aku = Math.floor(Math.random() * 101);
        let Kamu = Math.floor(Math.random() * 81); // Menantang lebih kecil 😏
        let A = Aku * 1;
        let K = Kamu * 1;
        let kb = 'https://telegra.ph/file/afcf9a7f4e713591080b5.jpg';
        let mb = 'https://telegra.ph/file/d31fcc46b09ce7bf236a7.jpg';
        let t = new Date() - u.lastbansos;
        let timers = clockString(604800000 - t); // 7 hari

        if (t > 300000) { // 5 menit cooldown
            if (A > K) {
                conn.sendFile(m.chat, kb, 'b.jpg', `
🚔 *BREAKING NEWS!* 🚨  
*Tertangkap Basah! 🕴️💰*  
Warga dengan nomor ${m.sender.split('@')[0]} mencoba *korupsi dana bansos* tapi tertangkap basah oleh KPK! 😱  

💸 *Denda:* Rp 3.000.000  
🏛️ *Hukuman:* Skandal nasional  

⚠️ *Hati-hati! Jangan coba-coba lagi!* 😂
                `.trim(), m);
                u.money -= 3000000;
                u.lastbansos = new Date() * 1;
            } else if (A < K) {
                u.money += 3000000;
                conn.sendFile(m.chat, mb, 'b.jpg', `
🎉 *SELAMAT!* 😈  
🏦 *Aksi Korupsi Sukses!* 💰  

Anda berhasil mencuri dana bansos dan mendapatkan *Rp 3.000.000*! 💵  

🕶️ Tapi hati-hati... KPK sedang mengintai! Jangan ketahuan! 🤫  
                `.trim(), m);
                u.lastbansos = new Date() * 1;
            } else {
                conn.reply(m.chat, `
💨 *KABUR!*  
Waduh! Kamu hampir tertangkap saat korupsi bansos, tapi untungnya kamu berhasil *melarikan diri* 🏃‍♂️💨  

⚖️ *Status:* Buronan KPK! 😱  
                `.trim(), m);
                u.lastbansos = new Date() * 1;
            }
        } else {
            conn.reply(m.chat, `
⏳ *Sabar dulu boss!*  
🚔 Kamu baru aja melakukan korupsi!  
🔁 Tunggu *${timers}* sebelum mencoba lagi!  

📢 *Jangan lupa cuci uangnya biar gak ketahuan!* 💸😂
            `.trim(), m);
        }
    } catch (e) {
        throw `Terjadi kesalahan! 🚨`;
    }
};

handler.help = ['bansos'];
handler.tags = ['rpg'];
handler.command = /^(bansos|korupsi)$/i;
handler.group = true;
export default handler;

// 🎲 Fungsi untuk memilih elemen acak dari daftar
function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

// ⏳ Fungsi untuk format waktu dengan emoji biar lebih keren
function clockString(ms) {
    let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    return `
*${d}* _Hari_ ☀️  
*${h}* _Jam_ 🕐  
*${m}* _Menit_ ⏰  
*${s}* _Detik_ ⏱️  
    `.trim();
}
