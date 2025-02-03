/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

let Tio = async (m, { conn, text, command, dbUser }) => {
  const id = m.sender;
  const user = dbUser[id] || (dbUser[id] = { wallet: 0, bank: 0, bitcoin: 0, name: conn.getName(id) });
  
  if (user.wallet === undefined) user.wallet = 0;
  if (user.bank.balance === undefined) user.bank.balance = 0;
  if (user.bitcoin === undefined) user.bitcoin = 0;
  if (!user.name) user.name = conn.getName(id) || "User";

  const bitcoinPrice = Math.floor(Math.random() * (750000000 - 450000000 + 1) + 450000000);

  switch (command) {
    case "wallet":
      return showWallet(m, user, bitcoinPrice);

    case "resetwallet":
      return resetWallet(m, user);

    case "deposit":
      return deposit(m, user, text);

    case "withdraw":
      return withdraw(m, user, text);

    case "invest":
      return invest(m, user);

    case "trade":
      return trade(m, user, text);

    case "buybitcoin":
      return buyBitcoin(m, user, text, bitcoinPrice);

    case "sellbitcoin":
      return sellBitcoin(m, user, text, bitcoinPrice);

    case "minebitcoin":
      return mineBitcoin(m, user, bitcoinPrice);

    default:
      return m.reply("❌ Perintah tidak dikenali.");
  }
};

Tio.help = [
  "wallet",
  "resetwallet",
  "deposit <jumlah>",
  "withdraw <jumlah>",
  "invest",
  "trade <buy/sell> <jumlah>",
  "buybitcoin <jumlah_rupiah>",
  "sellbitcoin <jumlah_bitcoin>",
  "minebitcoin"
];
Tio.tags = ["finance"];
Tio.command = /^(wallet|resetwallet|deposit|withdraw|invest|trade|buybitcoin|sellbitcoin|minebitcoin)$/i;
export default Tio;

/**
 * Fungsi untuk menampilkan Wallet
 */
async function showWallet(m, user, bitcoinPrice) {
  const caption = `
💳 *Informasi Wallet* 💳
🔹 Nama: ${user.name}
🔹 Saldo Wallet: Rp. ${await toRupiah(user.wallet)}
🔹 Saldo Bank: Rp. ${await toRupiah(user.bank.balance)}
🔹 Kepemilikan Bitcoin: ${user.bitcoin.toFixed(8)} BTC
🔹 Total Kekayaan (Estimasi): Rp. ${await toRupiah(user.wallet + user.bank.balance + user.bitcoin * bitcoinPrice)}

📈 Harga Bitcoin Saat Ini: Rp. ${await toRupiah(bitcoinPrice)}/BTC
Gunakan perintah:
- *!deposit <jumlah>* untuk menyetor uang ke bank.
- *!withdraw <jumlah>* untuk menarik uang dari bank.
- *!invest* untuk investasi.
- *!minebitcoin* untuk mulai mining Bitcoin.
- *!buybitcoin <jumlah_rupiah>* untuk membeli Bitcoin.
- *!sellbitcoin <jumlah_bitcoin>* untuk menjual Bitcoin.
  `.trim();
  m.reply(caption);
}

/**
 * Fungsi untuk Reset Wallet
 */
async function resetWallet(m, user) {
  user.wallet = 0;
  user.bank.balance = 0;
  user.bitcoin = 0;
  m.reply("✅ Wallet berhasil direset.");
}

/**
 * Fungsi untuk Deposit
 */
async function deposit(m, user, text) {
  const amount = parseInt(text);
  if (isNaN(amount) || amount <= 0) return m.reply("❌ Masukkan jumlah yang valid.");
  if (user.wallet < amount) return m.reply("❌ Saldo wallet tidak mencukupi.");
  user.wallet -= amount;
  user.bank.balance += amount;
  m.reply(`✅ Berhasil deposit Rp. ${await toRupiah(amount)} ke bank.`);
}

/**
 * Fungsi untuk Withdraw
 */
async function withdraw(m, user, text) {
  const amount = parseInt(text);
  if (isNaN(amount) || amount <= 0) return m.reply("❌ Masukkan jumlah yang valid.");
  if (user.bank.balance < amount) return m.reply("❌ Saldo bank tidak mencukupi.");
  user.bank.balance -= amount;
  user.wallet += amount;
  m.reply(`✅ Berhasil menarik Rp. ${await toRupiah(amount)} dari bank ke wallet.`);
}

/**
 * Fungsi untuk Investasi
 */
async function invest(m, user) {
  if (user.wallet < 1000) return m.reply("❌ Saldo wallet minimal Rp. 1000 untuk investasi.");
  const investment = Math.floor(Math.random() * 5000); // Keuntungan investasi (Rp. 0 - Rp. 5000)
  user.wallet -= 1000;
  m.reply("💼 Proses investasi... Tunggu beberapa saat.");
  await delay(5000);
  user.wallet += investment;
  m.reply(`✅ Investasi selesai! Keuntungan: Rp. ${await toRupiah(investment)}`);
}

/**
 * Fungsi untuk Trading
 */
async function trade(m, user, text) {
  const args = text.split(" ");
  if (args.length < 2) return m.reply("❌ Format: !trade <buy/sell> <jumlah>");
  const type = args[0].toLowerCase();
  const amount = parseInt(args[1]);
  if (isNaN(amount) || amount <= 0) return m.reply("❌ Masukkan jumlah yang valid.");

  if (type === "buy") {
    if (user.wallet < amount) return m.reply("❌ Saldo wallet tidak mencukupi.");
    user.wallet -= amount;
    user.bank.balance += amount;
    m.reply(`✅ Berhasil membeli aset senilai Rp. ${await toRupiah(amount)}`);
  } else if (type === "sell") {
    if (user.bank.balance < amount) return m.reply("❌ Saldo bank tidak mencukupi.");
    user.bank.balance -= amount;
    user.wallet += amount;
    m.reply(`✅ Berhasil menjual aset senilai Rp. ${await toRupiah(amount)}`);
  } else {
    m.reply("❌ Format: !trade <buy/sell> <jumlah>");
  }
}

/**
 * Fungsi untuk Membeli Bitcoin
 */
async function buyBitcoin(m, user, text, bitcoinPrice) {
  const amount = parseInt(text);
  if (isNaN(amount) || amount <= 0) return m.reply("❌ Masukkan jumlah yang valid.");
  if (user.wallet < amount) return m.reply("❌ Saldo wallet tidak mencukupi.");
  const bitcoinBought = amount / bitcoinPrice;
  user.wallet -= amount;
  user.bitcoin += bitcoinBought;
  m.reply(`✅ Berhasil membeli ${bitcoinBought.toFixed(8)} BTC dengan Rp. ${await toRupiah(amount)}.`);
}

/**
 * Fungsi untuk Menjual Bitcoin
 */
async function sellBitcoin(m, user, text, bitcoinPrice) {
  const bitcoinAmount = parseFloat(text);
  if (isNaN(bitcoinAmount) || bitcoinAmount <= 0) return m.reply("❌ Masukkan jumlah yang valid.");
  if (user.bitcoin < bitcoinAmount) return m.reply("❌ Bitcoin tidak mencukupi.");
  const amountGained = bitcoinAmount * bitcoinPrice;
  user.bitcoin -= bitcoinAmount;
  user.wallet += amountGained;
  m.reply(`✅ Berhasil menjual ${bitcoinAmount.toFixed(8)} BTC seharga Rp. ${await toRupiah(amountGained)}.`);
}

/**
 * Fungsi untuk Mining Bitcoin
 */
async function mineBitcoin(m, user, bitcoinPrice) {
  let miningValue = 0.00005; // Nilai Bitcoin maksimal
  const miningRate = 0.000000005; // Penurunan per ms
  m.reply("⛏️ Proses mining dimulai... Tunggu 10 detik.");
  await new Promise((resolve) => {
    const interval = setInterval(() => {
      miningValue -= miningRate;
      if (miningValue <= 0) miningValue = 0;
    }, 1);
    setTimeout(() => {
      clearInterval(interval);
      resolve();
    }, 10000);
  });
  user.bitcoin += miningValue;
  m.reply(`⛏️ Mining selesai! Hasil: ${miningValue.toFixed(8)} BTC.`);
}

/**
 * Delay Function
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fungsi untuk Format Rupiah
 */
async function toRupiah(x) {
x = x.toString()
var pattern = /(-?\d+)(\d{3})/;
while (pattern.test(x))
x = x.replace(pattern, "$1.$2");
return x;
}