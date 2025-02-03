/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import axios from 'axios';

let Tio = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    if (!text) return m.reply(await Func.exam(usedPrefix, command, 'hai'))
    try {
        await m.react('✨');
        const result = await shinon(text);
        
        await m.reply(result);
    } catch (err) {
        m.reply(msg.error);
    }
}
Tio.help = Tio.command = ['shinon']
Tio.tags = ['ai']

export default Tio

async function shinon(prompt) {
    let data = new URLSearchParams();
    data.append('currentChatStyleId', '1');
    data.append('mediaType', '2');
    data.append('needLive2D', '2');
    data.append('secretSceneId', 'wHp7z');
    data.append('selectId', '98399308486');
    data.append('speechText', prompt);

    let headers = {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
        'Cookie': 'session=9997156d23496b9ff96fc09d162191f74821790eaa4ecc52096273a60f517ad3',
    };

    try {
        let {
            data: respon
        } = await axios.post('https://api.polybuzz.ai/api/conversation/msgbystream', data, {
            headers
        });
        const result = respon.split('\n')
            .filter(line => line.trim())
            .map(line => {
                try {
                    const json = JSON.parse(line.trim());
                    return json.content || '';
                } catch (e) {
                    console.error("Invalid JSON:", line);
                    return '';
                }
            })
            .join('');
        return result;
    } catch (e) {
        console.error(e);
        return null;
    }
}