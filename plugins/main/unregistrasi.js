/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import { createHash } from 'crypto';

let Tio = async function(m, { text, conn, command, usedPrefix, args, dbUser: user }) {
    
    const now = new Date() * 1;
    const cooldownTime = 7200000; // 2 hours in milliseconds
    const timeLeft = cooldownTime - (now - user[m.sender].lastUnreg);

    if (timeLeft > 0) {
        let timeLeftInMinutes = Math.ceil(timeLeft / 60000);
        return m.reply(`Tunggu selama ${timeLeftInMinutes} menit lagi untuk melakukan unreg.`);
    }

    if (!text) return m.reply('Masukan *Serial Number*\nKetik *.ceksn* untuk mendapatkan nomor SN')
    
    let nama = conn.getName(m.sender);
    const pp = await conn.profilePictureUrl(m.sender).catch((_) => "https://i.ibb.co/3Fh9V6p/avatar-contact.png");
    let age = user[m.sender].age;
    let sn = createHash('md5').update(m.sender).digest('hex');
    let cap = `✅ *Unreg Successfully*
  
➠ *Name :* ${nama}
➠ *Age :* ${age} Tahun
➠ *Status :* Sukses`;

    if (text !== sn) throw 'Serial Nomor Salah';
    
    conn.sendMessage(m.chat, {
        image: {
            url: pp
        },
        caption: cap
    }, {
        quoted: m
    });

    user[m.sender].registered = false;
    user[m.sender].lastUnreg = new Date() * 1;
};

Tio.help = ['unregister'];
Tio.tags = ['main'];
Tio.command = /^unreg(ister)?$/i;
Tio.register = true;

export default Tio;