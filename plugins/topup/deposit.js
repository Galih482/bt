/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/


import { Atlantic } from "../../lib/scraper/Atlantic.js";

let Tio = async (m, { conn, command, text }) => {
    let Depo = new Atlantic({ api_key: global.APIKeys["atlantic"] });
    switch (command) {
        case 'deposit':
            if (!text) return m.reply("masukan nominal deposit saldo");
            if (text < 2000) return m.reply('nominal minimal 2000');
            if (isNaN(text)) return m.reply("nominal harus berupa angka");
            try {
                let nominal = text * 1 + global.PPN * 1;
               
                const { data } = await Depo.createDeposit(nominal, "ewallet", "qris");
                const result = await axios.post(APIs["Tixo"] + '/tools/qrcode', { string: data.qr_string }, { responseType: 'arraybuffer' })
              await conn.sendMessage(m.chat, {
                    image: result.data,
                    caption:  `*Deposit gateway*

- Nominal: ${data.nominal} - PPN _(${global.PPN})_
- Created: ${data.created_at}
- Expired: ${data.expired_at}
- Id trx: ${data.id}
- Status: ${data.status}
- Get Balance: ${data.get_balance}

- Note: \`\`\`Bayar sebelum 10 menit.\nSaldo akan masuk setelah menyelesaikan transaksi, Gunakan perintah ini untuk mengecek pembayaran.\n .cek_deposit ID_TRANSAKSI\`\`\``
                }, { quoted: m });
            } catch (e) {
                throw e
            }
            break;
        case 'cancel_deposit':
            if (!text) return m.reply('harap masukan id transaksi.');
            try {
                const { data: cancel } = await Depo.cancelDeposit(text);
                m.reply(Object.keys(cancel).map(v => `*${v.toUpperCase()}*: ${cancel[v]}`).join('\n'));
            } catch (e) {
                m.reply(e.data.message)
            }
            break;
        case 'cek_deposit':
            if (!text) return m.reply('harap masukan id transaksi.');
            try {
                const { data: cek } = await Depo.statusDeposit(text);
                const { data: cair, status } = await Depo.cairkanDeposit(text);
                m.reply(Object.keys(cek).map(v => `*${v.toUpperCase()}*: ${cek[v]}`).join('\n'));
                if (status) return conn.reply(owner + info.jid, `[ Transaksi sukses ]
                
${Object.keys(cair).map(v => `*${v.toUpperCase()}*: ${cair[v]}`).join('\n')}`, null);
            } catch (e) {
                m.reply(e.data)
            }
            break;
    }
}
Tio.help = Tio.command = ["deposit", "cancel_deposit", "cek_deposit"];
Tio.tags = ["topup"];
Tio.rowner = true;

export default Tio;