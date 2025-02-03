let Tio = async (m, { conn, command, args }) => {
    let user = global.db.data.users[m.sender]
    let name = conn.getName(m.sender)

    if (!user.masinis) {
        user.masinis = {
            license: false,
            tripCount: 0,
            stations: [],
            earnings: 0,
            currentTrain: null,
            fuel: 100,
            stress: 0, // Hapus kelelahan
        }
    }

    switch (command) {
        case 'masinis':
            showMasinisStatus(m, conn, user, name)
            break

        case 'buatsimmasinis':
            if (user.masinis.license) {
                conn.reply(m.chat, `🎉 Kamu sudah memiliki SIM Masinis!`, m)
            } else if (user.money < 300000) {
                conn.reply(m.chat, `💸 Uang kamu tidak cukup untuk membuat SIM Masinis. Dibutuhkan Rp 300.000.`, m)
            } else {
                user.money -= 300000
                user.masinis.license = true
                conn.reply(m.chat, `✨ Selamat! Kamu berhasil membuat SIM Masinis dan siap menjalankan kereta. 🚂`, m)
            }
            break

        case 'perjalanan':
            if (!user.masinis.license) {
                conn.reply(m.chat, `🚫 Kamu belum memiliki SIM Masinis. Gunakan perintah *buatSIMmasinis* untuk membuat.`, m)
            } else if (!user.masinis.currentTrain) {
                conn.reply(m.chat, `🚆 Kamu belum memiliki kereta. Gunakan *kereta beli <nama_kereta>* untuk membeli.`, m)
            } else if (user.masinis.fuel < 20) {
                conn.reply(m.chat, `⛽ Bahan bakar kereta tidak cukup. Isi ulang bahan bakar sebelum melakukan perjalanan.`, m)
            } else {
                let stations = [
                    { name: 'Stasiun Gambir', duration: 2, reward: 10000 },
                    { name: 'Stasiun Bandung', duration: 4, reward: 20000 },
                    { name: 'Stasiun Surabaya', duration: 6, reward: 30000 },
                    { name: 'Stasiun Medan', duration: 8, reward: 40000 },
                    { name: 'Stasiun Yogyakarta', duration: 5, reward: 25000 },
                    { name: 'Stasiun Semarang', duration: 3, reward: 15000 },
                    { name: 'Stasiun Malang', duration: 7, reward: 35000 },
                ]
                let station = stations[Math.floor(Math.random() * stations.length)]

                // Kondisi cuaca yang mempengaruhi perjalanan
                let weatherConditions = [
                    { condition: 'Cerah', fuelEffect: 0, durationEffect: 0, message: '🌞 Cuaca cerah, perjalanan lancar.' },
                    { condition: 'Hujan', fuelEffect: -10, durationEffect: 1, message: '🌧️ Hujan deras, perjalanan sedikit terhambat.' },
                    { condition: 'Badai', fuelEffect: -20, durationEffect: 2, message: '🌪️ Badai hebat, perjalanan menjadi lebih lama.' },
                    { condition: 'Kabut', fuelEffect: -5, durationEffect: 1, message: '🌫️ Kabut tebal, hati-hati di perjalanan.' }
                ]
                let weather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)]

                // Kejadian acak selama perjalanan
                let risks = [
                    { message: '⏱️ Kereta terlambat sedikit, perjalanan berjalan baik.', effect: 0 },
                    { message: '💸 Penumpang memberikan bonus tips.', effect: 5000 },
                    { message: '🔧 Kerusakan kecil, biaya perbaikan dibutuhkan.', effect: -5000 },
                    { message: `🌧️ Cuaca buruk: ${weather.message}`, effect: weather.fuelEffect },
                    { message: '✅ Perjalanan berjalan lancar tanpa kendala.', effect: 0 },
                ]
                let risk = risks[Math.floor(Math.random() * risks.length)]

                let fuelCost = (station.duration + weather.durationEffect) * 5 // Mengurangi bahan bakar sesuai durasi dan cuaca
                user.masinis.fuel -= fuelCost

                // Menunggu perjalanan
                let key = await conn.sendMessage(m.chat, { text: '🚂 Menjalankan kereta...' }, { quoted: m })
                await delay((station.duration + weather.durationEffect) * 1000) // Delay sesuai durasi perjalanan dalam detik

                // Memperbarui data setelah perjalanan
                user.money += station.reward + risk.effect
                user.masinis.tripCount += 1
                user.masinis.stations.push(station.name)
                user.masinis.earnings += station.reward

                let message = `
🚂 *Perjalanan Selesai!*
🚉 Stasiun Tujuan: ${station.name}
⏳ Durasi: ${station.duration + weather.durationEffect} jam
🎉 Hasil: ${risk.message}
💰 Pendapatan: Rp ${toRupiah(station.reward + risk.effect)}
⛽ Bahan Bakar Tersisa: ${user.masinis.fuel}%
💸 Total Pendapatan: Rp ${toRupiah(user.masinis.earnings)}
`.trim()

                conn.sendMessage(m.chat, { text: message, edit: key.key }, { quoted: m })
            }
            break

        case 'kereta':
            let trains = {
                'Commuter': { price: 1000000, fuelEfficiency: 5, durability: 100 },
                'LRT': { price: 3000000, fuelEfficiency: 7, durability: 95 },
                'MRT': { price: 5000000, fuelEfficiency: 10, durability: 90 },
                'KRL': { price: 8000000, fuelEfficiency: 12, durability: 85 },
                'Shinkansen': { price: 12000000, fuelEfficiency: 15, durability: 80 },
            }

            if (args[0] === 'beli') {
                let train = args[1]
                if (!train || !trains[train]) {
                    conn.reply(
                        m.chat,
                        `Gunakan format *kereta beli <nama_kereta>*.\nKereta tersedia: ${Object.keys(trains).join(', ')}.`,
                        m
                    )
                } else if (user.money < trains[train].price) {
                    conn.reply(
                        m.chat,
                        `💸 Uang kamu tidak cukup untuk membeli kereta ${train}. Harga: Rp ${toRupiah(trains[train].price)}.`,
                        m
                    )
                } else {
                    user.money -= trains[train].price
                    user.masinis.currentTrain = train
                    conn.reply(m.chat, `🎉 Selamat! Kamu berhasil membeli kereta ${train}.`, m)
                }
            } else {
                let trainInfo = user.masinis.currentTrain
                    ? `🚆 Kereta Aktif: ${user.masinis.currentTrain}`
                    : '🚫 Kamu belum memiliki kereta. Gunakan *kereta beli <nama_kereta>* untuk membeli.'

                conn.reply(m.chat, trainInfo, m)
            }
            break

        case 'isibbmkereta':
            if (!user.masinis.currentTrain) {
                conn.reply(m.chat, `🚫 Kamu belum memiliki kereta untuk mengisi bahan bakar.`, m)
            } else if (user.money < 10000) {
                conn.reply(m.chat, `💸 Uang kamu tidak cukup untuk membeli bahan bakar.`, m)
            } else {
                user.money -= 10000
                user.masinis.fuel = 100
                conn.reply(m.chat, `⛽ Bahan bakar kereta berhasil diisi penuh.`, m)
            }
            break

        default:
            conn.reply(m.chat, `❌ Perintah tidak ditemukan.`, m)
            break
    }
}

Tio.help = ['masinis', 'buatSIMmasinis', 'perjalanan', 'kereta beli <nama_kereta>', 'isiBBMkereta']
Tio.tags = ['rpg']
Tio.command = /^(masinis|buatsimmasinis|perjalanan|kereta|isibbmkereta)$/i

Tio.register = false
export default Tio

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function showMasinisStatus(m, conn, user, name) {
    let masinis = user.masinis
    let caption = `
🚂 *Status Masinis*
👤 Nama: ${user.registered ? user.name : name}
✅ SIM Masinis: ${masinis.license ? 'Dimiliki' : 'Tidak Dimiliki'}
📊 Jumlah Perjalanan: ${masinis.tripCount}
💰 Total Pendapatan: Rp ${toRupiah(masinis.earnings)}
🚆 Kereta Aktif: ${masinis.currentTrain || 'Belum Memiliki'}
🗺️ Stasiun Dikunjungi: ${masinis.stations.length > 0 ? masinis.stations.join(', ') : 'Belum Ada'}
⛽ Bahan Bakar: ${masinis.fuel}%
`.trim()

    conn.reply(m.chat, caption, m)
}

function toRupiah(angka) {
    let reverse = angka.toString().split('').reverse().join('')
    let ribuan = reverse.match(/\d{1,3}/g)
    ribuan = ribuan.join('.').split('').reverse().join('')
    return ribuan
}
