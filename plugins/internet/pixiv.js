/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import axios from 'axios'

let Tio = async (m, {
    conn,
    command,
    text,
    usedPrefix
}) => {

    if (!text) return m.reply(await Func.exam(usedPrefix, command, 'cat'));

    try {
        await m.reply(msg.wait)
        let result = await pixiv(text);
        await conn.sendMessage(m.chat, {
            image: result,
            caption: 'Done'
        }, {
            quoted: m
        })
    } catch (e) {
        throw eror
    }
}
Tio.help = Tio.command = ['pixiv']
Tio.tags = ['internet']
export default Tio

async function pixiv(word) {
    const url = 'https://www.pixiv.net/touch/ajax/tag_portal';
    const params = {
        word,
        lang: 'en',
        version: 'b355e2bcced14892fe49d790ebb9ec73d2287393'
    };
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36',
        'Referer': 'https://www.pixiv.net/',
        'Accept-Encoding': 'gzip, deflate, br'
    };
    const {
        data
    } = await axios.get(url, {
        params,
        headers
    });
    const illusts = data.body.illusts;
    const randomIllust = illusts[Math.floor(Math.random() * illusts.length)].url;
    const image = await axios.get(randomIllust, {
        responseType: 'arraybuffer',
        headers
    });

    return image.data;
}