let handler = async (m, {conn, command, args, usedPrefix}) => {
  let type = (args[0] || '').toLowerCase()
  let users = global.db.data.users[m.sender]
  let time = global.db.data.users[m.sender].lastjb + 180000  // Mengubah cooldown menjadi 3 menit
  
  let penumpan = ['Pak Bos 👔', 'Ibu-ibu 👩‍🍳', 'Siswa SMA 📚', 'Bocil Epep 🧸', 'Emak-emak 👵', 'Om-om 👴']
  let penumpang = penumpan[Math.floor(Math.random() * penumpan.length)]
  let daganga = ['Wortel 🥕', 'Sawi 🥬', 'Selada 🥗', 'Tomat 🍅', 'Seledri 🌱', 'Cabai 🌶️', 'Daging Ayam 🍗', 'Ikan Segar 🐟', 'Daging Sapi 🥩']
  let dagangan = daganga[Math.floor(Math.random() * daganga.length)]
  let pasie = ['Sakit Kepala 🤕', 'Cedera 🩹', 'Luka Bakar 🔥', 'Patah Tulang 🦴', 'Demam Tinggi 🌡️']
  let pasien = pasie[Math.floor(Math.random() * pasie.length)]
  let pane = ['Wortel 🥕', 'Kubis 🥬', 'Stroberi 🍓', 'Teh Hijau 🍵', 'Padi 🌾', 'Jeruk 🍊', 'Pisang 🍌', 'Semangka 🍉', 'Durian 🍈', 'Rambutan 🍍']
  let panen = pane[Math.floor(Math.random() * pane.length)]
  let bengke = ['Mobil Mewah 🚗', 'Motor Sport 🏍️', 'Becak Tradisional 🚲', 'Bajai Jakarta 🚕', 'Bus Kota 🚍', 'Angkot 🚐', 'Sepeda 🚴']
  let bengkel = bengke[Math.floor(Math.random() * bengke.length)]
  let ruma = ['Membangun Rumah Impian 🏡', 'Membangun Gedung Pencakar Langit 🏙️', 'Memperbaiki Rumah Tua 🏚️', 'Memperbaiki Gedung Usang 🏢', 'Membangun Fasilitas Umum di Desa 🏞️', 'Memperbaiki Fasilitas Umum Kota 🏙️']
  let rumah = ruma[Math.floor(Math.random() * ruma.length)]

  let pppecat = ['Ruko Terbakar 🔥', 'Bertengkar di Depan Umum 🤬', 'Bermalas-malasan Seharian 😴', 'Ngew Minta Duit ke Istri yang Punya Ruko 💸']
  let alasanpecat = pppecat[Math.floor(Math.random() * pppecat.length)]
  let ddppecat = ['Bakar Pasien dengan Obat Terlarang 💉', 'Jual Organ Dalem ke Pasar Gelap 🛒', 'Gagal Diagnosa Akibat Telat ⏱️']
  let alasanpasien = ddppecat[Math.floor(Math.random() * ddppecat.length)]

  // Uang
  let uangm = Math.floor(Math.random() * 15) + 5000
  let duit = Math.floor(Math.random() * 25) + 3500
  let duitm = Math.floor(Math.random() * 60) + 10000
  let duitd = Math.floor(Math.random() * 80) + 6000
  let duitr = Math.floor(Math.random() * 30) + 4500
  let duitk = Math.floor(Math.random() * 100) + 8000

  let _pecat = `${pickRandom(['1', '1', '1', '1'])}`
  let pecat = (_pecat * 1)
  let ppecat = `KAMU KENA PECAT KARENA KAMU ${alasanpecat} 😱`
  let _dpecat = `${pickRandom(['1', '0', '0', '1'])}`
  let dpecat = (_dpecat * 1)
  let dppecat = `KAMU DI PECAT KARENA ${alasanpasien} 💔`

  let kerjaanya = `*List Kerjaan* 🌟
  • Ojek Online 🚖
  • Pedagang Keliling 🛍️
  • Dokter Rumah Sakit 🩺
  • Petani Pangan 🌾
  • Montir Mobil 🔧
  • Kuli Bangunan 🏗️

  Contoh: *.kerja ojek* 💼`
  
  if (/kerjadulu|kerja|work/i.test(command)) {
    switch (type) {
      case 'ojek':
        if (global.db.data.users[m.sender].ojek == false) throw 'Ini Bukan Pekerjaan Kamu Atau Kamu Pengangguran! 😕'
        if (new Date - global.db.data.users[m.sender].lastkerja < 180000) throw `Kamu Sudah Bekerja 😅\nSaatnya Istirahat Selama ${clockString(time - new Date())} 💤`
        global.db.data.users[m.sender].atm += uangm
        global.db.data.users[m.sender].lastkerja = new Date * 1
        m.reply(`🚕 *Kamu Mengantarkan* ${penumpang} 🏙️\n💵 *Kamu Mendapatkan Uang Senilai Rp.${uangm}* 💰`)
        break
      case 'pedagang':
        if (global.db.data.users[m.sender].pedagang == false) throw 'Ini Bukan Pekerjaan Kamu Atau Kamu Pengangguran! 😕'
        if (new Date - global.db.data.users[m.sender].lastkerja < 180000) throw `Kamu Sudah Bekerja 😅, Saatnya Istirahat Selama\n${clockString(time - new Date())} 💤`
        global.db.data.users[m.sender].atm += duit
        global.db.data.users[m.sender].lastkerja = new Date * 1
        m.reply(`🛍️ *Ada Pembeli yang Membeli* ${dagangan} 🍅\n💰 *Mendapatkan Uang Senilai Rp.${duit}* 💵`)
        if (pecat > 1) {
          global.db.data.users[m.sender].pedagang -= pecat * 1
          m.reply(ppecat)
        }
        break
      case 'dokter':
        if (global.db.data.users[m.sender].dokter == false) throw 'Ini Bukan Pekerjaan Kamu Atau Kamu Pengangguran! 😕'
        if (new Date - global.db.data.users[m.sender].lastkerja < 180000) throw `Kamu Sudah Bekerja 😅, Saatnya Istirahat Selama\n${clockString(time - new Date())} 💤`
        global.db.data.users[m.sender].atm += duitm
        global.db.data.users[m.sender].lastkerja = new Date * 1
        m.reply(`🩺 *Kamu Menyembuhkan Pasien* ${pasien} 🏥\n💸 *Mendapatkan Uang Senilai Rp.${duitm}* 💵`)
        break
      case 'petani':
        if (global.db.data.users[m.sender].petani == false) throw 'Ini Bukan Pekerjaan Kamu Atau Kamu Pengangguran! 😕'
        if (new Date - global.db.data.users[m.sender].lastkerja < 180000) throw `Kamu Sudah Bekerja 😅, Saatnya Istirahat Selama\n${clockString(time - new Date())} 💤`
        global.db.data.users[m.sender].atm += duitd
        global.db.data.users[m.sender].lastkerja = new Date * 1
        m.reply(`🌾 *Panen* ${panen} dan menjualnya 🛒\n💵 *Mendapatkan Uang Senilai Rp.${duitd}* 💰`)
        break
      case 'montir':
        if (global.db.data.users[m.sender].montir == false) throw 'Ini Bukan Pekerjaan Kamu Atau Kamu Pengangguran! 😕'
        if (new Date - global.db.data.users[m.sender].lastkerja < 180000) throw `Kamu Sudah Bekerja 😅, Saatnya Istirahat Selama\n${clockString(time - new Date())} 💤`
        global.db.data.users[m.sender].atm += duitr
        global.db.data.users[m.sender].lastkerja = new Date * 1
        m.reply(`🔧 *Kamu Memperbaiki* ${bengkel} 🛠️\n💸 *Mendapatkan Uang Senilai Rp.${duitr}* 💵`)
        break
      case 'kuli':
        if (global.db.data.users[m.sender].kuli == false) throw 'Ini Bukan Pekerjaan Kamu Atau Kamu Pengangguran! 😕'
        if (new Date - global.db.data.users[m.sender].lastkerja < 180000) throw `Kamu Sudah Bekerja 😅, Saatnya Istirahat Selama\n${clockString(time - new Date())} 💤`
        global.db.data.users[m.sender].atm += duitk
        global.db.data.users[m.sender].lastkerja = new Date * 1
        m.reply(`🏗️ *Kamu Selesai Membangun* ${rumah} 🏡\n💵 *Mendapatkan Uang Senilai Rp.${duitk}* 💰`)
        break
      default:
        return conn.reply(m.chat, kerjaanya, m)
    }
  }
}

handler.help = ['kerja', 'work']
handler.tags = ['rpg']
handler.command = /^kerja$/i

export default handler

//JANGAN DIUBAH YA YANG DIBAWAH
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return ['\n' + d, ' *Hari*\n ', h, ' *Jam*\n ', m, ' *Menit*\n ', s, ' *Detik* '].map(v => v.toString().padStart(2, 0)).join('')
}
