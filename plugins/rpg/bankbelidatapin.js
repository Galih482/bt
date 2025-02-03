const Tio = async (m, { conn, command, args }) => {
    const sh = '`';
    let user = global.db.data.users[m.sender];
    let name = conn.getName(m.sender);

    // Pastikan data user memiliki struktur bank
    if (!user.bank) {
        user.bank = {
            level: 0,
            balance: 0,
            limit: 0,
            pin: null // Menambahkan PIN
        };
    }

    // Array untuk menyimpan PIN yang sudah digunakan
    if (!global.usedPins) {
        global.usedPins = [];
    }

    switch (command) {
        case 'bank':
    // Buat struktur sesi autentikasi jika belum ada
    if (!global.authSessions) {
        global.authSessions = {};
    }

    // Cek apakah pengguna sudah dalam sesi aktif
    if (global.authSessions[m.sender] && global.authSessions[m.sender].expires > Date.now()) {
        // Sesi masih aktif, tampilkan sisa waktu sesi dan informasi bank
        let remainingTime = global.authSessions[m.sender].expires - Date.now();
        let hours = Math.floor(remainingTime / (1000 * 60 * 60));
        let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));

        let sessionInfo = `Sesi autentikasi masih aktif! Kamu dapat menggunakan perintah *.bank* tanpa PIN untuk sisa waktu: ${hours} jam ${minutes} menit.`;
        showBank(m, conn, user, name);
        conn.reply(m.chat, sessionInfo, m);
    } else {
        // Sesi tidak aktif, validasi PIN
        if (!user.bank.pin) {
            conn.reply(m.chat, `🔒 Kamu belum mengatur PIN. Gunakan perintah *setpin <PIN>* untuk mengatur.`, m);
        } else if (!args[0]) {
            conn.reply(m.chat, `🔑 Masukkan PIN untuk melihat informasi bank\n\nContoh : .bank 53835`, m);
        } else {
            // Validasi PIN yang dimasukkan
            if (args[0] === user.bank.pin) {
                // Buat sesi baru dengan durasi 12 jam
                global.authSessions[m.sender] = {
                    expires: Date.now() + 12 * 60 * 60 * 1000 // 12 jam
                };

                // Tampilkan informasi bank
                showBank(m, conn, user, name);
                conn.reply(m.chat, `✅ Sesi autentikasi berhasil! Kamu dapat menggunakan perintah *.bank* tanpa PIN selama 12 jam.`, m);
            } else {
                conn.reply(m.chat, `❌ PIN yang kamu masukkan salah. Silakan coba lagi.`, m);
            }
        }
    }
    break;

        case 'createbank':
            if (user.bank.level > 0) {
                conn.reply(m.chat, `🏦 Kamu sudah memiliki rekening bank!`, m);
            } else {
                user.bank.level = 1;
                user.bank.limit = 1000000; // Limit awal Rp 1.000.000
                conn.reply(m.chat, `🎉 Rekening bank berhasil dibuat dengan limit awal ${toRupiah(user.bank.limit)}!`, m);
            }
            break;

        case 'hapusbank':
            if (user.bank.level === 0) {
                conn.reply(m.chat, `🚫 Kamu belum memiliki rekening bank untuk dihapus.`, m);
            } else {
                // Hapus PIN dari daftar jika ada
                const index = global.usedPins.indexOf(user.bank.pin);
                if (index > -1) {
                    global.usedPins.splice(index, 1);
                }
                user.bank = { level: 0, balance: 0, limit: 0, pin: null };
                conn.reply(m.chat, `🗑️ Rekening bank kamu telah dihapus.`, m);
            }
            break;

        case 'nabung':
            if (user.bank.level === 0) {
                conn.reply(m.chat, `🏦 Kamu belum memiliki rekening bank. Gunakan perintah *createbank* untuk membuat.`, m);
            } else if (!args[0] || isNaN(args[0]) || parseInt(args[0]) <= 0) {
                conn.reply(m.chat, `💵 Gunakan format *nabung <jumlah>* untuk menabung.`, m);
            } else {
                let amount = parseInt(args[0]);
                if (user.money < amount) {
                    conn.reply(m.chat, `❌ Uang kamu tidak cukup untuk menabung ${toRupiah(amount)}.`, m);
                } else if (user.bank.balance + amount > user.bank.limit) {
                    conn.reply(m.chat, `⚠️ Saldo bank kamu akan melebihi limit. Upgrade bank terlebih dahulu untuk meningkatkan limit.`, m);
                } else {
                    user.money -= amount;
                    user.bank.balance += amount;
                    conn.reply(m.chat, `✅ Berhasil menabung ${toRupiah(amount)}. Saldo bank saat ini: ${toRupiah(user.bank.balance)}.`, m);
                }
            }
            break;

        case 'tarik':
            if (user.bank.level === 0) {
                conn.reply(m.chat, `🏦 Kamu belum memiliki rekening bank. Gunakan perintah *createbank* untuk membuat.`, m);
            } else if (!args[0] || isNaN(args[0]) || parseInt(args[0]) <= 0) {
                conn.reply(m.chat, `💵 Gunakan format *tarik <jumlah>* untuk menarik uang.`, m);
            } else {
                let amount = parseInt(args[0]);
                if (user.bank.balance < amount) {
                    conn.reply(m.chat, `❌ Saldo bank tidak cukup untuk menarik ${toRupiah(amount)}.`, m);
                } else {
                    user.bank.balance -= amount;
                    user.money += amount;
                    conn.reply(m.chat, `✅ Berhasil menarik ${toRupiah(amount)}. Sisa saldo bank: ${toRupiah(user.bank.balance)}.`, m);
                }
            }
            break;

        case 'upgradebank':
            if (user.bank.level === 0) {
                conn.reply(m.chat, `🏦 Kamu belum memiliki rekening bank. Gunakan perintah *createbank* untuk membuat.`, m);
            } else if (user.money < 1000000) {
                conn.reply(m.chat, `❌ Uang kamu tidak cukup untuk upgrade bank. Dibutuhkan Rp 1.000.000.`, m);
            } else {
                user.money -= 1000000;
                user.bank.level += 1;
                user.bank.limit *= 2; 
                conn.reply(m.chat, `🚀 Berhasil meng-upgrade bank ke level ${user.bank.level}. Limit saldo sekarang: ${toRupiah(user.bank.limit)}.`, m);
            }
            break;

        case 'setpin':
            if (!args[0] || args[0].length < 4 || isNaN(args[0])) {
                conn.reply(m.chat, `⚠️ Format salah\nGunakan format *.setpin <PIN>* (minimal 4 digit dan hanya angka).\n\n${sh}📌 Contoh : .setpin 63926${sh}`, m);
            } else if (global.usedPins.includes(args[0])) {
                conn.reply(m.chat, `❌ PIN ini sudah digunakan oleh pengguna lain. Silakan pilih PIN yang berbeda.`, m);
            } else {
                // Tambahkan PIN ke daftar PIN yang digunakan
                if (user.bank.pin) {
                    // Jika pengguna sudah memiliki PIN, hapus dari daftar
                    const index = global.usedPins.indexOf(user.bank.pin);
                    if (index > -1) {
                        global.usedPins.splice(index, 1);
                    }
                }
                user.bank.pin = args[0];
                global.usedPins.push(args[0]); // Simpan PIN baru
                conn.reply(m.chat, `✅ PIN Berhasil Diubah !\n\n🔒 PIN Baru Anda : ★★★★★\n\n⚠️ Peringatan\n- Jangan pernah bagikan PIN Anda kepada siapapun !\n- Selalu waspada terhadap serangan hacker !\n\n🛠️ Untuk memeriksa PIN Anda \n${sh}.mypin${sh}\n\n> Bank Security`, m);
            }
            break;

        case 'gantipin':
            if (!user.bank.pin) {
                conn.reply(m.chat, `🔒 Kamu belum mengatur PIN. Gunakan perintah *setpin <PIN>* untuk mengatur.`, m);
            } else if (!args[0] || args[0].length < 4 || isNaN(args[0])) {
                conn.reply(m.chat, `⚠️ Gunakan format *gantipin <PIN baru>* (minimal 4 digit dan hanya angka).`, m);
            } else if (global.usedPins.includes(args[0])) {
                conn.reply(m.chat, `❌ PIN ini sudah digunakan oleh pengguna lain. Silakan pilih PIN yang berbeda.`, m);
            } else {
                // Hapus PIN lama dari daftar
                const index = global.usedPins.indexOf(user.bank.pin);
                if (index > -1) {
                    global.usedPins.splice(index, 1);
                }
                user.bank.pin = args[0];
                global.usedPins.push(args[0]); // Simpan PIN baru
                conn.reply(m.chat, `✅ PIN berhasil diganti!`, m);
            }
            break;

        case 'mypin':
            if (!user.bank.pin) {
                conn.reply(m.chat, `🔒 Kamu belum mengatur PIN.`, m);
            } else {
                conn.reply(m.chat, `*📝 INFORMASI - PIN !*\n\n🔒 PIN Anda : ${user.bank.pin}\n\n⚠️ Peringatan\n- Jangan pernah bagikan PIN Anda kepada siapapun !\n- Selalu waspada terhadap serangan hacker !\n\n🛠️ Ingin Mengubah PIN?\n${sh}.setpin${sh}\n\n📌 Tetaplah menjaga keamanan data pribadi Anda!\n\n> Bank Security`, m);
            }
            break;

        case 'antihack':
    // Cek apakah pengguna sudah memiliki proteksi antihack aktif
    if (user.antihack && user.antihack.active) {
        let remainingTime = user.antihack.expiry - Date.now();
        if (remainingTime > 0) {
            let hours = Math.floor(remainingTime / (1000 * 60 * 60));
            let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
            conn.reply(m.chat, `⚠️ Kamu sudah memiliki proteksi antihack aktif. Proteksi ini akan berakhir dalam ${hours} jam ${minutes} menit ${seconds} detik.`, m);
            break;
        } else {
            // Jika proteksi sudah kadaluarsa, reset status dan waktu proteksi
            user.antihack.active = false;
        }
    }

    // Cek apakah pengguna memiliki saldo yang cukup
    if (user.bank.balance < 85000) {
        conn.reply(m.chat, `❌ Saldo bank kamu tidak cukup untuk membeli proteksi antihack. Dibutuhkan Rp 85.000,00.`, m);
        break;
    }

    // Mengurangi saldo bank pengguna
    user.bank.balance -= 85000;

    // Aktifkan proteksi antihack selama 24 jam
    user.antihack = {
        active: true,
        expiry: Date.now() + (24 * 60 * 60 * 1000) // Waktu aktif selama 24 jam
    };

    conn.reply(m.chat, `✅ Proteksi antihack berhasil diaktifkan! Kamu dilindungi dari hack bank selama 24 jam ke depan\n\nHarga dari AntiHack : Rp 85.000,00.`, m);
    break;

case 'belidata':
    // Cek apakah pengguna memiliki saldo yang cukup
    if (user.bank.balance < 50000) {
        conn.reply(m.chat, `❌ Saldo bank kamu tidak cukup untuk membeli data. Dibutuhkan Rp 50.000.`, m);
        break;
    }

    // Mengurangi saldo bank pengguna
    user.bank.balance -= 50000;

    // Mengambil semua pengguna dari database yang memenuhi syarat
    let eligibleUsers = Object.keys(global.db.data.users).filter((u) => {
        let targetUser = global.db.data.users[u];
        return (
            u !== m.sender &&
            targetUser.bank && // Pastikan `bank` ada
            targetUser.bank.level > 0 &&
            targetUser.bank.pin // Pastikan PIN ada dan bukan null
        );
    });

    if (eligibleUsers.length === 0) {
        conn.reply(m.chat, `🚫 Tidak ada pengguna lain yang memenuhi syarat untuk diambil datanya.`, m);
        break;
    }

    // Memilih hingga 5 pengguna secara acak
    let selectedUsers = [];
    for (let i = 0; i < Math.min(5, eligibleUsers.length); i++) {
        let randomIndex = Math.floor(Math.random() * eligibleUsers.length);
        let randomUserId = eligibleUsers[randomIndex];
        selectedUsers.push(randomUserId);
        // Menghapus pengguna yang sudah dipilih dari daftar eligibleUsers
        eligibleUsers.splice(randomIndex, 1);
    }

    // Menampilkan informasi untuk setiap pengguna yang dipilih
    let info = `*📊 INFORMASI AKUN BANK*\n\n`;
    let nomor = 1; // Inisialisasi nomor urut
    let mentions = []; // Untuk menyimpan pengguna yang akan ditandai
    for (let userId of selectedUsers) {
        let targetUser = global.db.data.users[userId];
        
        // Menghapus @s.whatsapp.net dari userId
        let cleanUserId = userId.replace(/@s\.whatsapp\.net$/, '');

        // Tambahkan validasi properti `bank` sebelum akses
        if (targetUser.bank) {
            info += `*${nomor}. 🪪 Nama Pengguna:* ${cleanUserId}\n`;
            info += `   *🎀 Level Bank:* ${targetUser.bank.level > 0 ? 'Level ' + targetUser.bank.level : 'Tidak Punya'}\n`;
            info += `   *💰 Saldo Bank:* ${toRupiah(targetUser.bank.balance)}\n`;
            info += `   *🔐 PIN:* ${targetUser.bank.pin || 'Tidak diketahui'}\n`;

            // Menambahkan informasi proteksi antihack jika ada
            if (targetUser.antihack && targetUser.antihack.active) {
                let remainingTime = targetUser.antihack.expiry - Date.now();
                if (remainingTime > 0) {
                    let hours = Math.floor(remainingTime / (1000 * 60 * 60));
                    let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
                    let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
                    info += `   *🛡️ Proteksi Antihack:* Aktif\n   *⏳ Sisa Waktu:* ${hours} jam ${minutes} menit ${seconds} detik\n`;
                } else {
                    info += `   *🛡️ Proteksi Antihack:* Kadaluarsa\n`;
                    targetUser.antihack.active = false; // Nonaktifkan proteksi jika waktu habis
                }
            } else {
                info += `   *🛡️ Proteksi Antihack:* Tidak Aktif\n`;
            }
            
            info += `\n`;
            nomor++; // Increment nomor urut
            mentions.push(userId); // Tambahkan pengguna ke daftar mention
        }
    }

    conn.reply(m.chat, info, m, { mentions });
    break;

case 'hackbank':
    if (args.length < 2) {
        conn.reply(m.chat, `⚠️ Gunakan format *hackbank <targetUser Id> <PIN>* untuk mencoba mengakses bank pengguna lain.\n\nContoh: .hackbank 6281234567890 1234`, m);
        break;
    }

    let targetId = args[0]; // ID target yang dimasukkan
    let inputPin = args[1]; // PIN target yang dimasukkan pengguna
    let targetUser = global.db.data.users[targetId + '@s.whatsapp.net']; // Ambil data pengguna target berdasarkan ID yang benar

    // Validasi apakah target valid dan memiliki akun bank
    if (!targetUser || !targetUser.bank || targetUser.bank.level === 0 || !targetUser.bank.pin) {
        conn.reply(m.chat, `🚫 Target tidak valid atau tidak memiliki akun bank yang bisa dihack.`, m);
        break;
    }

    // Memeriksa apakah target memiliki proteksi antihack aktif
    if (targetUser.antihack && targetUser.antihack.active) {
        // Jika proteksi antihack aktif pada target, hack gagal
        let deduction = Math.floor(user.bank.balance * 0.05); // Mengurangi 5% dari saldo pengguna yang mencoba hack
        user.bank.balance -= deduction;

        conn.reply(m.chat, `❌ Hack gagal! Target memiliki proteksi antihack yang aktif. Kamu kehilangan ${toRupiah(deduction)} karena gagal melakukan hack.`, m);
        break;
    }

    // Validasi PIN
    if (inputPin !== targetUser.bank.pin) {
        // Jika hack gagal, kurangi saldo pengguna yang mencoba hack
        let deduction = Math.floor(user.bank.balance * 0.05); // Mengurangi 5% dari saldo pengguna
        user.bank.balance -= deduction;

        conn.reply(m.chat, `❌ PIN yang kamu masukkan salah. Hack gagal! Kamu kehilangan ${toRupiah(deduction)} karena gagal melakukan hack.`, m);
        break;
    }

    // Peluang keberhasilan (50%)
    let success = Math.random() < 0.5;

    if (!success) {
        // Jika hack gagal, kurangi saldo pengguna yang mencoba hack
        let deduction = Math.floor(user.bank.balance * 0.05); // Mengurangi 5% dari saldo pengguna
        user.bank.balance -= deduction;

        conn.reply(m.chat, `🚫 Hack gagal! Target berhasil melindungi akunnya. Kamu kehilangan ${toRupiah(deduction)} karena gagal melakukan hack.`, m);
    } else {
        // Jumlah uang yang dicuri (35% dari saldo target)
        let stolenAmount = Math.floor(targetUser.bank.balance * 0.35);

        if (stolenAmount <= 0) {
            conn.reply(m.chat, `🚫 Saldo bank target kosong atau terlalu sedikit untuk dihack.`, m);
        } else {
            // Transfer uang dari target ke pengguna yang melakukan hack
            targetUser.bank.balance -= stolenAmount;
            user.bank.balance = (user.bank.balance || 0) + stolenAmount;

            conn.reply(
                m.chat,
                `*✅ Hack Berhasil!*\n\nKamu berhasil mencuri saldo bank dari pengguna *${targetId}*.\n\n*💰 Jumlah yang dicuri:* ${toRupiah(stolenAmount)}\n*🔐 Sisa Saldo Target:* ${toRupiah(targetUser.bank.balance)}\n\n⚠️ Hati-hati, pengguna ini mungkin akan membalas hack!`,
                m
            );
        }
    }
    break;

default:
    conn.reply(m.chat, `❓ Perintah tidak ditemukan.`, m);
    break;
    }
}

Tio.help = ['bank <PIN>', 'createbank', 'hapusbank', 'nabung <jumlah>', 'tarik <jumlah>', 'upgradebank', 'setpin <PIN>', 'gantipin <PIN baru>', 'mypin', 'belidata', 'hackbank', 'antihack'];
Tio.tags = ['rpg'];
Tio.command = /^(bank|createbank|hapusbank|nabung|tarik|upgradebank|setpin|gantipin|mypin|belidata|hackbank|antihack)$/i;

Tio.register = false;
export default Tio;

function showBank(m, conn, user, name) {
    let bank = user.bank;

    // Periksa proteksi antihack
    let antihackInfo = '';
    if (user.antihack && user.antihack.active) {
        let remainingAntihackTime = user.antihack.expiry - Date.now();
        if (remainingAntihackTime > 0) {
            let antihackHours = Math.floor(remainingAntihackTime / (1000 * 60 * 60));
            let antihackMinutes = Math.floor((remainingAntihackTime % (1000 * 60 * 60)) / (1000 * 60));
            let antihackSeconds = Math.floor((remainingAntihackTime % (1000 * 60)) / 1000);
            antihackInfo = `\n│ *🛡️ Proteksi Antihack:* Aktif\n└ *⏳ Sisa Waktu:* ${antihackHours} jam ${antihackMinutes} menit ${antihackSeconds} detik`;
        } else {
            user.antihack.active = false; // Nonaktifkan jika waktu habis
        }
    }

    // Buat caption
    let caption = `*▣ ｢ B A N K - U S E R 🏦 ｣*

┌ *🪪 Nama :* ${user.registered ? user.name : name}
│ *🎀 Level Bank :* ${bank.level > 0 ? 'Level ' + bank.level : 'Tidak Punya'}
│ *💰 Saldo Bank :* Rp ${toRupiah(bank.balance)}
│ *💳 Limit Saldo :* Rp ${toRupiah(bank.limit)}
│ *🔐 PIN :* ${bank.pin ? 'Sudah diatur' : 'Belum diatur'}${antihackInfo}`;

    conn.reply(m.chat, caption, m);
}

function toRupiah(amount) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
}
