/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import axios from "axios";
import qs from "qs";

let Tio = async (m, {
    conn,
    command,
    text
}) => {
    if (!text) return m.reply(`contoh: .${command} hai`)

    try {
        let result = await qrcode(text);
        await conn.sendFile(m.chat, result, '', `Text: ${text}`, m)
    } catch (e) {
        m.reply(msg.error)
    }
}
Tio.help = Tio.command = ["qrcode"]
Tio.tags = ["tools"]
Tio.limit = true

export default Tio
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