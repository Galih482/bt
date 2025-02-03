/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import fetch from 'node-fetch';
import FormData from 'form-data';
import {
    fileTypeFromBuffer
} from 'file-type';

let Tio = async (m) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw 'No media found'
    let media = await q.download()
    try {
        let result = await tourl(media);

        m.reply(`- Result: ${result}`)
    } catch (e) {
        m.reply(msg.error)
    }
}
Tio.help = ['catbox']
Tio.tags = ['uploader']
Tio.command = /^(catbox)$/i
Tio.limit = true
Tio.register = true

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