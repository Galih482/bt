/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

let Tio = async (m, {
    conn,
    text,
    args,
    command,
    usedPrefix
}) => {
    const body = m.body
    const budy = (typeof m.text == 'string' ? m.text : '')

    const isCmd = budy.startsWith(usedPrefix);
    const text1 = text.split('|')[0];
    const text2 = text.split('|')[1];
    const text3 = text.split('|')[2];
    switch (command) {
        case 'menfes':
        case 'menfess':
        case 'confes':
        case 'confess':
            if (Object.values(global.db.data.menfess).find(room => room.id.startsWith('menfes') && [room.a, room.b].includes(m.sender))) return m.reply(`Kamu masih berada dalam sesi menfes\nketik ${usedPrefix}stopmenfes untuk stop menfes`)
            if (!text) return m.reply(`Kirim Perintah ${usedPrefix+command} nomor|pesan\n\nContoh :\n${usedPrefix+command} +62xxx|Halo`)
            if (!text.includes('|')) return m.reply(`Kirim Perintah ${usedPrefix+command} nomor|pesan\n\nContoh :\n${usedPrefix+command} +62xxx|Halo`)
            let crush = text1.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
            if (Object.values(global.db.data.menfess).find(room => room.id.startsWith('menfes') && [room.a, room.b].includes(crush))) return m.reply(`Orang yang kamu menfes sedang menfes bersama orang lain :)`)
            if (crush.startsWith('0')) return m.reply(`Awali nomor dengan +62`)
            let cekno = conn.onWhatsApp(crush)
            if (cekno.length == 0) return m.reply(`Masukkan nomor yang valid dan terdaftar di WhatsApp!`)
            if (crush === m.sender) return m.reply(`Tidak bisa menfes diri sendiri!`)
            if (crush === conn.user.jid) return m.reply(`Tidak bisa menfes bot!`)
            let teks_menfes = `Hi 👋 ada menfess nih buat kamu

Pesan : ${text2}

*Balas (Y/N)* untuk menerima atau menolak menfes

_Pesan ini bersifat Rahasia dan Privasi_
_Bot hanya menyampaikan saja_`
            let id = 'menfes_' + Date.now()
            global.db.data.menfess[id] = {
                id: id,
                a: m.sender,
                b: crush,
                status: 'WAITING'
            }
            await conn.sendMessage(crush, {image: { url: 'https://cdn.tioxy.xyz/file/file-1735093827200.jpg' }, caption: teks_menfes })
            await m.reply(`Pesan terkirim ke @${crush.split('@')[0]}\nSilahkan tunggu balasannya!`)
            break
        case 'stop':
        case 'stopmenfess':
        case 'stopmenfes':
        case 'stopconfes':
            let room = Object.values(global.db.data.menfess).find(room => room.id.startsWith('menfes') && [room.a, room.b].includes(m.sender))
            if (!room) return m.reply('Belum ada sesi menfes!')
            let tujuan = room.a == m.sender ? room.b : room.a
            await conn.reply(tujuan, `_Teman chat kamu telah menghentikan menfes ini_`, null)
            await conn.reply(m.chat, '_Menfes berhasil di Berhentikan!_', m)
            delete global.db.data.menfess[room.id]
            break
        default:
    }
}
Tio.before = async function(m, {
    conn,
    usedPrefix
}) {
    const body = m.body
    const budy = (typeof m.text == 'string' ? m.text : '')

    const isCmd = budy.startsWith(usedPrefix);

    if (!m.fromMe && !m.isGroup) {
        let room = Object.values(global.db.data.menfess).find(room => room.status == 'WAITING' && [room.a, room.b].includes(m.sender))
        let teks_menfes = `_Chat Sudah Terhubung Otomatis ✓_
_Sekarang kamu dapat mengirim pesan_
_Atau bisa kirim media seperti_
_Sticker/Audio/Video/Image/VN_

_Dilarang Spam Room Chat_
_Ketahuan : Banned_

_Jika pesan kamu direaction : 📨_
_Tandanya pesan kamu terkirim ke target_

_Ketik /stopmenfes untuk Berhenti menfess_`
        if (room && m.sender == room.b && room.status == 'WAITING') {
            if (m.text.toLowerCase() === 'y') {
                room.status = 'CHATTING'
                await conn.reply(room.a, teks_menfes, null)
                await conn.reply(room.b, teks_menfes, m)
            } else if (m.text.toLowerCase() === 'n') {
                await conn.reply(room.b, 'Menfes berhasil di tolak!', m)
                await conn.reply(room.a, `@${room.b.split('@')[0]} menolak menfes kamu :(`, null)
                delete global.db.data.menfess[room.id]
            } else {
                return m.reply(`Mohon masukkan keyword dengan benar!\n\nKirim Y untuk menerima menfes dan kirim N untuk menolak menfes`)
            }
        }
    }

    if (!m.fromMe && !m.isGroup) {
        let room = Object.values(global.db.data.menfess).find(room => [room.a, room.b].includes(m.sender) && room.status == 'CHATTING')
        if (room) {
            let other = room.a == m.sender ? room.b : room.a
            if (m.mtype == 'extendedTextMessage') {
            await conn.sendMessage(other, {
                image: {
                    url: 'https://cdn.tioxy.xyz/file/file-1735093827200.jpg'
                },
                caption: m.text
            })
            } else {
            await conn.copyNForward(other, m, true, m.quoted && m.quoted.fromMe ? {contextInfo: {...m.msg.contextInfo, participant: other}} : {})
            }
            await m.react('✉️');
        }
    }
}
Tio.tags = ['main']
Tio.help = ['menfes', 'confes', 'stopconfes']
Tio.command = /^(menfe(s|ss)|confe(s|ss)|stop(menfes|menfess|confes|confess))$/i
Tio.register = true
Tio.private = true
Tio.execpt = true

export default Tio