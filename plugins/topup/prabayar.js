/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import { Atlantic } from '../../lib/scraper/Atlantic.js';
import fs from "fs/promises";

let Tio = async (m, { conn, text, usedPrefix, command }) => {
  let saldoUser = JSON.parse(await fs.readFile('./system/database/saldo.json', 'utf-8'));
  let id = m.sender;
  conn.prabayar = conn.prabayar || {};

  if (!(id in saldoUser)) return m.reply('Kamu belum mempunyai saldo. Lakukan deposit minimal 2000 terlebih dahulu.\n\n*.deposit 2000*');
  await m.react('🛒');
  
  let atlanticService = new Atlantic(APIKeys["atlantic"]);
  let listOfServices = await atlanticService.listLayanan();
  let providersByCategory = await getProvidersAndCategories(listOfServices.data);
  let productList = [];

  const excludedCategories = [
    "Thailand TOPUP", 
    "Singapore TOPUP", 
    "China TOPUP", 
    "Vietnam Topup", 
    "Philippines TOPUP", 
    "Malaysia TOPUP", 
    "PLN",
    "TV"
  ];

  for (let category of Object.keys(providersByCategory)) {
    if (excludedCategories.includes(category)) {
      continue;
    }
    
    let buttonActions = [];
    let itemsInCategory = Object.values(listOfServices.data).filter(service => service.category === category);

    buttonActions = buttonActions.concat(
      await Promise.all(
        itemsInCategory.map(async item => ({
          header: `${item.name}`,
          title: `Status: ${item.status === 'available' ? '✅ Tersedia' : '❎ Tidak Tersedia'}`,
          description: `Harga: Rp${await global.Func.toRupiah(item.price)}`,
          id: `.${command} ${item.code}`,
        }))
      )
    );

    productList.push({
      header: `${category}`,
      text: `💳 *Top-up Semua Kebutuhan Anda!*\nNikmati kemudahan bertransaksi dengan Bot Tixo - Team. Proses cepat dan aman untuk semua jenis top-up!`,
      footer: "topup layanan prabayar",
      url: 'https://files.catbox.moe/16jwbs.png',
      list: [{
        title: "Klik disini",
        button: {
          title: "Prabayar",
          label: "hot",
          list: [...buttonActions]
        }
      }]
    });
  }

  if (!text) return conn.sendButtonSlide(m.chat, productList, m, {
    footer: '📞 Hubungi owner untuk bantuan lebih lanjut',
    text: '🛒 TopUp layanan prabayar WhatsApp.'
  });

  let checkCode = Object.values(listOfServices.data).filter(v => v.code == text);
  if (checkCode.length === 0) return m.reply("Kode prabayar tidak tersedia, silahkan pilih yang lain.");
  if (checkCode[0].status !== "available") return m.reply("Kode prabayar yang anda pilih belum tersedia saat ini, silahkan kembali beberapa saat lagi.");
  if (saldoUser[id] < checkCode[0].price) return m.reply(`Saldo kamu kurang Rp${await global.Func.toRupiah(await kurang(checkCode[0].price, saldoUser[id]))}`);

  conn.prabayar[id] = {
    code: text,
    status: 'select',
    sender: id,
    tujuan: '',
    product: checkCode[0].name,
    price: checkCode[0].price,
    img: checkCode[0].img_url
  };

  let caption = `[ Pesanan ]

- Kode: ${text}
- Produk: ${checkCode[0].name}
- Harga:  ${await global.Func.toRupiah(checkCode[0].price)}

- Note: \`\`\`Silahkan konfirmasi untuk target/id/nomor tujuan untuk melakukan order\`\`\`
- Reminder: \`Untuk pengisian pulsa atau paket gunakan awalan \`\`\`08\`\`\` bukan \`\`\`62\`\`\``;

  await conn.sendMessage(m.chat, { image: { url: checkCode[0].img_url }, caption }, { quoted: m });
};


Tio.help = ["prabayar"];
Tio.tags = ["topup"];
Tio.command = /^(prabayar)$/i;
Tio.register = true

Tio.before = async (m) => {
  conn.prabayar = conn.prabayar || {};
  let id = m.sender;
  let saldoUser = JSON.parse(await fs.readFile('./system/database/saldo.json', 'utf-8'));

  if (!(id in conn.prabayar)) return;
  if (!m.text) return;

  const { code, status, sender, tujuan, price, product } = conn.prabayar[id];
  if (/cancel_order/.test(m.text.toLowerCase())) {
    if (!(id in conn.prabayar)) return m.reply("Kamu belum melakukan order sama sekali.");
    await m.reply(`[ Cancel Order ]
- Nama: @${sender.split('@')[0]}
- Code: ${code}
- Price: ${await global.Func.toRupiah(price)}
- Product: ${product}`);
    delete conn.prabayar[id];
  }

  if (status === 'select') {
    await m.reply(`[ Pesanan ]

- Kode: ${code}
- Produk: ${product}
- Harga:  ${await global.Func.toRupiah(price)}

- NOTE: Silahkan konfirmasi sebelum menyelesaikan order. \`yes\` atau \`no\`. kesalahan input bukan tanggung jawab owner. Jika ingin membatalkan ketik: \`cancel_order\``);
    conn.prabayar[id].tujuan = m.text
    conn.prabayar[id].status = "konfirm";
  } else if (status === "konfirm") {
    if (!(id in saldoUser)) saldoUser[id] = 0;

    if (m.text.toLowerCase() === 'yes') {
      let atlan = new Atlantic(APIKeys["atlantic"]);
      let { status, data, message } = await atlan.createOrder(code, tujuan);
      if (!status) return m.reply(message)
 await conn.sendUrlButton(m.chat, `[ Prabayar Proses ]
 
${Object.keys(data).map(v => `- *${v.toUpperCase()}*: ${data[v]}`).join('\n')}

*message*: \`${message}\``, [{
                    "name": "cta_copy",
                    "buttonParamsJson": `{display_text: "Id transaksi", id: "123456789", copy_code: "${data.id}"}`
                }], `status ${data.status}`, m)
                
      await conn.reply(owner + info.jid, `[ Prabayar Proses ]
      
- Sender: ${sender.split('@')[0]}
${Object.keys(data).map(v => `- *${v.toUpperCase()}*: ${data[v]}`).join('\n')}`, null);
      saldoUser[id] -= price;
      await fs.writeFile('./system/database/saldo.json', JSON.stringify(saldoUser));
      await m.reply(`Saldo kamu tersisa: Rp${await global.Func.toRupiah(saldoUser[id])}`);
      delete conn.prabayar[id];
    } else if (m.text.toLowerCase() === 'no') {
      await m.reply(`[ Cancel Order ]
- Sender: ${sender.split('@')[0]}
- Code: ${code}
- Price: ${await global.Func.toRupiah(price)}
- Product: ${product}`);
      delete conn.prabayar[id];
    }
  }
};

export default Tio;

function kurang(s1, s2) {
  return s1 - s2;
}

function getProvidersAndCategories(data) {
  let categorizedProviders = {};

  data.forEach(item => {
    const categoryName = item.category;
    const providerName = item.provider;

    if (!categorizedProviders[categoryName]) {
      categorizedProviders[categoryName] = new Set();
    }

    categorizedProviders[categoryName].add(providerName);
  });

  Object.keys(categorizedProviders).forEach(category => {
    categorizedProviders[category] = Array.from(categorizedProviders[category]);
  });

  return categorizedProviders;
}