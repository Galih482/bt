/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import fs from 'fs';

let linkRegex = /chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3})?/i;

let Tio = async (m, { conn, text }) => {
  conn.sewa = conn.sewa || {};
  const produk = JSON.parse(await fs.readFileSync('./system/json/product.json', 'utf-8'));

  const rentalOptions = produk.sewa.reduce((options, item, index) => {
    options[`rental${index + 1}`] = { price: item.harga, duration: item.amount };
    return options;
  }, {});

  if ((m.sender in conn.sewa)) return m.reply('Harap selesaikan pembayaran sebelumnya.');

  if (!text) {
    return m.reply(
      `Kode Sewa:\n\n` + 
      Object.keys(rentalOptions)
        .map(option => `${option}: Rp${rentalOptions[option].price} (${rentalOptions[option].duration} hari)`)
        .join('\n')
    );
  }

  const [codeID, link] = text.split(' ');
  if (!(codeID && link)) return m.reply(`Masukan ${!codeID ? 'kode sewa' : 'group link'}`);
  if (!link.match(linkRegex)) return m.reply('Tautan grup tidak valid!');

  if (!rentalOptions[codeID]) return m.reply('Kode sewa tidak valid');

  const { price, duration } = rentalOptions[codeID];
  const notes = `Sewa untuk ${duration} Hari`;

  let user = JSON.parse(await fs.readFileSync('./system/database/saldo.json', 'utf-8'));
  let sender = m.sender;
  if (!(sender in user)) {
    return m.reply("Saldo tidak ditemukan untuk pengguna ini. Silakan gunakan perintah .charge untuk mengisi saldo Anda.");
  }

  let saldo = user[sender];

  if (saldo < price) {
    return m.reply(`Saldo Anda tidak cukup untuk melakukan pembayaran sewa. Saldo Anda saat ini: Rp${rp(saldo)}. Silakan gunakan perintah .charge untuk mengisi saldo.`);
  }

  user[sender] -= price;
  fs.writeFileSync('./system/database/saldo.json', JSON.stringify(user, null, 2));

  const groupCode = link.match(linkRegex)[1];
  const groupId = await conn.groupAcceptInvite(groupCode);
  let expiredDuration = 86400000 * duration; 
  let now = new Date() * 1;

  if (now < global.db.data.chats[groupId].expired) {
    global.db.data.chats[groupId].expired += expiredDuration;
  } else {
    global.db.data.chats[groupId].expired = now + expiredDuration;
  }

  const expirationDate = new Date(global.db.data.chats[groupId].expired);
  m.reply(
    `Sewa Berhasil!\n\n` +
    `Detail Sewa:\n` +
    `- *Kode Produk:* ${codeID}\n` +
    `- *Durasi:* ${duration} Hari\n` +
    `- *Tanggal Kadaluarsa:* ${expirationDate.toLocaleDateString()} ${expirationDate.toLocaleTimeString()}\n` +
    `- *Harga Pembelian:* Rp${price}\n` +
    `- *Expired dalam:* ${formatTime(expirationDate)}`
  );
};

Tio.help = ['buysewa'];
Tio.tags = ['topup'];
Tio.command = /^(buysewa|belisewa)$/i;
export default Tio;

// Function to format money (Rupiah)
function rp(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Function to format remaining time
function formatTime(expirationDate) {
  const now = new Date();
  const expiration = new Date(expirationDate);
  const timeDifference = expiration - now;

  if (timeDifference <= 0) return "Expired";

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  return `${days} Hari, ${hours} Jam, ${minutes} Menit, ${seconds} Detik`;
}