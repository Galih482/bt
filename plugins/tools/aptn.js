import fetch from 'node-fetch';
import fs from 'fs';

const CACHE_FILE = './cacheResults.json';

// Membaca cache dari file saat startup
let cacheResults = {};
if (fs.existsSync(CACHE_FILE)) {
    cacheResults = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
}

// Simpan cache ke file
const saveCache = () => {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cacheResults, null, 2));
};

let Tio = async (m, { conn, text, usedPrefix, command }) => {
    try {
        if (!text) {
            return m.reply(await Func.exam(usedPrefix, command, '6282285357xx atau nomor urut PTN'));
        }

        const input = text.trim();
        let url, type;

        if (/^\d+$/.test(input)) {
            // Jika input hanya angka, bisa berarti dua hal:
            // 1. Nomor urut hasil pencarian sebelumnya
            // 2. Nomor telepon baru
            if (cacheResults[m.sender]?.telepon) {
                const index = parseInt(input) - 1;
                if (index >= 0 && index < cacheResults[m.sender].telepon.length) {
                    // Jika index valid, ambil NIK dari hasil sebelumnya
                    const nik = cacheResults[m.sender].telepon[index].Passport;
                    url = `https://api.vreden.web.id/api/bpjs?nik=${nik}`;
                    type = "Paspor (NIK)";
                } else {
                    // Jika tidak valid, anggap input sebagai nomor telepon baru
                    url = `http://64.235.43.190/request/leaks.php?request=${input}`;
                    type = "Nomor Telepon";
                }
            } else {
                // Jika tidak ada cache sebelumnya, anggap input sebagai nomor telepon
                url = `http://64.235.43.190/request/leaks.php?request=${input}`;
                type = "Nomor Telepon";
            }
        } else if (/^\d{16}$/.test(input)) {
            url = `https://api.vreden.web.id/api/bpjs?nik=${input}`;
            type = "Paspor (NIK)";
        } else if (/^\d{9,15}$/.test(input)) {
            url = `http://64.235.43.190/request/leaks.php?request=${input}`;
            type = "Nomor Telepon";
        } else {
            return m.reply("❌ Format input tidak valid. Masukkan nomor telepon (9-15 digit), NIK (16 digit), atau nomor urut PTN.");
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            return m.reply(`❌ Error: Gagal mengambil data. Status: ${response.status}`);
        }

        const result = await response.json();

        if (type === "Nomor Telepon") {
            if (result?.List?.["KomInfo Indonesia"]?.Data?.length > 0) {
                const data = result.List["KomInfo Indonesia"].Data;

                // Perbarui cache hasil nomor telepon tanpa menghapus data sebelumnya
                if (!cacheResults[m.sender]) cacheResults[m.sender] = {};
                cacheResults[m.sender].telepon = data;
                saveCache();

                let caption = `✅ *Hasil Pencarian Nomor Telepon* ✅\n\n`;
                data.forEach((item, index) => {
                    caption += `📌 *Data Ke-${index + 1}*\n` +
                        `🔹 *Passport (NIK)*: ${item.Passport}\n` +
                        `🔹 *Phone*: ${item.Phone}\n` +
                        `🔹 *Provider*: ${item.Provider}\n` +
                        `🔹 *Tanggal Registrasi*: ${item.RegDate}\n\n`;
                });

                caption += `➡️ *Gunakan perintah .ptn <nomor urut>* untuk mencari paspor berdasarkan hasil di atas.`;
                return m.reply(caption);
            } else {
                return m.reply(`❌ Data tidak ditemukan untuk nomor telepon: ${input}`);
            }
        } else if (type === "Paspor (NIK)") {
            if (result?.result) {
                const data = result.result;
                let caption = `✅ *Hasil Pencarian Paspor* ✅\n\n` +
                    `🔢 *NIK*: ${data.nik.replace(/\n/g, '')}\n` +
                    `🔹 *Jenis Kelamin*: ${data.jk}\n` +
                    `🔹 *Tanggal Lahir*: ${data.tgl}\n` +
                    `🔹 *Kecamatan*: ${data.kec}\n` +
                    `🔹 *Kabupaten/Kota*: ${data.kab}\n` +
                    `🔹 *Provinsi*: ${data.prov}\n` +
                    `🔹 *Sumber Data*: ${data.source}\n` +
                    `🔹 *Terakhir Diperbarui*: ${data.modified_time}\n\n`;

                // Simpan hasil pencarian NIK di cache tanpa menghapus hasil pencarian nomor telepon
                if (!cacheResults[m.sender]) cacheResults[m.sender] = {};
                cacheResults[m.sender].nik = data;
                saveCache();

                return m.reply(caption);
            } else {
                return m.reply(`❌ Data tidak ditemukan untuk paspor (NIK).`);
            }
        }
    } catch (e) {
        console.error(e);
        m.reply('❌ Terjadi kesalahan saat memproses permintaan Anda.');
    }
};

Tio.help = ['ptn'];
Tio.tags = ['tools'];
Tio.command = /^(ptn)$/i;
Tio.premium = true;

export default Tio;