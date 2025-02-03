/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import fetch from "node-fetch"
import * as cheerio from "cheerio"
import {
    FormData,
    Blob
} from 'formdata-node'
import {
    fileTypeFromBuffer
} from 'file-type'

let Tio = async (m, {
    conn,
    userPrefix,
    command,
    text
}) => {
text = text.split("|")
    switch (text[0]) {
        case "upload":
            let q = m.quoted ? m.quoted : m
            let mime = (q.message ? q.message.documentMessage : q.msg ? q.msg : q).mimetype || ''
            if (!mime) throw 'No media found'
            let media = await q.download()
            try {
                await m.reply(msg.wait)
                let {
                    url,
                    msg: mssg
                } = await sfile_upload(media, text[1] ? text[1] : "uploader")
                await m.reply(`- Msg: ${mssg}\n- Url: ${url}`)
            } catch (e) {
                throw msg.error
            }
            break
        case "download":
            if (!text[1]) return m.reply("masukan link sfile")
            const regex = /^https?:\/\/sfile\.mobi\/?.*$/;
            if (!regex.test(text[1])) return m.reply("link bukan dari sfile.mobi")

    try {
        await m.reply(msg.wait)
        let {
            data
        } = await sfile_dl(text[1]);
        await conn.sendFile(m.chat, data.buffer, data.filename, `Size: ${data.filesize}\nDescription: ${data.description}`, m)
    } catch (e) {
        throw msg.error
    }
    break
    case "search": 
    if (!text[1]) return m.reply("masukan query")
    try {
    let result = await search(text[1]),
    no = 1;
    let caption = `Searching Sfile\n\n`
       caption += `Gunakan: .sfile download|url (untuk mendownload)\n\n`
       for (let res of result) {
       caption += `${no++}. ${res.title}\n`
       caption += `Size: ${res.size}\n`
       caption += `Link: ${res.link}\n\n`
       }
       await m.reply(caption)
    } catch (e) {
    throw msg.error
    }
    break 
    default: return m.reply(`Silahkan pilih opsi:

1. upload (reply image)
2. download (masukan url sfile mobi)
3. search (mencari url lain)`)
}

}
Tio.help = ["search","download","upload"].map(v => "sfile " + v)
Tio.tags = ["tools","downloader"]
Tio.command = /^(sfile(mobi)?)$/i;
Tio.limit = true

export default Tio

async function rndm(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}

async function sfile_upload(buffer, desc) {

    try {
        const {
            ext,
            mime
        } = await fileTypeFromBuffer(buffer)
        let form = new FormData()
        const blob = new Blob([buffer.toArrayBuffer()], {
            type: mime
        })
        let name = await rndm(10) + "."
        form.append('file1', blob, name + ext)
        form.append('des', desc)
        let res = await fetch('https://sfile.mobi/guest_remote_parser.php', {
            method: 'POST',
            headers: {
                enctype: "multipart/form-data"
            },
            body: form
        })
        let img = await res.text()
        const $ = cheerio.load(img);
        const msg = $('.news').contents().first().text().trim();
        const url = $('.news a').first().attr('href');
        return {
            msg,
            url
        }

    } catch (e) {
        throw e
    }
}

async function sfile_dl(url) {
    const headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.47",
        Referer: url,
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9"
    };
    try {
        const {
            data,
            headers: responseHeaders
        } = await axios.get(url, {
            headers: headers
        });
        const cookies = responseHeaders["set-cookie"]?.map(cookie => cookie.split(";")[0]).join("; ") || "";
        headers.Cookie = cookies;
        const filename = data.match(/<h1 class="intro">(.*?)<\/h1>/s)?.[1] || "unknown";
        const mimetype = data.match(/<div class="list">.*? - (.*?)<\/div>/)?.[1] || "";
        const downloadUrl = data.match(/<a class="w3-button w3-blue w3-round" id="download" href="([^"]+)"/)?.[1];
        headers.Referer = downloadUrl;
        if (!downloadUrl) return {
            status: false,
            message: "Download URL tidak ditemukan"
        };
        const {
            data: downloadPageData
        } = await axios.get(downloadUrl, {
            headers: headers
        });
        const finalDownloadUrl = downloadPageData.match(/<a class="w3-button w3-blue w3-round" id="download" href="([^"]+)"/)?.[1];
        const key = downloadPageData.match(/&k='\+(.*?)';/)?.[1].replace(`'`, "");
        const finalUrl = finalDownloadUrl + (key ? `&k=${key}` : "");
        const filesize = downloadPageData.match(/Download File \((.*?)\)/)?.[1];
        if (!finalUrl) return {
            status: false,
            message: "Download URL tidak ditemukan"
        };
        const {
            data: fileBuffer,
            headers: fileHeaders
        } = await axios.get(finalUrl, {
            responseType: "arraybuffer",
            headers: {
                ...headers,
                Referer: url
            }
        });
        const filenameFinal = fileHeaders["content-disposition"]?.match(/filename=["']?([^"';]+)["']?/)?.[1] || "unknown";
const $ = cheerio.load(data)
 const description = $('span').text();
        return {
            status: true,
            data: {
                filename: filenameFinal,
                description,
                filesize: filesize,
                mimetype: mimetype || fileHeaders["content-type"],
                buffer: fileBuffer
            }
        };
    } catch (err) {
        console.error("Error:", err);
        return {
            status: false,
            message: err.message || "Kesalahan tidak diketahui"
        };
    }
}

async function search(query, page = 1) {
	let res = await fetch(`https://sfile.mobi/search.php?q=${query}&page=${page}`)
	let $ = cheerio.load(await res.text())
	let result = []
	$('div.list').each(function () {
		let title = $(this).find('a').text()
		let size = $(this).text().trim().split('(')[1]
		let link = $(this).find('a').attr('href')
		if (link) result.push({ title, size: size.replace(')', ''), link })
	})
	return result
}