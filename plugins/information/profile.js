/**
✨ @credit Tio  
🤖 @Tixo MD  
📱 @Whatsapp Bot  
🌐 wa.me/6282285357346  
**/

let Tio = async (m, { conn, dbUser, usedPrefix }) => {
    let saldo = JSON.parse(await fs.readFileSync('./system/database/saldo.json', 'utf-8'));
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
    if (!(who in dbUser)) return m.reply('❌ *User tidak terdaftar di database!*');
    
    const {
        level,
        exp,
        money: uang,
        limit,
        premium,
        premiumTime,
        name: nama
    } = dbUser[who], 
    Saldo = who in saldo ? saldo[who] : '0', 
    bio = await conn.fetchStatus(who).catch(() => '');
    
    const rank = getRank(level);
    const rankNext = getNextRank(level);
    const topUpInfo = premium ? '✅ Anda sudah Premium! 🎉' : '⚡ *Ingin lebih seru?* Upgrade ke Premium dengan *.premium* untuk fitur eksklusif.';
    const caption = `🎉 *PROFILE USER* 🎉

📛 *Nama:* @${who.split('@')[0]}
📝 *Bio:* ${bio.status || 'Tidak tersedia 😔'}
💰 *Money:* ${uang} 
💳 *Saldo:* ${Saldo}
🔖 *Limit Harian:* ${limit}
📈 *Level:* ${level}
🏆 *Rank:* ${rank}
📊 *XP Anda:* ${exp} 
🎯 *Target Rank Berikutnya:* ${rankNext}

⭐ *Status:* ${premium ? 'Premium ✨' : 'Free 🆓'}
${premium && premiumTime == 0 ? '⏳ *Premium*: Permanen ♾️' : premium ? `⏳ *Premium Aktif Hingga:* ${time(premiumTime)}` : ''}


✨ *Fakta Menarik:*
- 🚀 *XP yang Dibutuhkan untuk Level Selanjutnya:* ${getRequiredExp(level, exp)} XP
- 🌟 *Peringkat Anda:* ${rank}
- 🎮 *Games yang Tersedia:* *${usedPrefix}menu game* untuk bermain mini games seru
- 🎁 *Bonus Harian:* *${usedPrefix}harian* untuk klaim hadiah harian 

🛒 *Fitur Eksklusif Premium:*
- 💰 *Unlimited Money*
- 👑 *Unlimited Limit*
- 💎 *Unlimited Commands*
- ⚡ *Akses Lebih Cepat*
- 🔥 *Rewards Double!*
${topUpInfo}

📖 *Tips Hari Ini:*
- 🏆 "Tetaplah konsisten bermain dan klaim bonus harian untuk naik level lebih cepat!" 
- 🔗 Jangan lupa cek *${usedPrefix}leaderboard* untuk lihat posisi Anda di peringkat global!
    
💬 *Gunakan command berikut untuk menjelajahi lebih banyak fitur:*
- 🛠️ *${usedPrefix}menu* untuk daftar fitur
- 🎯 *${usedPrefix}premium* untuk naik ke Premium
- 📊 *${usedPrefix}leaderboard* untuk cek peringkat`;

    // Kirim pesan dengan format teks dan mention
    await conn.sendMessage(m.chat, {
        text: caption,
        mentions: [who]
    }, {
        quoted: m
    });
}

Tio.help = ["profile"];
Tio.tags = ["info"];
Tio.command = /^(me|profil(e)?)$/i;
export default Tio;

// Fungsi untuk menghitung waktu dalam format hari, jam, menit
function time(ms) {
    let days = Math.floor(ms / (24 * 60 * 60 * 1000));
    let daysms = ms % (24 * 60 * 60 * 1000);
    let hours = Math.floor(daysms / (60 * 60 * 1000));
    let hoursms = ms % (60 * 60 * 1000);
    let minutes = Math.floor(hoursms / (60 * 1000));
    return `${days} Hari 🗓️ ${hours} Jam ⏰ ${minutes} Menit ⌛`;
}

// Fungsi untuk mendapatkan rank berdasarkan level
function getRank(level) {
    if (level < 5) return 'Beginner 🐣';
    if (level < 10) return 'Apprentice 🛠️';
    if (level < 20) return 'Warrior ⚔️';
    if (level < 30) return 'Champion 🏅';
    if (level < 50) return 'Master 🥇';
    return 'Legend 🌟';
}

// Fungsi untuk mendapatkan rank berikutnya
function getNextRank(level) {
    if (level < 5) return 'Apprentice 🛠️';
    if (level < 10) return 'Warrior ⚔️';
    if (level < 20) return 'Champion 🏅';
    if (level < 30) return 'Master 🥇';
    if (level < 50) return 'Legend 🌟';
    return 'Maksimal 🌌';
}

// Fungsi untuk menghitung XP yang dibutuhkan untuk level selanjutnya
function getRequiredExp(level, currentExp) {
    const baseXP = 100; // XP dasar untuk setiap level
    const nextLevelXP = (level + 1) * baseXP; // XP untuk level berikutnya
    return nextLevelXP - currentExp > 0 ? nextLevelXP - currentExp : 0; // XP tersisa
}
