/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import fetch from 'node-fetch'
const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i

async function isUrl(url) {
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}
let Tio = async (m, {
    conn,
    text,
    args,
    usedPrefix,
    command
}) => {
    if (!text) return m.reply(await Func.exam(usedPrefix, command, 'https://github.com/user/repo'));
    m.reply(msg.wait)
    if (!isUrl(args[0]) && !args[0].includes('github.com')) return m.reply(`Link invalid!!`)
    let [, user, repo] = args[0].match(regex) || []
    repo = repo.replace(/.git$/, '')
    let url = `https://api.github.com/repos/${user}/${repo}/zipball`
    let name = `${encodeURIComponent(repo)}.zip`
    conn.sendFile(m.chat, url, name, null, m)
}
Tio.help = ['gitclone <link>']
Tio.tags = ['downloader']
Tio.command = /gitclone/i

Tio.limit = true
Tio.register = true

export default Tio