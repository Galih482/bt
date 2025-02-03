/*
 * This code was created by Zykuan
 * © 2024 XiezuMedia. All rights reserved.
 * Do not remove this watermark or you will face a penalty.
*/

let handler = async (m, { conn }) => {
    conn.bomb = conn.bomb || {};
    let id = m.chat,
        timeout = 180000; // 3 menit
    
    if (id in conn.bomb) return conn.reply(m.chat, 'Permainan masih berjalan, selesaikan dulu ya!', conn.bomb[id][0]);

    const bom = ['💥', '✅', '✅', '✅', '✅', '✅', '✅', '✅', '✅'].sort(() => Math.random() - 0.5);
    const number = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];
    const array = bom.map((v, i) => ({
        emot: v,
        number: number[i],
        position: i + 1,
        state: false
    }));

    let teks = `🎮 *Game B O M B*\n\nPilih angka *1* - *9* untuk membuka kotak dan lihat apa yang kamu dapatkan!\n`;
    for (let i = 0; i < array.length; i += 3) teks += array.slice(i, i + 3).map(v => v.state ? v.emot : v.number).join('') + '\n';
    teks += `\nWaktu tersisa: [ *${((timeout / 1000) / 60)} menit* ]\nJika kamu membuka kotak yang berisi bom, poinmu akan berkurang. Semoga beruntung!`;
    
    let msg = await conn.reply(m.chat, teks, m);
    let { key } = msg;

    let v;
    conn.bomb[id] = [
        msg,
        array,
        setTimeout(() => {
            v = array.find(v => v.emot === '💥');
            if (conn.bomb[id]) {
                conn.reply(m.chat, `Waktu habis! Bom ada di kotak nomor ${v.number}.`, conn.bomb[id][0].key);
                delete conn.bomb[id];
            }
        }, timeout),
        key
    ];
};

handler.help = ["bomb"];
handler.tags = ["game"];
handler.command = /^(bomb)$/i;
handler.limit = true
handler.register = true

export default handler;