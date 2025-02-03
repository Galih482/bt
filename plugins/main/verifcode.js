/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import { createHash } from 'crypto';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
}

let Tio = async (m, { text, dbUser, conn }) => {
    let id = m.sender;
    let user = dbUser[m.sender];
    let name = await conn.getName(m.sender);
    let age = await getRandomInt(1, 80);
    let sn = createHash('md5').update(m.sender).digest('hex');
    const pp = await conn.profilePictureUrl(m.sender, 'image').catch(() => 'https://telegra.ph/file/ee60957d56941b8fdd221.jpg');

    conn.regmail = conn.regmail || {};

    if (!(id in conn.regmail)) {
        return conn.reply(m.chat, '*❗Kode verifikasi telah kedaluwarsa.*', m);
    }

    if (!text) throw '*Masukkan kode verifikasi untuk melanjutkan registrasi!*';

    const { jawaban, soal } = conn.regmail[id][1];
    const poin = conn.regmail[id][2];

    if (text === jawaban) {
        user.name = name;
        user.age = age;
        user.regTime = +new Date();
        user.registered = true;
        user.sn = sn;
        user.money = (user.money || 0) + 500; 
        user.limit = (user.limit || 0) + 10; 
        global.db.data.users[m.sender].exp += poin;

        let txt = `*✅ Verifikasi Berhasil!*\n\n`;
        txt += `*▸ Nama:* ${user.name}\n`;
        txt += `*▸ Umur:* ${user.age}\n`;
        txt += `*▸ Nomor:* ${m.sender.split('@')[0]}\n`;
        txt += `*▸ Serial Number:* ${sn}\n\n`;
        txt += `*▸ Bonus:*\n➠ +500 Uang\n➠ +10 Limit\n`;

        await conn.sendMessage(m.chat, {
            text: txt,
            contextInfo: {
                mentionedJid: [m.sender],
                externalAdReply: {
                    showAdAttribution: true,
                    title: 'REGISTRASI USER',
                    body: 'G L A S L Y - A I',
                    thumbnailUrl: pp,
                    mediaType: 1,
                    renderLargerThumbnail: true,
                },
            },
        }, { quoted: m });

        clearTimeout(conn.regmail[id][3]);
        delete conn.regmail[id];
    } else {
        conn.reply(m.chat, `*❌ Kode verifikasi salah.*`, m);
    }

    return true;
};

Tio.help = ['verifcode'];
Tio.tags = ['main'];
Tio.command = /^(ver(if)?(ikasi)?code)$/i;

export default Tio;