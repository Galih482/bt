/**
✨ @credit: Tio  
🔥 @Tixo MD  
🤖 @Whatsapp Bot  
📞 wa.me/6282285357346  
**/

import fs from 'fs';

let Tio = async (m, { conn, text }) => {
    let kodeRedeem = generateRandomCode(8);
    
    let hadiah = parseHadiah(text.split(', '));
    if (!hadiah) return m.reply(`
❌ *Format tidak valid!*  
Gunakan format berikut untuk membuat kode redeem:  
📌 \`createcode 1 -limit, 2 -money\`  
Ayo coba lagi! 🚀
    `.trim());

    const codes = JSON.parse(await fs.readFileSync("./system/json/redeem/code.json"));
    
    const expiredTime = Date.now() + 86400000; // 24 jam
    codes.push({ code: kodeRedeem, hadiah, expired: expiredTime });
    
    fs.writeFileSync("./system/json/redeem/code.json", JSON.stringify(codes, null, 2));

    m.reply(`
🎉 *Kode Redeem Berhasil Dibuat!* 🎉  

🔖 *Kode:* \`${kodeRedeem}\`  
🎁 *Hadiah yang bisa kamu dapatkan:*  
${await formatHadiah(hadiah)}

⏳ *Kadaluarsa:* ${await hitungMundur(expiredTime)}  

✨ *Gunakan kode ini sebelum habis waktu!* Jangan sampai kelewatan ya! 😱  

📢 *Ajak teman-temanmu juga!*  
Semakin banyak yang bermain, semakin seru! 🔥  
Bagikan kode ini ke grup dan lihat siapa yang paling beruntung! 🍀  

🚀 *Mau klaim hadiahmu?* Ketik sekarang:  
📝 \`.klaimkode ${kodeRedeem}\`  
🎁 Siapa cepat dia dapat! Jangan sampai terlambat! ⏳
    `.trim());
};

Tio.help = ['buatkode'];
Tio.tags = ['rpg'];
Tio.command = /^(buatkode|createreedem)$/i;
Tio.rowner = true;
export default Tio;

// 🔥 Fungsi untuk membuat kode acak
function generateRandomCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// 🎁 Fungsi untuk memproses hadiah dari teks input
function parseHadiah(args) {
    const hadiah = {};
    for (let i = 0; i < args.length; i++) {
        const [jumlah, jenis] = args[i].trim().split(' -');
        const jumlahInt = parseInt(jumlah);
        
        if (isNaN(jumlahInt) || !jenis) return null;
        hadiah[jenis] = jumlahInt;
    }
    return hadiah;
}

// 🎈 Fungsi untuk menampilkan hadiah dengan format yang lebih menarik
function formatHadiah(hadiah) {
    let caption = '';
    for (const [jenis, jumlah] of Object.entries(hadiah)) {
        caption += `🎯 *${capitalize(jenis)}:* ${jumlah}\n`;
    }
    return caption.trim();
}

// ⏳ Fungsi untuk menghitung waktu kadaluarsa
function hitungMundur(expired) {
    const remaining = expired - Date.now();

    if (remaining <= 0) {
        return "⚠️ *Kode sudah kadaluarsa!*";
    }

    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) {
        return `🕒 *${hours} jam lagi*`;
    } else if (minutes > 0) {
        return `⏳ *${minutes} menit lagi*`;
    } else {
        return "⏳ *Sebentar lagi!*";
    }
}

// 🔠 Fungsi untuk kapitalisasi huruf pertama
function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}
