/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import {
    FormData,
    Blob
} from 'formdata-node'
import {
    fileTypeFromBuffer
} from 'file-type'
import fetch from "node-fetch";
import * as cheerio from "cheerio"
import axios from "axios"

let Tio = async (m, {
    conn
}) => {
    let q = m.quoted ? m.quoted : m;
    let mimes = (q.msg || q).mimetype || '';
    if (!/image/.test(mimes)) throw 'reply kode QR nya';
    let buffer = await q.download();

    try {
        const { result, result2, result3 } = await readQR(buffer);
        m.reply(result3 ? result3 : result2 ? result2 : result);

    } catch (e) {
        throw e
    }
}

Tio.help = ["readqr"]
Tio.command = /^(read(er)?qr(code)?)$/i;
Tio.tags = ["tools"];
Tio.limit = true;

export default Tio;

async function readQR(buffer) {
    let bs = buffer.toString('base64');
    const { ext, mime } = await fileTypeFromBuffer(buffer);

    let form = new FormData();
    const blob = new Blob([buffer], { type: mime });
    form.append('barcodeUploadFile', blob, `file.${ext}`);
    form.append('type', 'FileBase64');
    form.append('FileBase64', bs);

    let res = await fetch('https://api.products.aspose.app/barcode/recognize/apiRequestRecognize?culture=en', {
        method: 'POST',
        headers: {
            accept: "image/bmp,image/gif,image/jpeg,image/png"
        },
        body: form
    });

    let json = await res.json();
    let resultToken = json.recognizeResultToken;

    let result = null;
    let result2 = null;
    let result3 = null;

    while (!result && !result2 && !result3) {
        try {
            let response = await axios.get(`https://api.products.aspose.app/barcode/recognize/recognizeresult/${resultToken}?timestamp=0`);
            let { html } = response.data;
            let $ = cheerio.load(html);

            result = $("textarea").text().trim();
            result2 = $('#resultUrl_0').attr('href');
            result3 = $('#textarea_0').val();

            if (result || result2 || result3) break;
        } catch (err) {
            console.error("Waiting for result...");
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }

    return { result, result2, result3 };
}