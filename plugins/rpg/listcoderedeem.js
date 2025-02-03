/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import fs from 'fs';

let Tio = async (m) => {

    const codes = JSON.parse(await fs.readFileSync("./system/json/redeem/code.json"));
    
    if (codes.length === 0) {
        return m.reply('🚫 Oops! Saat ini tidak ada kode redeem yang tersedia. Jangan khawatir, selalu cek lagi untuk peluang baru! ✨');
    }

    let message = "*🎉 Daftar Kode Redeem Tersedia 🎉*\n\n";
    
    codes.forEach(codeEntry => {
        const { code, hadiah, expired } = codeEntry;
        const remainingTime = getRemainingTime(expired);
        
        message += `✨ *Code:* ${code}\n🎁 *Hadiah:* \n`;
        
        for (const [jenis, jumlah] of Object.entries(hadiah)) {
            message += `🔹 ${jenis}: ${jumlah}\n`;
        }

        message += `⏳ *Kedaluwarsa:* ${remainingTime}\n\n`;
    });

    message += "*💡 Jangan lupa untuk menggunakan kode redeemmu sebelum kedaluwarsa! Semoga beruntung! 🍀*\n\n";
    message += "*💬 Untuk informasi lebih lanjut atau kode baru, jangan ragu untuk bertanya! Saya selalu siap membantu! 😊*";

    m.reply(message.trim());
};

Tio.help = ['listkode', 'daftarkode'];
Tio.tags = ['rpg'];
Tio.command = /^(listkode|daftarkode)$/i;

export default Tio;

function getRemainingTime(expired) {
    const remaining = expired - Date.now();

    if (remaining <= 0) {
        return "🚫 Sudah kedaluwarsa";
    }

    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) {
        return `${hours} jam lagi ⏰`;
    } else if (minutes > 0) {
        return `${minutes} menit lagi ⏳`;
    } else {
        return "sebentar lagi 🕒";
    }
}
