/**
🎉 @credit: Tio  
🔥 @Tixo MD  
🤖 @Whatsapp Bot  
📞 wa.me/6282285357346  
**/

import fs from 'fs';

let Tio = async (m, { args }) => {
    const user = global.db.data.users;
    const codeInput = args[0];

    if (!codeInput) return m.reply(`
❌ *Oops! Kode Redeem Tidak Ditemukan!*  
📌 *Gunakan format berikut untuk klaim hadiahmu:*  
📝 \`.klaimkode [kode redeem]\`  

🎁 *Contoh:*  
\`.klaimkode ABCD1234\`  

🔥 *Cepat klaim sebelum kadaluarsa!* Siapa cepat, dia dapat! 💨
    `.trim());

    const path = "./system/json/redeem/code.json";
    const claimFilePath = "./system/json/redeem/claim.json";
    const codes = JSON.parse(await fs.readFileSync(path));

    const codeIndex = codes.findIndex(c => c.code === codeInput);
    if (codeIndex === -1) return m.reply(`
❌ *Kode Redeem Tidak Valid!*  
🔍 Mungkin kode ini sudah digunakan atau salah ketik.  
⚡ Coba cek lagi atau tunggu event berikutnya! 🎊
    `.trim());

    const { code, hadiah, expired } = codes[codeIndex];
    const currentTime = Date.now();

    if (currentTime > expired) {
        codes.splice(codeIndex, 1);
        fs.writeFileSync(path, JSON.stringify(codes, null, 2));
        return m.reply(`
⏳ *Kode Redeem Sudah Kedaluwarsa!*  
😢 Sayang sekali, waktunya sudah habis...  

📢 *Tetap aktif dan nantikan event berikutnya!* Siapa tahu kamu beruntung lagi! 🍀✨
    `.trim());
    }

    const sender = m.sender.split('@')[0];
    const claims = JSON.parse(await fs.readFileSync(claimFilePath) || '[]');
    const hasClaimed = claims.some(claim => claim.user === sender && claim.code === code);

    if (hasClaimed) {
        return m.reply(`
⚠️ *Oops, ${sender}! Kamu sudah pernah klaim kode ini!*  
💡 Ingat, satu kode hanya bisa digunakan sekali!  

🔥 *Jangan khawatir!* Masih banyak event dan kode lainnya.  
Ajak teman-temanmu dan pantau terus untuk hadiah berikutnya! 🎁🎊
    `.trim());
    }

    for (const [jenis, jumlah] of Object.entries(hadiah)) {
        user[m.sender][jenis] += jumlah;
    }

    claims.push({ user: sender, code, hadiah, redeemedAt: currentTime });
    fs.writeFileSync(claimFilePath, JSON.stringify(claims, null, 2));

    m.reply(`
🎉 *SELAMAT, ${sender}! Kamu Berhasil Klaim Kode Redeem!* 🎉  

🆔 *Kode:* \`${code}\`  
🎁 *Hadiah yang kamu dapatkan:*  
${formatHadiah(hadiah)}

🕒 *Jangan lupa share kabar ini ke teman-temanmu!*  
Mungkin mereka juga bisa dapat hadiah keren! 🚀✨  

📢 *Pantau terus event berikutnya!* Siapa tahu kamu bisa menang lebih banyak lagi! 🏆🔥
    `.trim());
};

Tio.help = ['redeem'];
Tio.tags = ['rpg'];
Tio.command = /^(redeem|klaimkode)$/i;
Tio.register = true;

export default Tio;

// 🎁 Fungsi untuk menampilkan hadiah dengan format yang lebih menarik
function formatHadiah(hadiah) {
    let message = '';
    for (const [jenis, jumlah] of Object.entries(hadiah)) {
        message += `🎯 *${capitalize(jenis)}:* ${jumlah}\n`;
    }
    return message.trim();
}

// 🔠 Fungsi untuk kapitalisasi huruf pertama
function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}
