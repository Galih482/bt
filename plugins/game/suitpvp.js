/*
 * This code was created by Zykuan
 * © 2024 XiezuMedia. All rights reserved.
 * Do not remove this watermark or you will face a penalty.
*/

let timeout = 30000; //SetWaktu (30 Detik)
let money = 4000; //RewardMoney (WIN)
let money_lose = 1500; //DeleteMoney (LOSE)

let handler = async (m, { conn, usedPrefix }) => {
    if (!m.mentionedJid[0]) {
        return m.reply(`Siapa yang ingin kamu tantang? Tag orangnya untuk bermain.\nContoh: ${usedPrefix}suitpvp @username`, m.chat);
    }

    let who = m.mentionedJid[0];

    conn.suit = conn.suit ? conn.suit : {};
    if (Object.values(conn.suit).find(room => room.id.startsWith("suit") && [room.p, room.p2].includes(m.sender))) 
        throw "Selesaikan Suit sebelumnya terlebih dahulu.";
    
    if (Object.values(conn.suit).find(room => room.id.startsWith("suit") && [room.p, room.p2].includes(who))) 
        throw `Orang yang kamu tantang sedang bermain suit bersama orang lain...`;

    let id = "suit_" + (new Date() * 1);
    let caption = `
*[ SUIT PvP ]*

@${m.sender.split`@`[0]} menantang @${who.split`@`[0]} untuk bermain suit.

Silahkan @${who.split`@`[0]}.
\n\n`.trim();
    let footer = `Ketik "terima/ok/gas" untuk memulai suit\nKetik "tolak/gabisa/nanti" untuk menolak.`;

    conn.suit[id] = {
        chat: await conn.reply(m.chat, caption + footer, m, { contextInfo: { mentionedJid: [m.sender, who] } }),
        id: id,
        p: m.sender,
        p2: who,
        status: "wait",
        waktu: setTimeout(() => {
            if (conn.suit[id]) conn.reply(m.chat, `_Waktu suit habis_`, m);
            delete conn.suit[id];
        }, timeout),
        money,
        money_lose,
        timeout
    };
};

handler.tags = ["game"];
handler.help = ["suitpvp"].map(v => v + " @tag");
handler.command = /^(suitpvp)$/i;
handler.group = true;

export default handler;