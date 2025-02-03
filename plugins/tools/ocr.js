/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

/**
@credit Tio
@Nightmare MD
@Whatsapp Bot
wa.me/6282285357346
**/

import fetch from 'node-fetch';
import FormData from 'form-data';
import {
    fileTypeFromBuffer
} from 'file-type';

let Tio = async (m, {
    conn,
    args,
    text,
    usedPrefix,
    command
}) => {
    var out

    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    if (!/webp|image|viewOnce/g.test(mime)) return m.reply(`Reply Media Dengan Perintah\n\n${usedPrefix + command}`)
    let img = await q.download();

    if (/image/g.test(mime)) {
        out = await tourl(img)
    }
    await m.reply(msg.wait)
    try {
        let res = await Func.fetchJson("https://api.ocr.space/parse/imageurl?apikey=helloworld&url=" + out)
        let result = res.ParsedResults[0].ParsedText;
        await m.reply(result);
    } catch (e) {
        throw msg.error
    }
}
Tio.help = ['ocr']
Tio.tags = ['tools']
Tio.command = /^(ocr)$/i
Tio.premium = true
export default Tio

async function tourl(buffer) {
    let {
        ext
    } = await fileTypeFromBuffer(buffer);
    let bodyForm = new FormData();
    bodyForm.append("fileToUpload", buffer, "file." + ext);
    bodyForm.append("reqtype", "fileupload");

    let res = await fetch("https://catbox.moe/user/api.php", {
        method: "POST",
        body: bodyForm,
    });

    let data = await res.text();
    return data;
}