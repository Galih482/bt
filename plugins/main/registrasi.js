/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import kode from 'kode-scrape';
const {
    tools
} = kode;
import crypto from "crypto";
import PhoneNumber from 'awesome-phonenumber';

const money = 10000,
    limit = 30
let verCapt = {
    key: {
        participant: '0@s.whatsapp.net',
        remoteJid: "0@s.whatsapp.net"
    },
    message: {
        conversation: "REGISTRASI (1/3)"
    }
};
let verOtp = {
    key: {
        participant: '0@s.whatsapp.net',
        remoteJid: "0@s.whatsapp.net"
    },
    message: {
        conversation: "REGISTRASI (2/3)"
    }
};
let verName = {
    key: {
        participant: '0@s.whatsapp.net',
        remoteJid: "0@s.whatsapp.net"
    },
    message: {
        conversation: "REGISTRASI (3/3)"
    }
};
let verAge = {
    key: {
        participant: '0@s.whatsapp.net',
        remoteJid: "0@s.whatsapp.net"
    },
    message: {
        conversation: "REGISTRASI BERHASIL"
    }
};

const Tio = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    conn.registrasi = conn.registrasi || {};
    conn.sesi = conn.sesi || {};
    if (conn.registrasi[m.sender]) return m.reply('Anda sedang meminta verifikasi!');
    let user = global.db.data.users[m.sender];
    if (user.registered === true) return conn.reply(m.chat, '```✅ Nomor Anda Sudah Terverifikasi```', m);

    let sn = crypto.createHash("md5").update(m.sender).digest("hex");
    let captcha = await tools.captcha();

    let cpt = "Reply pesan ini menggunakan kode *CAPTCHA* yang tertera digambar!";

    let {
        key
    } = await conn.sendFile(m.chat, captcha.buffer, '', cpt, verCapt);

    conn.registrasi[m.sender] = {
        message: m,
        sn,
        sender: m.sender,
        otp: captcha.code,
        user,
        key,
        timeout: setTimeout(() => {
            conn.sendMessage(m.chat, {
                delete: key
            });
            delete conn.registrasi[m.sender];
        }, 60 * 1000)
    };
    conn.sesi[m.sender] = {
        sesi: "otp",
        name: '',
        age: ''
    };
};

Tio.before = async (m, {
    conn
}) => {
    conn.registrasi = conn.registrasi || {};
    conn.sesi = conn.sesi || {};

    if (!conn.registrasi[m.sender]) return;
    if (!m.text) return;

    let {
        timeout,
        otp,
        message,
        sn,
        sender,
        user,
        key
    } = conn.registrasi[m.sender];
    let sesi = conn.sesi[m.sender].sesi;

    if (sesi === "otp") {
        if (m.text === otp) {
            await conn.reply(m.chat, "Verifikasi diterima.\n\nInput Nama Anda:", verOtp);
            conn.sesi[m.sender].sesi = "name";
        } else {
            await m.reply(`📮 Kode verifikasi Anda salah.`);
            clearTimeout(timeout);
            await conn.sendMessage(m.chat, {
                delete: key
            });
            delete conn.registrasi[m.sender];
        }
    } else if (sesi === "name") {
        conn.sesi[m.sender].name = m.text;
        await conn.reply(m.chat, "Input Umur Anda:", verName);
        conn.sesi[m.sender].sesi = "age";
    } else if (sesi === "age") {
        if (isNaN(m.text)) return m.reply(`Umur harus berupa angka.`);
        user.name = conn.sesi[m.sender].name;
        user.age = m.text;
        user.regTime = +new Date;
        user.registered = true;
        user.sn = sn;
        user.money = money;
        user.limit = limit;
        delete conn.sesi[m.sender];
        let ppUrl = await conn.profilePictureUrl(m.sender, 'image').catch((_) => "https://telegra.ph/file/1dff1788814dd281170f8.jpg");
        let txt = `*Verifikasi Berhasil*\n\n`;
        txt += `*▸ Nama:* ${user.name}\n`;
        txt += `*▸ Umur:* ${user.age}\n`;
        txt += `*▸ Nomor:* ${PhoneNumber('+' + m.sender.split('@')[0]).getNumber('international')}\n`;
        txt += `*▸ Sn:* ${sn}\n`;
        txt += `*▸ Bonus:*\n➠ +${money} Uang\n➠ +${limit} Limit`;
        await conn.sendMessage(m.chat, {
            text: txt,
            contextInfo: {
                mentionedJid: [m.sender],
                externalAdReply: {
                    showAdAttribution: true,
                    title: 'REGISTRASI USER',
                    body: 'G L A S L Y - A I',
                    thumbnailUrl: ppUrl,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, {
            quoted: verAge
        });
        clearTimeout(timeout);
        delete conn.registrasi[m.sender];
    }
};

Tio.help = ["register", "daftar"];
Tio.tags = ["main"];
Tio.command = /^(register|daftar)$/i;

export default Tio;