/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import kode from 'kode-scrape'
const { anime } = kode;

let Tio = async (m, {
    text,
    conn,
    command,
    usedPrefix
}) => {

text = text.split("|");
const { episode, getVideos, searchs, details } = anime.samehadaku
switch (text[0]) {
case "video":
if (!text[1]) return m.reply('masukan url')
try {
const video = await getVideos(text[1]);
let vid = `video samehadaku\n\n`.toUpperCase();
for (let res of video) {
    vid += `Name: ${res.name}\n`
    vid += `Url: ${res.url}\n\n`
}
await m.reply(vid)
} catch (e) {
throw msg.error
}
break 
case 'detail':
try {
if (!text[1]) return m.reply('masukan url')
const { title, rating, description, image, genres, details: detil } = await details(text[1]);
let det = `*${title}*\n\n`;
det += `Japanese: ${detil.japanese}\n`;
det += `English: ${detil.english}\n`;
det += `Status: ${detil.status}\n`;
det += `Type: ${detil.type}\n`;
det += `Source: ${detil.source}\n`;
det += `Duration: ${detil.duration}\n`;
det += `Season: ${detil.season}\n`;
det += `Total: ${detil.total}\n`;
det += `Studio: ${detil.studio}\n`;
det += `Producers: ${detil.producers}\n`;
det += `Released: ${detil.released}\n`;
det += `Rating: ${rating}\n`;
det += `Genres:\n- ${genres.join('\n- ')}\n\n`;
det += `${description}`;
      
await conn.sendFile(m.chat, image, '', det, m)
} catch (e) {
throw msg.error
}
break 
case 'episode':
if (!text[1]) return m.reply("masukan url")
try {
const Episode = await episode(text[1]);
let eps = `Episode\n\n`.toUpperCase();
for (let res of Episode) {
    eps += `Title: ${res.title}\n`
    eps += `Url: ${res.url}\n\n`
}
await m.reply(eps)
} catch (e) {
throw msg.error
}
break 
default:
    if (!text[0]) return m.reply(usedPrefix + command + " naruto")

    try {
        await m.reply(msg.wait);
        let result = await searchs(text[0]);

        let cap = `*samehadaku*\n\n`.toUpperCase()
         cap += `- episode (dapatkan semua episode)\n- video (dapatkan link video)\n- detail (mendapatkan detail)\n\n`
            let no = 1;
        for (let anim of result) {
            cap += `${no++}. ${anim.title}\n`
            cap += `Genre: ${anim.data.genre}\n`
            cap += `Type: ${anim.data.type}\n`
            cap += `Score: ${anim.data.score}\n`
            cap += `${anim.url}\n\n`
        }
        await m.reply(cap)

    } catch (e) {
        throw msg.error
    }
    
  }
}
Tio.help = Tio.command = ["samehadaku"]
Tio.tags = ["anime", "internet"]

export default Tio