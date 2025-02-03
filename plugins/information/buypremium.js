/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import fs from 'fs';

let Tio = async (m, { conn, text }) => {
  conn.premium = conn.premium || {};
  const produk = JSON.parse(await fs.readFileSync('./system/json/product.json', 'utf-8'));

  const premiumOptions = produk.premium.reduce((options, item, index) => {
    options[`premium${index + 1}`] = { price: item.harga, duration: item.amount };
    return options;
  }, {});

  if ((m.sender in conn.premium)) return m.reply('Harap selesaikan pembelian premium sebelumnya.');

  if (!text) {
    return m.reply(
      `Kode Premium:\n\n` + 
      Object.keys(premiumOptions)
        .map(option => `${option}: Rp${premiumOptions[option].price} (${premiumOptions[option].duration} hari)`)
        .join('\n')
    );
  }

  const codeID = text.trim();
  if (!premiumOptions[codeID]) return m.reply('Kode premium tidak valid');

  const { price, duration } = premiumOptions[codeID];
  const notes = `Premium untuk ${duration} Hari`;

  let user = JSON.parse(await fs.readFileSync('./system/database/saldo.json', 'utf-8'));
  let sender = m.sender;
  if (!(sender in user)) {
    return m.reply("Saldo tidak ditemukan untuk pengguna ini. Silakan gunakan perintah .charge untuk mengisi saldo Anda.");
  }

  let saldo = user[sender];

  if (saldo < price) {
    return m.reply(`Saldo Anda tidak cukup untuk membeli premium. Saldo Anda saat ini: Rp${rp(saldo)}. Silakan gunakan perintah .charge untuk mengisi saldo.`);
  }

  user[sender] -= price;
  fs.writeFileSync('./system/database/saldo.json', JSON.stringify(user, null, 2));

  let expiredDuration = 86400000 * duration; 
  let now = new Date() * 1;
  global.db.data.users[m.sender].premium = true;
  if (now < global.db.data.users[m.sender].premiumTime) {
    global.db.data.users[m.sender].premiumTime += expiredDuration;
  } else {
    global.db.data.users[m.sender].premiumTime = now + expiredDuration;
  }

  const premiumSuccessMessage = `
*🎉 Premium Activation Success! 🎉*

🧑‍💻 *User:* ${m.sender.split('@')[0]}
💎 *Status:* PREMIUM
📅 *Duration:* ${duration} Hari
⏳ *Expired in:* ${formatTime(global.db.data.users[m.sender].premiumTime)}
💸 *Saldo Tersisa:* Rp${rp(saldo)}

📌 *Note:* Premium access gives you exclusive features for the specified duration. Enjoy the extra perks!

Thank you for supporting the service! If you want to add more premium days or need any assistance, feel free to contact us.

Happy using! 😃
`;

  conn.reply(m.chat, premiumSuccessMessage, null);
};

Tio.help = ['buypremium'];
Tio.tags = ['topup'];
Tio.command = /^(buyprem(ium)?|beliprem(ium)?)$/i;
Tio.register = true;

export default Tio;

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

// Utility function to format money (Rupiah)
function rp(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}