/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

let Tio = async (m, { conn, command, args }) => {
    let user = global.db.data.users[m.sender]
    let name = conn.getName(m.sender)

    if (!user.pilot) {
        user.pilot = {
            license: false,
            flightCount: 0,
            destinations: [],
            earnings: 0,
            currentPlane: null,
            fuel: 100,
        }
    }

    switch (command) {
        case 'pilot':
            showPilotStatus(m, conn, user, name)
            break

        case 'buatsim':
            if (user.pilot.license) {
                conn.reply(m.chat, `Kamu sudah memiliki SIM Pilot!`, m)
            } else if (user.money < 500000) {
                conn.reply(m.chat, `Uang kamu tidak cukup untuk membuat SIM Pilot. Dibutuhkan Rp 500.000.`, m)
            } else {
                user.money -= 500000
                user.pilot.license = true
                conn.reply(m.chat, `Selamat! Kamu berhasil membuat SIM Pilot dan siap memulai karirmu di dunia penerbangan.`, m)
            }
            break

        case 'penerbangan':
            if (!user.pilot.license) {
                conn.reply(m.chat, `Kamu belum memiliki SIM Pilot. Gunakan perintah *buatSIM* untuk membuat.`, m)
            } else if (!user.pilot.currentPlane) {
                conn.reply(m.chat, `Kamu belum memiliki pesawat. Gunakan *pesawat beli <nama_pesawat>* untuk membeli.`, m)
            } else if (user.pilot.fuel < 20) {
                conn.reply(m.chat, `Bahan bakar pesawat tidak cukup. Isi ulang bahan bakar sebelum melakukan penerbangan.`, m)
            } else {
                let destinations = [
                    { name: 'Jakarta', duration: 2, reward: 15000 },
                    { name: 'Tokyo', duration: 6, reward: 30000 },
                    { name: 'New York', duration: 12, reward: 50000 },
                    { name: 'Dubai', duration: 8, reward: 40000 },
                    { name: 'Paris', duration: 10, reward: 45000 },
                    { name: 'London', duration: 11, reward: 47000 },
                    { name: 'Singapore', duration: 3, reward: 20000 },
                    { name: 'Sydney', duration: 9, reward: 42000 },
                    { name: 'Seoul', duration: 7, reward: 35000 },
                    { name: 'Cape Town', duration: 13, reward: 55000 },
                ]
                let destination = destinations[Math.floor(Math.random() * destinations.length)]
                let risks = [
                    { message: 'Turbulensi ringan, perjalanan sedikit terhambat.', effect: 0 },
                    { message: 'Penumpang memberikan bonus tips.', effect: 5000 },
                    { message: 'Kerusakan kecil di mesin, biaya perbaikan dibutuhkan.', effect: -5000 },
                    { message: 'Cuaca buruk, membutuhkan tambahan bahan bakar.', effect: -2000 },
                    { message: 'Perjalanan berjalan lancar tanpa kendala.', effect: 0 },
                ]
                let risk = risks[Math.floor(Math.random() * risks.length)]

                let fuelCost = destination.duration * 10 // Mengurangi bahan bakar sesuai durasi
                user.pilot.fuel -= fuelCost

                // Delay penerbangan
                let key = await conn.sendMessage(m.chat, { text: '✈️ Menerbangkan pesawat...' }, { quoted: m })
                await delay(destination.duration * 1000) // Delay sesuai durasi penerbangan dalam detik

                // Update data setelah delay
                user.money += destination.reward + risk.effect
                user.pilot.flightCount += 1
                user.pilot.destinations.push(destination.name)
                user.pilot.earnings += destination.reward

                let message = `
✈️ **Penerbangan Selesai!**
Destinasi: ${destination.name}
Durasi: ${destination.duration} jam
Hasil: ${risk.message}
Pendapatan: Rp ${toRupiah(destination.reward + risk.effect)}
Bahan Bakar Tersisa: ${user.pilot.fuel}%
Total Pendapatan: Rp ${toRupiah(user.pilot.earnings)}
`.trim()

                conn.sendMessage(m.chat, { text: message, edit: key.key }, { quoted: m })
            }
            break

        case 'pesawat':
            let planes = {
                'Cessna': { price: 1000000, fuelEfficiency: 5 },
                'Boeing': { price: 5000000, fuelEfficiency: 8 },
                'Airbus': { price: 10000000, fuelEfficiency: 10 },
                'Gulfstream': { price: 15000000, fuelEfficiency: 12 },
                'Concorde': { price: 20000000, fuelEfficiency: 15 },
            }

            if (args[0] === 'beli') {
                let plane = args[1]
                if (!plane || !planes[plane]) {
                    conn.reply(
                        m.chat,
                        `Gunakan format *pesawat beli <nama_pesawat>*.\nPesawat tersedia:\n- ${Object.keys(planes).join('\n- ')}.`,
                        m
                    )
                } else if (user.money < planes[plane].price) {
                    conn.reply(
                        m.chat,
                        `Uang kamu tidak cukup untuk membeli pesawat ${plane}. Harga: Rp ${toRupiah(planes[plane].price)}.`,
                        m
                    )
                } else {
                    user.money -= planes[plane].price
                    user.pilot.currentPlane = plane
                    conn.reply(m.chat, `Selamat! Kamu berhasil membeli pesawat ${plane}.`, m)
                }
            } else {
                let planeInfo = user.pilot.currentPlane
                    ? `Pesawat Aktif: ${user.pilot.currentPlane}`
                    : 'Kamu belum memiliki pesawat. Gunakan *pesawat beli <nama_pesawat>* untuk membeli.'

                conn.reply(m.chat, planeInfo, m)
            }
            break

        case 'isibbm':
            if (!user.pilot.currentPlane) {
                conn.reply(m.chat, `Kamu belum memiliki pesawat untuk mengisi bahan bakar.`, m)
            } else if (user.money < 10000) {
                conn.reply(m.chat, `Uang kamu tidak cukup untuk membeli bahan bakar.`, m)
            } else {
                user.money -= 10000
                user.pilot.fuel = 100
                conn.reply(m.chat, `Bahan bakar pesawat berhasil diisi penuh.`, m)
            }
            break

        default:
            conn.reply(m.chat, `Perintah tidak ditemukan.`, m)
            break
    }
}

Tio.help = ['pilot', 'buatsim', 'penerbangan', 'pesawat beli <nama_pesawat>', 'isibbm']
Tio.tags = ['rpg']
Tio.command = /^(pilot|buatSIM|penerbangan|pesawat|isiBBM)$/i

Tio.register = false
export default Tio

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function showPilotStatus(m, conn, user, name) {
    let pilot = user.pilot
    let caption = `
✈️ **Status Pilot**
Nama: ${user.registered ? user.name : name}
SIM Pilot: ${pilot.license ? 'Dimiliki' : 'Tidak Dimiliki'}
Jumlah Penerbangan: ${pilot.flightCount}
Total Pendapatan: Rp ${toRupiah(pilot.earnings)}
Pesawat Aktif: ${pilot.currentPlane || 'Belum Memiliki'}
Destinasi Diterbangi: ${pilot.destinations.length > 0 ? pilot.destinations.join(', ') : 'Belum Ada'}
Bahan Bakar: ${pilot.fuel}%
`.trim()

    conn.reply(m.chat, caption, m)
}

function toRupiah(angka) {
    let reverse = angka.toString().split('').reverse().join('')
    let ribuan = reverse.match(/\d{1,3}/g)
    ribuan = ribuan.join('.').split('').reverse().join('')
    return ribuan
}