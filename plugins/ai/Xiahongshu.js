/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import axios from "axios";

async function Tio(m, {
    conn,
    text,
    usedPrefix,
    command
}) {
    if (!text) return m.reply(await Func.exam(usedPrefix, command, ' king of dark'));
    try {
        m.reply(msg.wait);
        let result = await xhs_ai(text);
        await m.reply(result);
    } catch (e) {
        m.reply(msg.error)
    }
}
Tio.help = ["xiahongshu-ai"];
Tio.tags = ["ai"];
Tio.limit = true;
Tio.command = /^(x(ia)?h(ong)?s(hu)?(-|_)?ai)$/i
export default Tio;

async function xhs_ai(text) {
    const postData = {
        text,
        genLen: "短",
        withTitle: true,
        useEmoji: true,
        withTag: true,
        lang: "en",
        stream: true
    };

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    let {
        data
    } = await axios.post('https://easycomment.ai/api/xhs/v1/content-generate', postData, config)
    return data
}