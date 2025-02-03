/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import axios from 'axios'

let handler = async (m, {
            text,
            conn,
            command,
            usedPrefix
        }) => {

            if (!text) return m.reply(await Func.exam(usedPrefix, command, 'https://github.com/sadxzyq'));

            conn.sendMessage(m.chat, {
                react: {
                    text: '🕒',
                    key: m.key,
                }
            })
            const {
                qurl,
                tinyurl
            } = await shortUrl(text);
            await m.reply(`- Qurl: ${qurl}\n- Tinyurl: ${tinyurl}`);

}

handler.help = ['shorturl', 'shortlink']
handler.tags = ['tools']
handler.command = /^(shorturl|shortlink)$/i
handler.limit = true

export default handler

async function shortUrl(url, alias = '') {
    try {
        let {
            data: tinyurl
        } = await axios.get('https://tinyurl.com/api-create.php?url=' + encodeURIComponent(url));
        const response = await axios.get('https://qurl.us.kg/api/create', {
            params: {
                alias,
                url
            },
            headers: {
                'Accept': 'application/json, text/plain, */*'
            }
        });

        return {
                qurl: response.data.response.short,
                tinyurl
            }

    } catch (error) {
        return error
    }
}