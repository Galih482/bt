/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import nodemailer from 'nodemailer';

let timeout = 120000;
let poin = 4999;

let Tio = async (m, { conn, command, text, usedPrefix }) => {
    conn.regmail = conn.regmail || {};
    let id = m.sender;
    let user = global.db.data.users[m.sender];

    if (id in conn.regmail) {
        conn.reply(m.chat, '*❗Ada registrasi yang belum diverifikasi!*', conn.regmail[id][0]);
        throw false;
    }

    if (user.registered) {
        throw 'Kamu sudah terdaftar. Jika ingin mendaftar ulang, ketik /unreg';
    }

    if (!text) {
        return m.reply(await Func.exam(usedPrefix, command, 'tes@gmail.com'))
    }

    let email = text.trim().split(/\s+\|\s+/).shift();
    if (!isValidEmail(email)) {
        return m.reply(await Func.exam(usedPrefix, command, 'tes@gmail.com'));
    }

    let generateOTP = (Math.floor(Math.random() * 9000) + 1000).toString();
    let pp = await conn.profilePictureUrl(m.sender, 'image').catch(() => 'https://telegra.ph/file/a2ae6cbfa40f6eeea0cf1.jpg');
    let res = await sendEmail(email, conn.getName(m.sender), info.numberBot, pp, generateOTP);

    if (res.success) {
        let caption = `*${command.toUpperCase()}*
Masukan kode verifikasi

Email: ${email}

Kode Expired dalam *${(timeout / 1000).toFixed(2)} detik*`;

        let mesOtp = await conn.sendMessage(m.chat, { image: { url: 'https://files.catbox.moe/xybjqz.webp' }, caption }, { quoted: m });
        
        conn.regmail[id] = [
            mesOtp,
            { jawaban: generateOTP, soal: "Masukan kode verifikasi ketik /verifcode" },
            poin,
            setTimeout(() => {
                if (conn.regmail[id]) {
                    conn.reply(m.chat, `*❌ Kode verifikasi telah kedaluwarsa.*\nOTP *${generateOTP}*`, conn.regmail[id][0]);
                    conn.sendMessage(m.chat, { delete: mesOtp.key });
                    delete conn.regmail[id];
                }
            }, timeout),
        ];
    }
};

Tio.help = Tio.command = ['regmail'];
Tio.tags = ['main'];
export default Tio;

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

async function sendEmail(email, name, numberBot, pp, code) {
    let html = `<html lang="id">
        <body style="background-color: #f7fafc; padding: 24px;">
            <div style="max-width: 400px; margin: auto; background-color: #ffffff; padding: 24px; border-radius: 8px; text-align: center;">
                <img alt="Foto Profil pengguna" src="${pp}" style="border-radius: 50%; width: 96px; height: 96px; margin-bottom: 16px;"/>
                <h2>Verifikasi Akun Anda</h2>
                <p>Halo <strong>${name}</strong>,</p>
                <p>Silakan gunakan kode berikut untuk verifikasi:</p>
                <p><strong>Kode Verifikasi: ${code}</strong></p>
                <a href="https://wa.me/${numberBot}?text=.verifcode%20${code}" style="display: inline-block; background-color: #48bb78; color: white; padding: 8px 16px; border-radius: 8px;">Verifikasi via WhatsApp</a>
                <p>Salam,<br/>Galihz</p>
            </div>
        </body>
    </html>`;

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            secure: true,
            auth: {
                user: "tixoteam12@gmail.com",
                pass: "dbli urpz obic lqrs",
            },
        });

        await transporter.sendMail({
            from: '"Galihz✨" <tixoteam12@gmail.com>',
            to: email,
            subject: "Verifikasi Akun Anda",
            html: html,
        });

        return { success: true };
    } catch (err) {
        console.error(err);
        return { success: false };
    }
}