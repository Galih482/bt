/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import axios from 'axios';
import qs from 'qs';

let Tio = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    let [user, msg] = text.split`|`
    if (!(user && msg)) throw `Ex: ${usedPrefix + command} username/ngl_link | message`
    let link = /^(http|https):\/\/ngl.link/gi.test(user) ? user : /ngl.link/gi.test(user) ? `https://${user}` : `https://ngl.link/${user}`
    let data = await cekUser(link)
    if (!data) throw 'User not found/Invalid url'
    const regex = /https:\/\/ngl\.link\/([\w.]+)/;
    const users = link.match(regex);
    try {
        let {
            userRegion
        } = await nglink(users[1], msg)
        await m.reply(`Mengirim ke: \`${link}\`
User Region: \`${userRegion}\`
Pesan: \`${msg}\``)
    } catch (e) {
        m.reply(msg.error)
    }
}
Tio.help = ['ngl']
Tio.tags = ['tools']
Tio.command = /^(ngl(ink)?)$/i
Tio.limit = true
export default Tio

async function cekUser(url) {
    return await axios(url).catch(_ => null)
}

async function nglink(user, text) {
    const endpoint = 'https://ngl.link/api/submit';
    const data = qs.stringify({
        username: user,
        question: text,
        deviceId: '',
        gameSlug: '',
        referrer: ''
    });

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Accept': '*/*',
            'X-Requested-With': 'XMLHttpRequest'
        }
    };

    try {
        const response = await axios.post(endpoint, data, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}