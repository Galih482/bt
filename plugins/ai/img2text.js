/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import {
    tmpFiles
} from '../../lib/uploader.js';
import axios from 'axios';

let Tio = async (m, {
    text
}) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw 'No media found'
    let media = await q.download()
    try {
        await m.reply(msg.wait);
        let result = await tmpFiles(media);
        const {
            desc
        } = await todesc(result, text);
        await m.reply(`\`${desc}\``)
    } catch (e) {
        m.reply(msg.error)
    }
}
Tio.help = ['todesciptiom']
Tio.tags = ['ai']
Tio.command = /^(img2text|todesc(ription)?)$/i
Tio.limit = true
Tio.register = true

export default Tio

async function todesc(url, prompt = '') {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                data: response
            } = await axios.post(
                "https://pallyy.com/api/tools/image-to-description/get", {
                    imageUrl: url,
                    prompt: prompt,
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        Referer: "https://imagedescriber.online/",
                        Origin: "https://imagedescriber.online",
                        "User-Agent": "Postify/1.0.0",
                        "X-Forwarded-For": Array(4)
                            .fill(0)
                            .map(() => Math.floor(Math.random() * 256))
                            .join("."),
                    },
                }
            );

            resolve({
                status: true,
                desc: response.description
            });
        } catch (error) {
            console.log("Error.");
            reject({
                status: false,
                message: error.message
            });
        }
    });
}