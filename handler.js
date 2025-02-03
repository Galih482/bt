import { smsg } from './lib/simple.js'
import { format } from 'util'
import { fileURLToPath } from 'url'
import path, { join } from 'path'
import {
    unwatchFile,
    watchFile
} from 'fs'
import chalk from 'chalk'
import moment from 'moment-timezone'
import DATA from "./system/database/DB_LOCAL.js"
import { failed } from "./system/failed.js"
const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(function() {
    clearTimeout(conn)
    resolve()
}, ms))


export async function handler(chatUpdate) {
    if (!chatUpdate)
        return
    this.pushMessage(chatUpdate.messages).catch(console.error)
    let m = chatUpdate.messages[chatUpdate.messages.length - 1]


    if (!m)
        return
        
    if (global.db.data == null)
        await global.loadDatabase()
    try {
        m = smsg(this, m) || m
        if (!m)
            return
        m.exp = 0
        m.limit = false
        try {
            DATA(m, conn)
        } catch (e) {
            console.error(e)
        }
        const isROwner = [conn.decodeJid(global.conn.user.id), global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const isOwner = isROwner || db.data.users[m.sender].owner == true
        const isPrems = isROwner || db.data.users[m.sender].premium == true
        const dbUser = db.data.users,
            dbChat = db.data.chats,
            dbBot = db.data.settings;
            
     if (dbBot[conn.user.jid].autoReact && m.key.remoteJid == "status@broadcast") {
    conn.sendMessage(m.key.remoteJid, {
        react: {
            text: await emoji(),
            key: m.key
        }
    }, {
        statusJidList: [m.key.participant, m.sender]
    }).catch(() => {
        false
    });
}
        if (!(m.fromMe || isROwner) && dbBot[conn.user.jid].self)
            return
        if (typeof m.text !== 'string')
            m.text = ''
        if (m.isBaileys)
             return 
        if (m.isGroup) {
        if (!(m.sender in dbChat[m.chat].totalChat)) {
        dbChat[m.chat].totalChat[m.sender] = 1
        } else {
        dbChat[m.chat].totalChat[m.sender] += 1
        }
        }
        m.exp += Math.ceil(Math.random() * 10)
        let usedPrefix
        let _user = global.db.data && dbUser && dbUser[m.sender]
        const groupMetadata = (m.isGroup ? ((conn.chats[m.chat] || {}).metadata || await this.groupMetadata(m.chat).catch(_ => null)) : {}) || {}
        const participants = (m.isGroup ? groupMetadata.participants : []) || []
        const user = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) === m.sender) : {}) || {}
        const bot = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) == this.user.jid) : {}) || {}
        const isRAdmin = user?.admin == 'superadmin' || false
        const isAdmin = isRAdmin || user?.admin == 'admin' || false 
        const isBotAdmin = bot?.admin || false
        
        const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), 'plugins')
        for (let name in global.plugins) {
            let plugin = global.plugins[name]
            if (!plugin)
                continue
            if (plugin.disabled)
                continue
            const __filename = join(___dirname, name)
            if (typeof plugin.all === 'function') {
                try {
                    await plugin.all.call(this, m, {
                        chatUpdate,
                        conn: this,
                        participants,
                        groupMetadata,
                        Func,
                        failed,
                        dbUser,
                        usedPrefix,
                        dbChat,
                        dbBot,
                        isROwner,
                        isOwner,
                        isRAdmin,
                        isAdmin,
                        isBotAdmin,
                        isPrems,
                        __dirname: ___dirname,
                        __filename
                    })
                } catch (e) {
                    console.error(e)
                    if (global.owner) {
                        let jids = `${global.owner}${global.info.jid}`
                        let data = (await conn.onWhatsApp(jids))[0] || {}
                        if (data.exists)
                            m.reply(`\`ERROR\`
 
Plugins : ${m.plugin}
Pengirim : wa.me/${m.sender.split('@')[0]}
Chat : ${m.chat} ( ${conn.getName(m.chat)} )
Perintah : ${usedPrefix}${command} ${args.join(' ')}

${text}`.trim(), data.jid)
                    }
                }
            }

            const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
            let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix
            let match = (_prefix instanceof RegExp ? [
                    [_prefix.exec(m.text), _prefix]
                ] :
                Array.isArray(_prefix) ?
                _prefix.map(p => {
                    let re = p instanceof RegExp ?
                        p :
                        new RegExp(str2Regex(p))
                    return [re.exec(m.text), re]
                }) :
                typeof _prefix === 'string' ? [
                    [new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]
                ] : [
                    [
                        [], new RegExp
                    ]
                ]
            ).find(p => p[1])
            if (typeof plugin.before === 'function') {
                if (await plugin.before.call(this, m, {
                        chatUpdate,
                        match,
                        usedPrefix,
                        conn: this,
                        participants,
                        groupMetadata,
                        Func,
                        failed,
                        dbChat,
                        dbUser,
                        dbBot,
                        isROwner,
                        isOwner,
                        isRAdmin,
                        isAdmin,
                        isBotAdmin,
                        isPrems,
                        __dirname: ___dirname,
                        __filename
                    }))
                    continue
            }
            
            if (typeof plugin !== 'function')
                continue
            if (!opts.noprefix) {
                opts["noprefix"] = false;
            }
            let isAcc = (match && match[0] !== null) || (opts["noprefix"] && match && m);

            if (isAcc) {
                let result;

                if (opts["noprefix"]) {
                    result = match ? (match[0] || "")[0] : null;
                } else if (!opts["noprefix"]) {
                    result = match ? (match[0] || "")[0] : null;
                } else {
                    result = null;
                }

                usedPrefix = result;
                let noPrefix = !result ? m.text : m.text?.replace(result, "");
                let args_v2 = noPrefix.trim().split(/ +/);
                let [command, ...args] = noPrefix.trim().split(" ").filter(v => v);
                args = args || []
                let _args = noPrefix.trim().split` `.slice(1)
                let text = _args.join` `

                command = (command || '').toLowerCase()
                let fail = plugin.fail || failed

                const prefixCommand = !result ?
                    plugin.customPrefix || plugin.command :
                    plugin.command;
                let isAccept =
                    (prefixCommand instanceof RegExp && prefixCommand.test(command)) ||
                    (Array.isArray(prefixCommand) &&
                        prefixCommand.some((cmd) =>
                            cmd instanceof RegExp ? cmd.test(command) : cmd === command,
                        )) ||
                    (typeof prefixCommand === "string" && prefixCommand === command);
                m.prefix = !!result;
                usedPrefix = !result ? "" : result;

                if (!isAccept)
                    continue
                m.plugin = name
                                if (m.chat in dbChat || m.sender in dbUser) {
                    let chat = dbChat[m.chat]
                    if (chat?.isBanned && !isROwner)
                        return 
                }
                if (!m.isGroup && dbBot[conn.user.jid].mustJoin && !Object.values((await conn.groupMetadata(config.idGrup)).participants).find(users => users.id == m.sender)) {
                failed('joinonly', m, conn)
                continue 
}
                if (opts['pconly'] && !isROwner && m.chat.endsWith('g.us')) {
                failed('pconly', m, conn)
                continue 
                }
                if (!m.isGroup && opts['gconly'] && !m.chat.endsWith('g.us') && !isROwner) {
                failed('gconly', m, conn)
                continue 
                }
                if (!m.isGroup && global.db.data.settings[conn.user.jid].onlyprem && !(isPrems || plugin.execpt)) {
                failed('premiumOnly', m, conn)
                continue 
}
                if (m.isGroup && dbChat[m.chat].adminonly && !isAdmin) {
                failed('adminOnly', m, conn)
                continue 
}
                if (m.isGroup && !db.data.chats[m.chat].games && plugin.tags && plugin.tags.includes("game")) {
                failed('game', m, conn)
                continue
                }
                if (m.isGroup && !db.data.chats[m.chat].rpgs && plugin.tags && plugin.tags.includes("rpg")) {
                failed('rpg', m, conn)
                continue
                }
                if (plugin.rowner && !isROwner) { 
                    failed('rowner', m, conn)
                    continue
                }
                if (plugin.owner && !isOwner) { 
                    failed('owner', m, conn)
                    continue
                }
                if (plugin.premium && !isPrems) {
                    failed('premium', m, conn)
                    continue
                }
                if (plugin.group && !m.isGroup) {
                    failed('group', m, conn)
                    continue
                }
                if (plugin.botAdmin && !isBotAdmin) { 
                    failed('botAdmin', m, conn)
                    continue
                }
                if (plugin.admin && !isAdmin) {
                    failed('admin', m, conn)
                    continue
                }
                if (plugin.private && m.isGroup) { 
                    failed('pconly', m, conn)
                    continue
                }
                if (plugin.register == true && _user.registered == false) {
                    failed('unreg', m, conn)
                    continue
                }
                m.isCommand = true
                let xp = 'exp' in plugin ? parseInt(plugin.exp) : 23 
                m.exp += xp
                if (!isPrems && plugin.limit && dbUser[m.sender].limit < plugin.limit * 1) {
                    this.reply(m.chat, await Func.style(`➠ Limit Kamu Mencapai Batas.\nUpgrade ke Premium atau Claim Limit Harian.`, 1), m)
                    continue
                }
                if (plugin.level > _user.level) {
                    this.reply(m.chat, `Diperlukan Level\n➠ ${plugin.level}\n➠ *Level Kamu:* ${_user.level}`, m)
                    continue 
                }
                let extra = {
                    match,
                    usedPrefix,
                    noPrefix,
                    args,
                    command,
                    text,
                    Func,
                    failed,
                    conn: this,
                    participants,
                    groupMetadata,
                    dbBot,
                    dbUser,
                    dbChat,
                    isROwner,
                    isOwner,
                    isRAdmin,
                    isAdmin,
                    isBotAdmin,
                    isPrems,
                    __dirname: ___dirname,
                    __filename
                }
                try {
                    await plugin.call(this, m, extra)
                    if (!isPrems) {
                        m.limit = m.limit || plugin.limit || false
                    }
                } catch (e) {
                    m.error = e
                    console.error(e)
                    if (e) {
                        let text = format(e)
                        if (e.name)
                            if (global.owner) {
                                let jids = `${global.owner}${global.info.jid}`
                                let data = (await conn.onWhatsApp(jids))[0] || {}
                                if (data.exists)
                                    m.reply(`\`ERROR\`
 
Plugins : ${m.plugin}
Pengirim : wa.me/${m.sender.split('@')[0]}
Chat : ${m.chat} ( ${conn.getName(m.chat)} )
Perintah : ${usedPrefix}${command} ${args.join(' ')}

${text}`.trim(), data.jid)
                            }
                        m.reply(text)
                    }
                } finally {
                    if (typeof plugin.after === 'function') {
                        try {
                            await plugin.after.call(this, m, extra)
                        } catch (e) {
                            console.error(e)
                        }
                    }
                }
                break
            }
        }
    } catch (e) {
        console.error(e)
    } finally {
        let user, stats = global.db.data.stats
        let dbUser = global.db.data.users
        if (m) {
            if (m.sender && (user = db.data.users[m.sender])) {
                user.exp += m.exp
                user.limit -= m.limit * 1
                if (m.limit) return m.reply(`➠ Limit telah Digunakan: ${m.limit * 1}\n➠ Tersisa: ❞ ${dbUser[m.sender].limit} Limit. ❞`)
            }

            let stat
            if (m.plugin) {
                let rn = ['composing']
                if (config.typing) return conn.sendPresenceUpdate(rn, m.chat)
                let now = +new Date
                if (m.plugin in stats) {
                    stat = stats[m.plugin]
                    if (!isNumber(stat.total)) stat.total = 1
                    if (!isNumber(stat.success)) stat.success = m.error != null ? 0 : 1
                    if (!isNumber(stat.last)) stat.last = now
                    if (!isNumber(stat.lastSuccess)) stat.lastSuccess = m.error != null ? 0 : now
                } else stat = stats[m.plugin] = {
                    total: 1,
                    success: m.error != null ? 0 : 1,
                    last: now,
                    lastSuccess: m.error != null ? 0 : now
                }
                stat.total += 1

                stat.last = now
                if (m.error == null) {
                    stat.success += 1
                    stat.lastSuccess = now
                }

            }
        }

        try {
            if (!opts['noprint']) await (await import(`./lib/print.js`)).default(m, conn)
        } catch (e) {
            console.log(m, m.quoted, e)
        }
        if (global.db.data.settings[this.user.jid].autoread) await this.readMessages([m.key])
    }
}

async function emoji() {
    let emo = [
        "😀", "😂", "😍", "🥺", "😎", "😢", "😡", "😱", "👍", "👎",
        "👏", "💪", "🙏", "🎉", "🎂", "🌟", "🌈", "🔥", "🍎", "🍕",
        "🍔", "🍟", "🍣", "🍜", "🎸", "🎧", "🎤", "🎬", "🏆", "⚽",
        "🏀", "🏈", "🏊", "🚴", "🚗", "✈️", "🚀", "🚂", "🏠", "🌍"
    ];
    
    let randomIndex = Math.floor(Math.random() * emo.length);
    return emo[randomIndex];
}

let file = global.__filename(import.meta.url, true)
watchFile(file, async () => {
    unwatchFile(file)
    console.log(chalk.redBright("Update 'handler.js'"))
    if (global.reloadHandler) console.log(await global.reloadHandler())
})