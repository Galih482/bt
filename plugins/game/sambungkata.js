/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import { sKata, cKata } from '../../lib/game/sambung-kata.js'

const game = `╔══「 *Kata Bersambung* 」
╟ Game Kata Bersambung adalah
║  permainan yang dimana setiap
║  pemainnya diharuskan membuat
║  kata dari akhir kata yang
║  berasal dari kata sebelumnya.
╚═════`.trim()
const rules = `╔══「 *PERATURAN* 」
╟ Jawaban merupakan kata dasar
║  yaitu tidak mengandung
║  spasi dan imbuhan (me-, -an, dll).
╟ Pemain yang bertahan akan
║  menang dan mendapatkan
║  500xp X jumlah pemain
╟ .skata start untuk memulai
╚═════`.trim()

let poin = 500

let handler = async (m, { conn, text, isPrems, isROwner, usedPrefix, command }) => {
    let isDebug = /debug/i.test(command) && isROwner
    conn.skata = conn.skata ? conn.skata : {}
    let id = m.chat
    let kata = await genKata()
    let room_all = Object.values(conn.skata).find(room => room.id !== id && room.player.includes(m.sender))
    if (room_all) throw `Kamu sedang bermain sambung kata di chat lain, selesaikan game kamu terlebih dahulu`
    if (id in conn.skata) {
        let room = conn.skata[id]
        let member = room.player
        if (room.status == 'play') {
            if (!room.waktu._destroyed && !room.diam) return conn.reply(m.chat, `Hii @${m.sender.split`@`[0]}, Masih ada game berlangsung di chat ini\nTunggu hingga game berakhir\nLalu ikut bergabung`, room.chat, { contextInfo: { mentionedJid: member } }).catch(e => { return !1 })
            delete conn.skata[id]
        }
        if (text == 'start' && room.status == 'wait') {
            if (!member.includes(m.sender)) return m.reply('Kamu belum ikut')
            if (member.length < 2) throw `Minimal 2 orang`
            room.curr = member[0]
            room.status = 'play'
            room.chat = await conn.reply(m.chat, `Saatnya @${member[0].split`@`[0]}\nMulai : *${(room.kata).toUpperCase()}*\n*${room.filter(room.kata).toUpperCase()}... ?*\n*Reply untuk menjawab!*\n"nyerah" untuk menyerah\nTotal: ${member.length} Player`, m, { contextInfo: { mentionedJid: member } })
            room.win_point = 100
            for (let i of room.player) {
                let user = db.data.users[i]
                if (!('skata' in user)) user.skata = 0
            }
            clearTimeout(room.waktu_list)
            room.waktu = setTimeout(() => {
                conn.reply(m.chat, `Waktu jawab habis\n@${room.curr.split`@`[0]} tereliminasi`, room.chat, { contextInfo: { mentionedJid: member } }).then(_ => {
                    room.eliminated.push(room.curr)
                    let index = member.indexOf(room.curr)
                    member.splice(index, 1)
                    room.curr = member[0]
                    if (room.player.length == 1 && room.status == 'play') {
                        db.data.users[member[0]].exp += room.win_point
                        conn.reply(m.chat, `@${member[0].split`@`[0]} Menang\n+${room.win_point}XP`, room.chat, { contextInfo: { mentionedJid: member } }).then(_ => {
                            delete conn.skata[id]
                            return;
                        })
                    }
                    room.diam = true
                    room.new = true
                })
            }, 45000)

        } else if (room.status == 'wait') {
            if (member.includes(m.sender)) throw `Kamu sudah ikut di list`
            member.push(m.sender)
            clearTimeout(room.waktu_list)
            room.waktu_list = setTimeout(() => {
                conn.reply(m.chat, `Sambung kata tidak dimulai (Cancel)`, room.chat).then(() => { delete conn.skata[id] })
            }, 120000)
            let caption = `╔═〘 Daftar Player 〙
${member.map((v, i) => `╟ ${i + 1}. @${v.split`@`[0]}`).join('\n')}
╚════
Sambung kata akan dimainkan sesuai urutan player ( *Bergiliran* )
Dan hanya bisa dimainkan oleh player yang terdaftar`.trim()
            room.chat = await conn.reply(m.chat, `${caption}\n\nKetik\n*${usedPrefix + command}* untuk join/ikut\n*${usedPrefix + command} start* untuk memulai`, m, { contextInfo: { mentionedJid: conn.parseMention(caption) } })
        }
    } else {
        conn.skata[id] = {
            id,
            player: isDebug ? ([owner + info.jid, conn.user.jid, owner + info.jid]) : [],
            status: 'wait',
            eliminated: [],
            basi: [],
            diam: false,
            win_point: 0,
            curr: '',
            kata,
            filter,
            genKata,
            chat: conn.reply(m.chat, `${game}\n${rules}`, m),
            waktu: false
        }
    }
}

function filter(text) {
    let mati = ["q", "w", "r", "t", "y", "p", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"]
    let misah
    if (text.length < 3) return text
    if (/([qwrtypsdfghjklzxcvbnm][qwrtypsdfhjklzxcvbnm])$/.test(text)) {
        let mid = /([qwrtypsdfhjklzxcvbnm])$/.exec(text)[0]
        return mid
    }

    if (/([qwrtypsdfghjklzxcvbnm][aiueo]ng)$/.test(text)) {
        let mid = /([qwrtypsdfghjklzxcvbnm][aiueo]ng)$/.exec(text)[0]
        return mid
    } else if (/([aiueo][aiueo]([qwrtypsdfghjklzxcvbnm]|ng)?)$/i.test(text)) {
        if (/(ng)$/i.test(text)) return text.substring(text.length - 3) 
        else if (/([qwrtypsdfghjklzxcvbnm])$/i.test(text)) return text.substring(text.length - 2)
        else return text.substring(text.length - 1)
    } else if (/n[gy]([aiueo]([qwrtypsdfghjklzxcvbnm])?)$/.test(text)) {
        let nyenye = /n[gy]/i.exec(text)[0]
        misah = text.split(nyenye)
        return nyenye + misah[misah.length - 1]
    } else {
        let res = Array.from(text).filter(v => mati.includes(v))
        let resu = res[res.length - 1]
        for (let huruf of mati) {
            if (text.endsWith(huruf)) {
                resu = res[res.length - 2]
            }
        }
        misah = text.split(resu)
        if (text.endsWith(resu)) {
            return resu + misah[misah.length - 2] + resu
        }
        return resu + misah[misah.length - 1]
    }
}

handler.before = async function (m,{conn}) {
    conn.skata = conn.skata ? conn.skata : {}
    let id = m.chat
    if (!(id in conn.skata)) return;
    let room = conn.skata[id]
    let users = db.data.users
    let _kata = await genKata()
    let member = room.player
    let bonus = rwd(500, 600)
    let lose_skata
    let win_skata
    function mmr(apa = '', jid = '') {
        let user = db.data.users[jid]
        if (apa == 'win') {
            if (user.skata > 5000) win_skata = rwd(5, 9)
            else if (user.skata > 3000) win_skata = rwd(5, 10)
            else if (user.skata > 1500) win_skata = rwd(10, 15)
            else if (user.skata > 1000) win_skata = rwd(15, 20)
            else if (user.skata > 500) win_skata = rwd(20, 30)
            else win_skata = rwd(30, 50)
        } else {
            if (user.skata > 8000) lose_skata = rwd(35, 50)
            else if (user.skata > 5000) lose_skata = rwd(25, 30)
            else if (user.skata > 3000) lose_skata = rwd(20, 25)
            else if (user.skata > 1500) lose_skata = rwd(15, 19)
            else if (user.skata > 1000) lose_skata = rwd(10, 14)
            else if (user.skata > 500) lose_skata = rwd(5, 9)
            else lose_skata = rwd(1, 5)
        }
        if (apa == 'win') return win_skata
        else return lose_skata
    }
    let who
    if (room.new) {
        room.new = false
        room.killer = false
        room.kata = _kata
        room.chat = await conn.reply(m.chat, `Saatnya @${room.curr.split(`@`)[0]}\nMulai : *${(_kata).toUpperCase()}*\n*${room.filter(_kata).toUpperCase()}... ?*\n*Reply untuk menjawab!*\n"nyerah" untuk menyerah\nXP terkumpul: ${room.win_point}\nTersisa: \n${room.player.map((v, i) => i + 1 + '. ' + users[v].name).join('\n')}`, 0, { contextInfo: { mentionedJid: member } })
    }
    if (room.diam) {
        room.diam = false
        room.waktu = setTimeout(() => {
            lose_skata = mmr('lose', room.curr)
            win_skata = (room.killer ? mmr('win', room.killer) : null)
            conn.reply(m.chat, `Waktu jawab habis\n@${room.curr.split`@`[0]} tereliminasi -${lose_skata} MMR${room.killer ? `\n@${room.killer.split`@`[0]} +${win_skata} MMR` : ''}`, room.chat, { contextInfo: { mentionedJid: member } }).then(_ => {
                room.eliminated.push(room.curr)
                if (room.killer) {
                    users[room.killer].skata += win_skata
                    users[room.curr].skata -= lose_skata
                }
                let index = member.indexOf(room.curr)
                member.splice(index, 1)
                if (index == member.length) room.curr = member[0]
                else room.curr = member[index]
                if (member.length == 1 && room.status == 'play') {
                    conn.reply(m.chat, `@${member[0].split`@`[0]} Berhasil bertahan\n+${room.win_point}XP`, room.chat, { contextInfo: { mentionedJid: member } }).then(_ => {
                        users[member[0]].exp += room.win_point
                        delete conn.skata[id]
                        return;
                    })
                } else {
                    room.diam = true
                    room.new = true
                    who = room.curr
                }
            })
        }, 30000)
    }

    if (room.curr == m.sender) {
        if (/nyerah/i.test(m.text)) {
            lose_skata = mmr('lose', room.curr)
            win_skata = (room.killer ? mmr('win', room.killer) : null)
            clearTimeout(room.waktu)
            conn.reply(m.chat, `@${room.curr.split`@`[0]} tereliminasi -${lose_skata} MMR${room.killer ? `\n@${room.killer.split`@`[0]} +${win_skata} MMR` : ''}`, room.chat, { contextInfo: { mentionedJid: member } })
            room.eliminated.push(room.curr)
            if (room.killer) {
                users[room.killer].skata += win_skata
                users[room.curr].skata -= lose_skata
            }
            let index = member.indexOf(room.curr)
            member.splice(index, 1)
            if (index == (member.length)) room.curr = member[0]
            else room.curr = member[index]
            if (member.length == 1 && room.status == 'play') {
                await conn.reply(m.chat, `@${member[0].split`@`[0]} Berhasil bertahan\n+${room.win_point}XP`, room.chat, { contextInfo: { mentionedJid: member } })
                users[member[0]].skata += win_skata
                users[member[0]].exp += room.win_point
                delete conn.skata[id]
                return;
            }
            room.new = true
            room.diam = true
            who = room.curr
        }
        if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/(Mulai|Tersisa) ?:/i.test(m.quoted.text)) return;
        if (m.quoted.id == room.chat.id) {
            let answerF = (m.text.toLowerCase().split` `[0]).trim().replace(/[^a-z]/gi, '')
            let checkF = await cKata(m.text.toLowerCase().split` `[0])
            if (!answerF.startsWith(room.filter(room.kata))) {
                return m.reply(`👎🏻 *Salah!*\nJawaban harus dimulai dari kata *${room.filter(room.kata)}*`)
            } else if (!checkF.status) {
                return m.reply(`👎🏻 *Salah!*\nKata *${m.text.toUpperCase()}* tidak valid!`)
            } else if ((room.filter(room.kata)) == answerF) {
                return m.reply(`👎🏻 *Salah!*\nJawabanmu sama dengan soal, silahkan cari kata lain!`)
            } else if (room.basi.includes(answerF)) {
                return m.reply(`👎🏻 *Salah!*\nKata *${m.text.toUpperCase()}* sudah pernah digunakan!`)
            }
            clearTimeout(room.waktu)
            room.killer = room.curr
            users[m.sender].exp += bonus
            let waktunya = member.indexOf(room.curr)
            room.curr = member[waktunya + 1]
            if (waktunya + 1 >= member.length) room.curr = member[0]
            room.basi.push(answerF)
            room.win_point += 200
            room.chat = await conn.reply(m.chat, `👍+${bonus}XP\nGiliran @${room.curr.split`@`[0]}\n*${room.filter(answerF).toUpperCase()}... ?*\n*Reply untuk menjawab!*\n"nyerah" untuk menyerah\nXP terkumpul: ${room.win_point}\nTersisa: \n${room.player.map((v, i) => i + 1 + '. ' + users[v].name).join('\n')}`, m, { contextInfo: { mentionedJid: member } })
            room.diam = true
            room.kata = answerF
            who = room.curr
            return;
        }
    } else if (room.curr !== m.sender) {
        if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/(Mulai|Tersisa) ?:/i.test(m.quoted.text)) return;
        if (m.quoted.id == room.chat.id) {
            if (room.eliminated.includes(m.sender)) m.reply(`_Hei, kamu sudah tereliminasi, tunggu hingga game ini selesai_\n*Nice Try, next game*`)
            else if (room.player.includes(m.sender)) {
                m.reply(`_Bukan giliranmu.._`)
            } else m.reply(`_*Kamu tidak dapat menjawab soal itu*_\nKarena kamu tidak bergabung dalam game ini\n\nTunggu hingga game ini berakhir, kemudian ikutlah bermain!`)
        } else m.reply(`Soal itu sudah lewat`)
    }
    return;
}

handler.help = ['sambungkata']
handler.tags = ['game']
handler.command = /^s(ambung)?kata(debug)?$/i
handler.group = true

export default handler

async function genKata() {
    let json = await sKata()
    let result = json.kata
    while (result.length < 3) {
        json = await sKata()
        result = json.kata
    }
    return result
}

function rwd(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}