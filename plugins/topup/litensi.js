/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import axios from 'axios'

let Tio = async (m, {
    conn,
    text,
    command,
    func,
    args
}) => {
    let { id, api_key } = global.smm['litensi'];

    switch (command) {
        case 'litensi_negara':
            try {
                const reg = await axios.post('https://litensi.id/api/sms/countries', {
                    api_id: id,
                    api_key
                })
                let region = `List ID negara\n\n`
                for (let regg of reg.data.data) {
                    region += `Id: ${regg.id}\nName: ${regg.name}\nOperator: ${regg.operator}\n\n`
                }
                await m.reply(region)
            } catch (e) {
                throw e.data
            }
            break;
        case 'litensi_layanan':
            try {
                const ser = await axios.post('https://litensi.id/api/sms/services', {
                    api_id: id,
                    api_key
                })
                let service = `List Service\n\n`
                for (let serv of ser.data.data) {
                    service += `Id: ${serv.id}\nName: ${serv.name}\n\n`
                }
                await m.reply(service)
            } catch (e) {
                throw e.data
            }
            break;
        case 'litensi_operator':
            try {
                const opr = await axios.post('https://litensi.id/api/sms/operators', {
                    api_id: id,
                    api_key
                })
                let operator = `List Operator\n\n`
                for (let oper of opr.data.data) {
                    operator += `Country_id: ${oper.country_id}\nCountry_name: ${oper.country_name}\nOperator: ${oper.operator}\n\n`
                }
                await m.reply(operator)
            } catch (e) {
                throw e.data
            }
            break;
        case 'litensi_harga':
            try {
                if (!args[0] || !args[1]) return m.reply(`Harus berupa angka untuk Country, Service dan filter_harga.

- litensi_negara (untuk melihat id negara)
- litensi_layanan (untuk melihat id service)
- keterangan filter harga: 1 = list termurah, 2 = list termahal, jika dikosongkan maka akan memunculkan semua harga`)
                const harga_ = await axios.post('https://litensi.id/api/sms/prices', {
                    api_id: id,
                    api_key,
                    country: args[0],
                    service: args[1],
                    price_filter: args[2] ? args[2] : ''
                })
                let hrg

                if (args[2] === '1') {
                    hrg = 'termurah'
                } else if (args[2] === '2') {
                    hrg = 'termahal'
                } else {
                    hrg = 'semua harga'
                }
                let harga = `List Harga: *${hrg}*\n\n`
                for (let harg of harga_.data.data) {
                    harga += `Country_id: ${harg.country_id}\nCountry_name: ${harg.country_name}\nService_id: ${harg.service_id}\nService_name: ${harg.service_name}\nHarga: ${harg.price}\n\n`
                }
                await m.reply(harga)
            } catch (e) {
                throw e.data
            }
            break;
        case 'order_sms':
            try {
                if (!args[0] || !args[1] || !args[2] || !args[3]) return m.reply(`Harus berupa angka untuk Country, Service, operator dan harga_max.

- litensi_negara (untuk melihat id negara)
- litensi_layanan (untuk melihat id service)
- litensi_operator (untuk melihat id operator)
- keterangan filter harga: 1000, 2000, 3000, jika dikosongkan maka akan membeli dg harga termurah`)
                const ord = await axios.post('https://litensi.id/api/sms/order', {
                    api_id: id,
                    api_key,
                    country: args[0],
                    service: args[1],
                    operator: args[2],
                    max_price: args[3]
                })

                let order = `Pesanan harga: ${tesk[3] ? args[3] : 'terendah'}

order_id: ${ord.data.order_id}
country_id: ${ord.data.country_id}
country_name: ${ord.data.country_name}
service_id: ${ord.data.service_id}
service_name: ${ord.data.service_name}
operator: ${ord.data.operator}
phone: ${ord.data.phone}
expired_at: ${ord.data.expired_at}
status: ${ord.data.status}`
                await m.reply(order)
            } catch (e) {
                throw e.data
            }
            break;
        case 'litensi_order':
            try {
                if (!text) return m.reply('Masukan id pesanan untuk mengecek')
                const cek = await axios.post('https://litensi.id/api/sms/getstatus', {
                    api_id: id,
                    api_key,
                    order_id: text
                })
                const status = `Status Order id: ${text}

Id: ${cek.data.data.order_id}
Phone: ${cek.data.data.phone}
Sms: ${cek.data.data.sms}
Status: ${cek.data.data.status}`
                await m.reply('Status terkirim ke Private chat')
                await conn.reply(m.sender, status, null)
            } catch (e) {
                throw e.data
            }
            break;
            case 'status_sms':
try {
if (!args[0]) return m.reply('Masukan id orderan yang kamu pesan')
if (!args[1]) return m.reply(`Masukan Status ke orderan orderan yang kamu pesan\nHanya terdiri dari: 
- RESEND, 
- SUCCESS, 
- CANCELED`)
const censel = await axios.post('https://litensi.id/api/sms/setstatus', {
api_id: id,
api_key,
order_id: args[0],
status: args[1]
})
await m.reply(`Status order id: ${args[0]} ${censel.data.data.status}\nPhone: ${censel.data.data.phone}`)
} catch (e) {
throw e
}
break;
    }
}
Tio.help = Tio.command = ['litensi_negara', 'litensi_layanan', 'litensi_operator', 'litensi_harga', 'order_sms', 'litensi_order', 'status_sms']
Tio.tags = ['topup']
Tio.rowner = true

export default Tio