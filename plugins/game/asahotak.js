/*
 * This code was created by Zykuan
 * © 2024 XiezuMedia. All rights reserved.
 * Do not remove this watermark or you will face a penalty.
*/

import fetch from 'node-fetch';

let timeout = 60000; //60s
let poin = 6000; //Reward
let handler = async (m, { conn, command, usedPrefix }) => {
    let imgr = 'https://files.catbox.moe/9m6th2.jpg';
    
    conn.asahotak = conn.asahotak ? conn.asahotak : {};
    let id = m.chat;
    if (id in conn.asahotak) {
        conn.reply(m.chat, '*📤 Masih ada soal belum terjawab di chat ini*', conn.asahotak[id][0]);
        throw false;
    }

    let src = await (await fetch('https://raw.githubusercontent.com/Zyknn/database/main/asahotak.json')).json();
    let json = src[Math.floor(Math.random() * src.length)];
    let caption = `_📑${json.soal}_

_⏰Timeout *${(timeout / 1000).toFixed(2)} detik*_
_✍🏻Ketik ${usedPrefix}hasa untuk bantuan_
_💵Bonus: ${poin} Money_
    `.trim();

    conn.asahotak[id] = [
        await conn.sendMessage(m.chat, {
            text: caption,
            contextInfo: {
                externalAdReply: {
                    title: '= ASAH OTAK =',
                    body: '',
                    showAdAttribution: true,
                    mediaType: 1,
                    sourceUrl: global.sig,
                    thumbnailUrl: imgr,
                    renderLargerThumbnail: false
                }
            }
        }, { quoted: m }),
        json, poin,
        setTimeout(() => {
            if (conn.asahotak[id]) {
                conn.reply(m.chat, `🙌🏻Waktu habis!\n📑Jawabannya adalah: *${json.jawaban}*`, conn.asahotak[id][0]);
                delete conn.asahotak[id];
            }
        }, timeout)
    ];
};

handler.help = ['asahotak'];
handler.tags = ['game'];
handler.command = /^asahotak/i;
handler.limit = true
handler.register = true

export default handler;
