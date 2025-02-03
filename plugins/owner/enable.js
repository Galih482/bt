/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, {
    conn,
    usedPrefix,
    failed,
    command,
    args,
    isOwner,
    isAdmin,
    dbBot,
    dbChat,
    isROwner
}) => {

    let isEnable = /true|enable|(turn)?on|1/i.test(command)
    let type = (args[0] || '').toLowerCase()
    switch (type) {
        case 'welcome':
            if (m.isGroup && !isAdmin) {
                failed('admin', m, conn)
                throw false
            }
            dbChat[m.chat].welcome = isEnable
            break
        case 'bye':
            if (m.isGroup && !isAdmin) {
                failed('admin', m, conn)
                throw false
            }
            dbChat[m.chat].bye = isEnable
            break
        case 'antinsfw':
            if (m.isGroup && !isAdmin) {
                failed('admin', m, conn)
                throw false
            }
            dbChat[m.chat].antiNsfw = isEnable
            break
        case 'detect':
            if (m.isGroup && !isAdmin) {
                failed('admin', m, conn)
                throw false
            }
            dbChat[m.chat].detect = isEnable
            break
        case 'viewonce':
        case 'antiviewonce':
            if (m.isGroup && !isAdmin) {
                failed('admin', m, conn)
                throw false
            }
            dbChat[m.chat].viewonce = isEnable
            break
        case 'antidelete':
            if (m.isGroup && !isAdmin) {
                failed('admin', m, conn)
                throw false
            }
            dbChat[m.chat].delete = isEnable
            break
        case 'antiedit':
            if (m.isGroup && !isAdmin) {
                failed('admin', m, conn)
                throw false
            }
            dbChat[m.chat].antiedit = isEnable
            break
        case 'public':
            if (!isROwner) {
                failed('rowner', m, conn)
                throw false
            }
            dbBot[conn.user.jid].self = !isEnable
            break
        case 'antilink':
            if (m.isGroup && !isAdmin) {
                failed('admin', m, conn)
                throw false
            }
            dbChat[m.chat].antiLink = isEnable
            break
        case 'antifoto':
            if (m.isGroup && !isAdmin) {
                failed('admin', m, conn)
                throw false
            }
            dbChat[m.chat].antiFoto = isEnable
            break
        case 'antiaudio':
            if (m.isGroup && !isAdmin) {
                failed('admin', m, conn)
                throw false
            }
            dbChat[m.chat].antiAudio = isEnable
            break
        case 'antivideo':
            if (m.isGroup && !isAdmin) {
                failed('admin', m, conn)
                throw false
            }
            dbChat[m.chat].antiVideo = isEnable
            break
        case 'anticall':
            if (!isROwner) {
                failed('rowner', m, conn)
                throw false
            }
            dbBot[conn.user.jid].antiCall = isEnable
            break
        case 'antisticker':
            if (m.isGroup && !isAdmin) {
                failed('admin', m, conn)
                throw false
            }
            dbChat[m.chat].antiSticker = isEnable
            break
        case 'joinonly':
            if (!isROwner) {
                failed('rowner', m, conn)
                throw false
            }
            dbBot[conn.user.jid].mustJoin = isEnable
            break
        case 'onlyprem':
            if (!isROwner) {
                failed('rowner', m, conn)
                throw false
            }
            dbBot[conn.user.jid].onlyprem = isEnable
            break
        case 'antitoxic':
            if (m.isGroup && !isAdmin) {
                failed('admin', m, conn)
                throw false
            }
            dbChat[m.chat].antiToxic = isEnable
            break
        case 'antibadword':
            if (m.isGroup && !isAdmin) {
                failed('admin', m, conn)
                throw false
            }
            dbChat[m.chat].antiBadword = isEnable
            break
        case 'antispam':
            if (m.isGroup && !isAdmin) {
                failed('admin', m, conn)
                throw false
            }
            dbChat[m.chat].antiSpam = isEnable
            break
        case 'game':
            if (m.isGroup && !isAdmin) {
                failed('admin', m, conn)
                throw false
            }
            dbChat[m.chat].games = isEnable
            break
        case 'adminonly':
            if (m.isGroup && !isAdmin) {
                failed('admin', m, conn)
                throw false
            }
            dbChat[m.chat].adminonly = isEnable
            break
        case 'rpg':
            if (m.isGroup && !isAdmin) {
                failed('admin', m, conn)
                throw false
            }
            dbChat[m.chat].rpgs = isEnable
            break
        case 'antibot':
            if (m.isGroup && !isAdmin) {
                failed('admin', m, conn)
                throw false
            }
            dbChat[m.chat].antibot = isEnable
            break
        case 'autoread':
            if (!isROwner) {
                failed('rowner', m, conn)
                throw false
            }
            dbBot[conn.user.jid].autoread = isEnable
            break
        case 'pconly':
        case 'privateonly':
            if (!isROwner) {
                failed('rowner', m, conn)
                throw false
            }
            global.opts['pconly'] = isEnable
            break
        case 'gconly':
        case 'grouponly':
            if (!isROwner) {
                failed('rowner', m, conn)
                throw false
            }
            global.opts['gconly'] = isEnable
            break
        case 'getmsg':
            if (m.isGroup && !isAdmin) {
                failed('admin', m, conn)
                throw false
            }
            dbChat[m.chat].getmsg = isEnable
            break
        case 'viewstory':
            if (!isROwner) {
                failed('rowner', m, conn)
                throw false
            }
            dbBot[conn.user.jid].viewStory = isEnable
            break
        case 'autobio':
            if (!isROwner) {
                failed('rowner', m, conn)
                throw false
            }
            break 
        case 'autoreact':
            if (!isROwner) {
                failed('rowner', m, conn)
                throw false
            }
            dbBot[conn.user.jid].autoReact = isEnable
            break
        case 'backup':
            if (!isROwner) {
                failed('rowner', m, conn)
                throw false
            }
            dbBot[conn.user.jid].backup = isEnable
            break
        default:
            if (!/[01]/.test(command)) {
                if (!m.isGroup) return m.reply(`List Option :
 
▱━━━❲ *Owner* ❳━━━▱

⌜ ${dbBot[conn.user.jid].autoBio ? '✓' : '⛌'}⌟ ➝ Autobio
⌜ ${dbBot[conn.user.jid].autoReact ? '✓' : '⛌'}⌟ ➝ Autoreact
⌜ ${dbBot[conn.user.jid].antiCall ? '✓' : '⛌'}⌟ ➝ Anticall
⌜ ${dbBot[conn.user.jid].autoread ? '✓' : '⛌'}⌟ ➝ auto read
⌜ ${dbBot[conn.user.jid].backup ? '✓' : '⛌'}⌟ ➝ Backup
⌜ ${dbBot[conn.user.jid].mustJoin ? '✓' : '⛌'}⌟ ➝ Joinonly
⌜ ${dbBot[conn.user.jid].onlyprem ? '✓' : '⛌'}⌟ ➝ onlyprem
⌜ ${global.opts['pconly'] ? '✓' : '⛌'}⌟ ➝ PcOnly
⌜ ${global.opts['gconly'] ? '✓' : '⛌'}⌟ ➝ GcOnly 
⌜ ${dbBot[conn.user.jid].viewStory ? '✓' : '⛌'}⌟ ➝ viewStory

Example :
.on welcome <To activate>
.off welcome <To Deactivate>`.toUpperCase());

                if (m.isGroup) return m.reply(`List Option :
 
▱━━━❲ *Group* ❳━━━▱

⌜ ${dbChat[m.chat].getmsg ? '✓' : '⛌'}⌟ ➝ Getmsg
⌜ ${dbChat[m.chat].antibot ? '✓' : '⛌'}⌟ ➝ antibot
⌜ ${dbChat[m.chat].viewonce ? '✓' : '⛌'}⌟ ➝ antiViewOnce
⌜ ${dbChat[m.chat].adminonly ? '✓' : '⛌'}⌟ ➝ adminOnly
⌜ ${dbChat[m.chat].antiNsfw ? '✓' : '⛌'}⌟ ➝ Antinsfw
⌜ ${dbChat[m.chat].welcome ? '✓' : '⛌'}⌟ ➝ welcome
⌜ ${dbChat[m.chat].bye ? '✓' : '⛌'}⌟ ➝ bye
⌜ ${dbChat[m.chat].antiAudio ? '✓' : '⛌'}⌟ ➝ Antiaudio
⌜ ${dbChat[m.chat].antiBadword ? '✓' : '⛌'}⌟ ➝ AntiBadword
⌜ ${dbChat[m.chat].antiLink ? '✓' : '⛌'}⌟ ➝ Antilink
⌜ ${dbChat[m.chat].delete ? '✓' : '⛌'}⌟ ➝ AntiDelete
⌜ ${dbChat[m.chat].antiedit ? '✓' : '⛌'}⌟ ➝ AntiEdit
⌜ ${dbChat[m.chat].antiSpam ? '✓' : '⛌'}⌟ ➝ AntiSpam
⌜ ${dbChat[m.chat].antiSticker ? '✓' : '⛌'}⌟ ➝ AntiSticker
⌜ ${dbChat[m.chat].antiToxic ? '✓' : '⛌'}⌟ ➝ AntiToxic
⌜ ${dbChat[m.chat].detect ? '✓' : '⛌'}⌟ ➝ Detect
⌜ ${dbChat[m.chat].games ? '✓' : '⛌'}⌟ ➝ Game 
⌜ ${dbChat[m.chat].rpgs ? '✓' : '⛌'}⌟ ➝ Rpg

▱━━━❲ *Owner* ❳━━━▱

⌜ ${dbBot[conn.user.jid].autoBio ? '✓' : '⛌'}⌟ ➝ Autobio
⌜ ${dbBot[conn.user.jid].autoReact ? '✓' : '⛌'}⌟ ➝ Autoreact
⌜ ${dbBot[conn.user.jid].antiCall ? '✓' : '⛌'}⌟ ➝ Anticall
⌜ ${dbBot[conn.user.jid].autoread ? '✓' : '⛌'}⌟ ➝ auto read
⌜ ${dbBot[conn.user.jid].backup ? '✓' : '⛌'}⌟ ➝ Backup
⌜ ${dbBot[conn.user.jid].mustJoin ? '✓' : '⛌'}⌟ ➝ Joinonly
⌜ ${dbBot[conn.user.jid].onlyprem ? '✓' : '⛌'}⌟ ➝ onlyprem
⌜ ${global.opts['pconly'] ? '✓' : '⛌'}⌟ ➝ PcOnly
⌜ ${global.opts['gconly'] ? '✓' : '⛌'}⌟ ➝ GcOnly 
⌜ ${dbBot[conn.user.jid].viewStory ? '✓' : '⛌'}⌟ ➝ viewStory

Example :
.on welcome <To activate>
.off welcome <To Deactivate>

`.toUpperCase())
            }
    }
    m.reply(`*[ ❞ ${isEnable ? 'ENABLE' : 'DISABLE'} ❞ ]*
 
- *Type :* ${type} 
- *Pengaturan* : ${isEnable ? '⛌' : '✓'} ➝ *${isEnable ? 'Aktif ✓' : 'Non Aktif ⛌'}*`)
}
Tio.help = ['enable', 'disable']
Tio.tags = ['group', 'owner']
Tio.command = /^((en|dis)able|(turn)?o(n|ff))$/i
export default Tio