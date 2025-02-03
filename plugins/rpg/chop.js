// 🌲 *MENEBANG POHON* 🌳 - Versi Seru! 🎮✨
// Created by ArifzynXD

let handler = async (m, { conn, usedPrefix, DevMode }) => { 
    try { 
        let __timers = (new Date - global.db.data.users[m.sender].lastmining);
        let _timers = (180000 - __timers);
        let timers = clockString(_timers);

        if (new Date - global.db.data.users[m.sender].lastmining > 180000) {
            // Hasil Penebangan
            let diamond = Math.floor(Math.random() * 10);
            let kayu = Math.floor(Math.random() * 150);
            let batu = Math.floor(Math.random() * 100);
            let iron = Math.floor(Math.random() * 100);
            let exp = Math.floor(Math.random() * 500);
            let uang = Math.floor(Math.random() * 500);

            conn.reply(m.chat, '🔨 *Menebang...* 🌳⛏️', m);

            let str = `
🌲 *Kamu Menebang Pohon...* 🌳
-----------------------------------------
🎉 *Hadiah yang Kamu Dapatkan:*
💎 *Berlian:* ${diamond} 🪙
🌲 *Kayu:* ${kayu} 🌿
⛏️ *Batu:* ${batu} 🪨
⚒️ *Iron:* ${iron} 🏗️
💰 *Gold:* ${uang} 💸
💥 *XP:* ${exp} 💪
-----------------------------------------
*Selamat Menebang!* 🎉
`.trim();

            await conn.reply(m.chat, str, m);

            // Pembaruan data pemain
            global.db.data.users[m.sender].kayu += kayu;
            global.db.data.users[m.sender].diamond += diamond;
            global.db.data.users[m.sender].batu += batu;
            global.db.data.users[m.sender].iron += iron;
            global.db.data.users[m.sender].exp += exp;
            global.db.data.users[m.sender].money += uang;
            global.db.data.users[m.sender].lastmining = new Date * 1;

        } else {
            conn.reply(m.chat, `⏳ *Kamu Sudah Menebang, Tunggu ${timers} lagi untuk menebang!*`, m);
        }

    } catch (e) {
        console.log(e);
        conn.reply(m.chat, '⚠️ *Terjadi Kesalahan!* ⚠️\nCoba lagi nanti ya! 😥', m);
        
        if (DevMode) {
            let file = require.resolve(__filename);
            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                conn.reply(jid, `${file} error\nNo: *${m.sender.split`@`[0]}*\nCommand: *${m.text}*\n\n*${e}*`, m);
            }
        }
    }
}

handler.help = ['menebang'];
handler.tags = ['rpg'];
handler.command = /^(menebang)$/i;

export default handler;

// Fungsi untuk format waktu
function clockString(ms) {
    let d = Math.floor(ms / 86400000);
    let h = Math.floor(ms / 3600000) % 24;
    let m = Math.floor(ms / 60000) % 60;
    let s = Math.floor(ms / 1000) % 60;
    return `\n${d} *Hari*\n ${h} *Jam*\n ${m} *Menit*\n ${s} *Detik* `;
}
