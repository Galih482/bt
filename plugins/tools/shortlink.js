/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import axios from 'axios'

let Tio = async (m, {
    text,
    conn,
    args,
    command,
    usedPrefix
}) => {
    
    if (!text) return m.reply(await Func.exam(usedPrefix, command, 'https://github.com/sadxzyq'))
    if (!/https?:\/\//.test(text)) return m.reply('Harus link');
    
    const result = await shortlink(text)
    conn.reply(m.chat, '*Link* : ' + result, m)

}

Tio.help = ['tinyurl']
Tio.tags = ['tools']
Tio.command = /^(tinyurl)$/i
Tio.limit = true;

export default Tio

async function shortlink(url) {

    const result = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
    return result.data;
    
}