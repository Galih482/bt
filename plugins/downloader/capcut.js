/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import fetch from "node-fetch"
import * as cheerio from "cheerio"

let Tio = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    if (!text) return m.reply(await Func.exam(usedPrefix, command, 'url capcut'));
    try {
        let res = await capcut(text);
        conn.sendFile(
            m.chat,
            res.video,
            null,
            `*• Thumbnail:* ${res.thumbnail}\n• *Url:* ${text}`,
            m,
        );
    } catch (e) {}
};
Tio.help = ["capcut"];
Tio.tags = ["downloader"];
Tio.command = ["capcut"];
export default Tio

async function capcut(url) {
    const response = await fetch(url);
    const data = await response.text();
    const $ = cheerio.load(data);

    return {
        thumbnail: $("video").attr("poster"),
        video: $("video").attr("src"),
    };
}