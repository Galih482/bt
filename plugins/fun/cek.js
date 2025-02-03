/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

// Daftar kata cek dan deskripsi
let options = {
    cekbeban: 'Beban hidup',
    cekbego: 'Kadar kebegoan',
    cekcantik: 'Kecantikan',
    cekganteng: 'Kegantengan',
    cekgay: 'Potensi gay',
    cekharam: 'Kadar keharaman',
    cekjago: 'Skill gaming',
    cekjelek: 'Tingkat kejelekan',
    cekkeran: 'Kekerenan',
    ceknolep: 'Kadar nolep',
    cekpinter: 'Tingkat kepintaran',
    ceksuhu: 'Kesuhuan',
    cekalim: 'Kearifan',
    ceklucu: 'Kelucuan',
    cekimut: 'Keimutan',
    cekbijak: 'Kebijaksanaan',
    cekseram: 'Keseraman',
    cekopini: 'Kedalaman opini',
    cekngantuk: 'Tingkat kantuk',
    cekrajin: 'Kerajinan',
    cekmager: 'Level mager',
    cekkeren: 'Level kekerenan',
    cekhoror: 'Kemisteriusan',
    cekserius: 'Keseriusan',
    cekkreatif: 'Kreativitas',
    cekgila: 'Kegilaan',
    cekdewasa: 'Kedewasaan',
    cekalay: 'Ke-alay-an',
    cekkepo: 'Tingkat kepo',
    cekgalau: 'Kegalauan',
    cekgombal: 'Skill menggombal',
    cekdihati: 'Posisi di hati',
    cekbucin: 'Kebucinan',
    cekromantis: 'Keromantisan',
    cekrejeki: 'Besar rezeki',
    cekloyal: 'Kadar loyalitas',
    cekmisterius: 'Kemisteriusan',
    cekpemalu: 'Rasa malu',
    cekjutek: 'Jutekness',
    cekbaik: 'Kebaikan',
    cekramah: 'Keramahan',
    cekbahagia: 'Kebahagiaan',
    cekpositif: 'Kepositifan',
    cekpribadi: 'Kepopuleran',
    cekjahat: 'Kejahatan',
    cekcinta: 'Tingkat cinta',
    cekgaring: 'Tingkat garing',
    cekgacor: 'Skill gacor',
    cekdewasa: 'Kedewasaan mental',
    ceksiapnikah: 'Kesiapan menikah',
    cekviral: 'Potensi viral',
    cekmodis: 'Kadar modis',
    cekgaul: 'Kegaulan'
};

// Fungsi utama untuk pengecekan
let Tio = async (m, { conn, text, command }) => {
    let sender = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted && m.quoted.sender ? m.quoted.sender : m.sender;
    let username = sender.split('@')[0];

    // Pilih deskripsi dan nilai acak
    let checkType = options[command] || 'Status';
    let randomValue = Math.floor(Math.random() * 100) + 1; // Nilai acak dari 1-100

    // Variasi pesan yang lebih banyak
    let responses = [
        `Wow, ${checkType} ${username} mencapai ${randomValue}%!`,
        `Menurut hasil cek, ${username} memiliki ${checkType} sebesar ${randomValue}%. Luar biasa!`,
        `Ternyata ${username} punya tingkat ${checkType} sebesar ${randomValue}%, keren kan?`,
        `${checkType} ${username} ada di level ${randomValue}%. Gimana nih?`,
        `Hmm... setelah dicek, ${checkType} ${username} itu sekitar ${randomValue}%.`,
        `${username} punya ${checkType} sebanyak ${randomValue}%. Pasti bangga kan?`,
        `${username}, hasil pengecekan menunjukkan ${checkType}-mu adalah ${randomValue}%. Wah!`,
        `Sepertinya ${username} punya ${checkType} sebesar ${randomValue}%!`,
        `${username}, wow! Kamu punya ${checkType} sampai ${randomValue}% nih! Hebat nggak tuh?`,
        `Kalau dari hasil scan, ${checkType} ${username} ternyata ada di angka ${randomValue}%!`,
        `Eh, ${username}, kamu sadar nggak kalau ${checkType}-mu itu ${randomValue}%?`,
        `Tingkat ${checkType} ${username} ternyata ada di angka ${randomValue}%! Gokil!`,
        `${username}, ternyata kamu punya ${checkType} sebesar ${randomValue}%. Luar biasa, nih!`,
        `Psst, ${username}, hasil tes menunjukkan bahwa ${checkType}-mu adalah ${randomValue}%!`,
        `Menurut rumus cek matematika, ${checkType} ${username} adalah ${randomValue}%. Luar biasa!`,
        `${username}, dari analisis data, ${checkType}-mu ada di level ${randomValue}%!`,
        `Jangan kaget ya, ${username}, hasil cek menunjukkan ${checkType} kamu itu ${randomValue}%!`,
        `Fakta mengejutkan! ${username} punya ${checkType} hingga ${randomValue}%!`,
        `${checkType} kamu, ${username}, diukur sebesar ${randomValue}%. Siap-siap viral nih!`,
        `Kalau dilihat-lihat, ${username} punya ${checkType} sampai ${randomValue}%. Serius nih?`
    ];

    // Pilih salah satu respons secara acak
    let response = responses[Math.floor(Math.random() * responses.length)];
    m.reply(response);
};

Tio.help = Object.keys(options);
Tio.tags = ['fun'];
Tio.command = Object.keys(options);

export default Tio;