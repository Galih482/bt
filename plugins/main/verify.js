import { createHash } from 'crypto';
import fetch from 'node-fetch';

let handler = async function (m, { text, usedPrefix, command }) {
    let namae = conn.getName(m.sender);
    let user = global.db.data.users[m.sender];
    const pp = await conn.profilePictureUrl(m.sender, "image").catch(() => "https://telegra.ph/file/ee60957d56941b8fdd221.jpg");

    if (user.registered === true) {
        throw `Anda sudah terdaftar di basis data. Ingin mendaftar ulang? Gunakan perintah */unreg*`;
    }

    // Menghasilkan umur acak antara 2 hingga 18
    let age = pickRandom([2, 4, 6, 8, 10, 12, 14, 16, 18]);
    user.name = namae;
    user.age = age;
    user.regTime = +new Date();
    user.registered = true;

    // Menghasilkan serial number unik berdasarkan hash MD5
    let sn = createHash('md5').update(m.sender).digest('hex');

    // Membuat caption untuk pendaftaran
    let cap = `
╭━━「 *Informasi Pendaftaran* 」
│ ▸ *Nama:* ${namae}
│ ▸ *Umur:* ${age} Tahun
│ ▸ *Status:* _Berhasil_
│ ▸ *Serial Number:* ${sn}
╰━━━━━━━━━━━━━━━━━━━
`;

    // Mengirim pesan pendaftaran berhasil
    await conn.sendMessage(m.chat, {
        text: cap,
        contextInfo: {
            externalAdReply: {
                title: "✔️ Pendaftaran Berhasil",
                body: "",
                showAdAttribution: true,
                mediaType: 1,
                sourceUrl: '',
                thumbnailUrl: pp,
                renderLargerThumbnail: true,
            },
        },
    }, m);
};

handler.help = ['@verify'];
handler.tags = ['main'];
handler.customPrefix = /^(@verify)/i;
handler.command = new RegExp();

export default handler;

// Fungsi untuk memilih elemen acak dari daftar
function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}
