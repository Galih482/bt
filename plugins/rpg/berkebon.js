const timeout = 1800000;

let handler = async (m, { conn, usedPrefix, text }) => {
    let apelu = global.db.data.users[m.sender].bibitapel;
    let angguru = global.db.data.users[m.sender].bibitanggur;
    let manggau = global.db.data.users[m.sender].bibitmangga;
    let pisangu = global.db.data.users[m.sender].bibitpisang;
    let jeruku = global.db.data.users[m.sender].bibitjeruk;
    let time = global.db.data.users[m.sender].lastberkebon + timeout;

    // Cek apakah user memiliki semua bibit yang dibutuhkan
    if (apelu == 0 || angguru == 0 || manggau == 0 || pisangu == 0 || jeruku == 0) {
        return m.reply(`🌱 *Pastikan Kamu Memiliki Semua Bibit* 🌱\n\nBibit yang Dibutuhkan:\n🍏 Bibit Apel\n🍇 Bibit Anggur\n🍌 Bibit Pisang\n🍊 Bibit Jeruk\n🍊 Bibit Mangga\n\nKetik:\n${usedPrefix}shop beli bibitmangga 500\n\n💡 *List Bibit*:\n- bibitmangga\n- bibitanggur\n- bibitpisang\n- bibitjeruk\n- bibitapel`);
    }

    // Cek waktu agar tidak menanam terlalu cepat
    if (new Date - global.db.data.users[m.sender].lastberkebon < timeout) {
        throw `⏳ *Anda sudah menanam sebelumnya!*\nMohon tunggu hasil panenmu 🍎\nTunggu selama ${msToTime(time - new Date())} lagi.`;
    }

    // Cek musim saat ini
    let musim = getSeason();
    
    // Cek kualitas tanah
    let soilQuality = getSoilQuality();

    // Cek perawatan tanaman
    let plantCare = getPlantCare();

    // Pastikan user memiliki cukup bibit untuk berkebun
    if (global.db.data.users[m.sender].bibitmangga > 499 && global.db.data.users[m.sender].bibitapel > 499 &&
        global.db.data.users[m.sender].bibitpisang > 499 && global.db.data.users[m.sender].bibitjeruk > 499 &&
        global.db.data.users[m.sender].bibitanggur > 499) {

        let pisangpoin = `${Math.floor(Math.random() * 500)}`.trim();
        let anggurpoin = `${Math.floor(Math.random() * 500)}`.trim();
        let manggapoin = `${Math.floor(Math.random() * 500)}`.trim();
        let jerukpoin = `${Math.floor(Math.random() * 500)}`.trim();
        let apelpoin = `${Math.floor(Math.random() * 500)}`.trim();

        // Acak efek perawatan tanaman (tanaman sehat atau sakit)
        let kondisiTanaman = getPlantHealth();

        // Tambahkan elemen musiman
        if (musim === 'summer') {
            if (pisangu > 0) pisangpoin = Math.floor(pisangpoin * 1.2); // Pisang tumbuh lebih cepat di musim panas
        } else if (musim === 'winter') {
            if (jeruku > 0) jerukpoin = Math.floor(jerukpoin * 1.2); // Jeruk lebih baik tumbuh di musim dingin
        }

        // Acak kejadian perawatan dan hama
        if (kondisiTanaman === 'sick') {
            pisangpoin = Math.max(0, pisangpoin - 100); // Tanaman sakit mempengaruhi hasil
            anggurpoin = Math.max(0, anggurpoin - 100);
            manggapoin = Math.max(0, manggapoin - 100);
            jerukpoin = Math.max(0, jerukpoin - 100);
            apelpoin = Math.max(0, apelpoin - 100);
            m.reply(`⚠️ *Perhatian!* Tanamanmu sedang sakit! 😷 Karena kurang perawatan, hasil panen berkurang.`);
        }

        // Tanaman yang dirawat dengan baik dan tanah yang subur akan memberikan hasil lebih baik
        if (soilQuality === 'fertile' && plantCare === 'excellent') {
            pisangpoin = Math.floor(pisangpoin * 1.5); // Tanaman tumbuh lebih baik dengan perawatan yang baik
            anggurpoin = Math.floor(anggurpoin * 1.5);
            manggapoin = Math.floor(manggapoin * 1.5);
            jerukpoin = Math.floor(jerukpoin * 1.5);
            apelpoin = Math.floor(apelpoin * 1.5);
            m.reply(`🌟 *Perawatan yang sangat baik!* Hasil panen meningkat! 🎉`);
        }

        // Update jumlah hasil tanaman dan bibit
        global.db.data.users[m.sender].pisang += pisangpoin * 1;
        global.db.data.users[m.sender].anggur += anggurpoin * 1;
        global.db.data.users[m.sender].mangga += manggapoin * 1;
        global.db.data.users[m.sender].jeruk += jerukpoin * 1;
        global.db.data.users[m.sender].apel += apelpoin * 1;
        global.db.data.users[m.sender].tiketcoin += 1;

        // Kurangi bibit yang digunakan untuk berkebun
        global.db.data.users[m.sender].bibitpisang -= 500;
        global.db.data.users[m.sender].bibitanggur -= 500;
        global.db.data.users[m.sender].bibitmangga -= 500;
        global.db.data.users[m.sender].bibitjeruk -= 500;
        global.db.data.users[m.sender].bibitapel -= 500;

        // Perbarui waktu agar user tidak bisa langsung berkebun lagi
        global.db.data.users[m.sender].lastberkebon = new Date * 1;

        // Kirim hasil panen ke user
        let hsl = `🎉 *Selamat ${conn.getName(m.sender)}!*\nKamu berhasil memanen hasil tanamanmu:\n🍌 +${pisangpoin} Pisang\n🍇 +${anggurpoin} Anggur\n🥭 +${manggapoin} Mangga\n🍊 +${jerukpoin} Jeruk\n🍏 +${apelpoin} Apel\n\n💰 +1 Tiket Coin untuk kamu!`;
        conn.reply(m.chat, hsl, m);

        // Notifikasi bahwa user bisa berkebun lagi
        setTimeout(() => {
            conn.reply(m.chat, `⏳ Waktunya Berkebun Lagi, Kak! 🌱`, m);
        }, timeout);
    } else {
        m.reply(`❌ Pastikan Bibit Kamu Mencapai *500* Untuk Bisa Berkebun 🌱`);
    }
}

handler.help = ['berkebun'];
handler.tags = ['rpg'];
handler.command = /^(berkebun)/i;

handler.group = true;
handler.limit = true;

export default handler;

// Fungsi untuk mengonversi durasi waktu ke format jam, menit, detik
function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + " Jam " + minutes + " Menit " + seconds + " Detik";
}

// Fungsi untuk menentukan musim berdasarkan waktu
function getSeason() {
    let month = new Date().getMonth();
    if (month >= 3 && month <= 8) {
        return 'summer'; // Musim panas
    } else {
        return 'winter'; // Musim dingin
    }
}

// Fungsi untuk menentukan kualitas tanah
function getSoilQuality() {
    let chance = Math.random();
    if (chance < 0.3) {
        return 'fertile'; // 30% tanah subur
    }
    return 'normal'; // 70% tanah biasa
}

// Fungsi untuk menentukan kondisi tanaman (sehat atau sakit)
function getPlantHealth() {
    let chance = Math.random();
    if (chance < 0.2) {
        return 'sick'; // 20% kemungkinan tanaman sakit
    }
    return 'healthy'; // 80% kemungkinan tanaman sehat
}

// Fungsi untuk menentukan tingkat perawatan tanaman
function getPlantCare() {
    let chance = Math.random();
    if (chance < 0.4) {
        return 'excellent'; // 40% kemungkinan perawatan sangat baik
    }
    return 'good'; // 60% kemungkinan perawatan baik
}
