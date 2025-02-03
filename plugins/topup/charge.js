/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import axios from 'axios';
import {
    OrderKuotaAPI
} from '../../lib/scraper/OrderKuota.js';
import fs from 'fs';
import qs from 'qs';

let Tio = async (m, {
    conn, text
}) => {
    conn.saldo = conn.saldo || {};
    let id = m.sender;

    if (id in conn.saldo) return m.reply("Masih ada pembayaran sebelumnya yang harus diselesaikan.");

    conn.saldo[id] = {
        nominal: text,
        status: "nominal",
        user: id,
        time: setTimeout(() => {
            conn.sendMessage(m.chat, {
                text: `Charge telah dibatalkan.\nNomor: ${id.split("@")[0]}\nNominal: Rp${rp(conn.saldo[id].nominal)}`
            });
            delete conn.saldo[id];
        }, 1000 * 60 * 5) // 5 menit
    };

    await m.reply("Silakan masukkan nominal charge saldo.");
};

Tio.help = Tio.command = ["charge", "isisaldo"];
Tio.tags = ["topup"];

Tio.before = async function(m, {
    conn
}) {
    conn.saldo = conn.saldo || {};
    let id = m.sender;
    if (!(id in conn.saldo)) return;
    if (m.fromMe) return;    
    if (m.isGroup) return;
    if (!m.text) return;
    const orkut = new OrderKuotaAPI({
        memberID: global.Orkut['id'], pin: global.Orkut['pin'], password: global.Orkut['password']
    });

    if (conn.saldo[id].status === "nominal") {
        if (isNaN(m.text)) return m.reply("Nominal harus berupa angka.");
        conn.saldo[id].nominal = m.text;
        conn.saldo[id].status = "payment";
        await m.reply(`Nominal: Rp${await rp(m.text)}\nSilakan pilih opsi pembayaran:\n\n- Dana (manual)\n- Qris`);

    } else if (conn.saldo[id].status === "payment") {
        let paymentOption = m.text.toLowerCase();
        if (paymentOption === "dana" || paymentOption === "qris") {
            conn.saldo[id].status = "finish";

            let paymentType = paymentOption.toUpperCase();

            if (paymentOption == "qris") {
                let ID = await create(global.Orkut["qr"], conn.saldo[id].nominal)
                let qris = await qrcode(ID);

                await conn.sendMessage(m.chat, {
                    image: {
                        url: qris
                    },
                    caption: await cap(paymentType, await rp(conn.saldo[id].nominal))
                }, {
                    quoted: m
                });
                
    let attempts = 0;
    let found = false;
    let user = JSON.parse(await fs.readFileSync('./system/database/saldo.json', 'utf-8'));
  
    while (attempts < 10 && !found) {
        attempts++;
        let { data } = await orkut.getMutasi(global.Orkut['apikey']);
        found = data.find(v => v.amount == conn.saldo[id].nominal && v.qris == 'static');

        if (found) {
            const jumlah = conn.saldo[id].nominal;
            if (!(id in user)) user[id] = 0
            user[conn.saldo[id].user] += parseInt(jumlah);
            await fs.writeFileSync('./system/database/saldo.json', JSON.stringify(user, null, 2));
            await conn.sendMessage(m.chat, {
                text: `[ Notifikasi Sukses ]\nNomor: ${conn.saldo[id].user.split("@")[0]}\nNominal: Rp${await rp(conn.saldo[id].nominal)}\nTipe: ${paymentType}`
            });
            clearTimeout(conn.saldo[id].time)
            delete conn.saldo[id]
            
            break; 
        } else {

            console.log('Payment not found, retrying...');
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }


    if (!found) {
        await conn.sendMessage(m.chat, { text: 'Pembayaran belum diterima, transaksi dibatalkan.' });
        clearTimeout(conn.saldo[id].time)
        delete conn.saldo[id];
        
    }

            } else if (paymentOption == "dana") {
                await conn.sendMessage(m.chat, {
                    text: `Silahkan transfer ke nomor Dana dibawah.\n${global.payment['dana']}\n` + await cap(paymentType, await rp(conn.saldo[id].nominal))
                }, {
                    quoted: m
                });
            
            await conn.sendMessage(owner + info.jid, {
                text: `[ Notifikasi ]\nNomor: ${conn.saldo[id].user.split("@")[0]}\nNominal: Rp${await rp(conn.saldo[id].nominal)}\nTipe: ${paymentType}`
            });
            }
        } else {
            m.reply("Opsi pembayaran tidak valid. Pilih antara Dana atau Qris.");
        }
    }
};

export default Tio;

    function rp(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    function cap(type, nominal) {
        return `[ Pembayaran ${type} ]

Segera lakukan transaksi sebelum 5 menit. Jika lebih dari itu, maka dianggap batal.

Nominal: Rp${nominal}

.kirimbukti (reply screenshot bukti)`;
    }
    function convertCRC16(data) {
        let crc = 0xFFFF;
        for (let i = 0; i < data.length; i++) {
            crc ^= data.charCodeAt(i) << 8;
            for (let j = 0; j < 8; j++) {
                if ((crc & 0x8000) !== 0) {
                    crc = (crc << 1) ^ 0x1021;
                } else {
                    crc <<= 1;
                }
            }
            crc &= 0xFFFF;
        }
        return crc.toString(16).toUpperCase().padStart(4, '0');
    }

    function create(qrisData, paymentAmount) {
        try {
            qrisData = qrisData.slice(0, -4);
            const modifiedData = qrisData.replace("010211", "010212");

            const splitData = modifiedData.split("5802ID");
            if (splitData.length !== 2) {
                throw new Error("Invalid QRIS data format");
            }

            const formattedAmount = "54" + ("0" + paymentAmount.toString().length).slice(-2) + paymentAmount;
            const finalData = splitData[0] + formattedAmount + "5802ID" + splitData[1];

            const completeData = finalData + convertCRC16(finalData);

            return completeData;
        } catch (error) {
            console.error("Error creating QR:", error.message);
            throw error;
        }
    }
    async function qrcode(text, size = 3) {
        const ip = () => {
            const octet = () => Math.floor(Math.random() * 256);
            return `${octet()}.${octet()}.${octet()}.${octet()}`;
        };
        const {
            data
        } = await axios.post(
            'https://api.products.aspose.app/barcode/generate/generatebarcode?culture=en',
            qs.stringify({
                barcodeType: 'QR',
                content: text,
                filetype: 'PNG',
                showCodeText: false,
                backColorArgb: '',
                barAndTextColorArgb: '',
                uuid: 'f3052253-b445-4ee5-8a5f-5e60be28677a',
                filesize: size
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Accept': '*/*',
                    "x-forwarded-for": await ip()
                }
            }
        );
        let {
            downloadPath,
            success
        } = data
        if (success == true) {
            return 'https://products.aspose.app' + downloadPath
        } else {
            return {
                msg: "error"
            }
        }
    }