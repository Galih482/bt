/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

let Tio = async (m, { conn, command }) => {
    let user = global.db.data.users[m.sender]

    if (!user.youtubeAccount) {
        user.youtubeAccount = false
        user.youtubeDetails = {
            subscribers: 0,
            likes: 0,
            viewers: 0,
            videos: 0
        }
        user.youtubeLive = false
        user.lastYouTube = 0
    }

    let __timers = (new Date - user.lastYouTube)
    let _timers = (3600000 - __timers) 
    let timers = clockString(_timers)

    switch (command) {
        case 'createyt':
            if (user.youtubeAccount) {
                conn.reply(m.chat, `Kamu sudah memiliki akun YouTube!`, m)
            } else {
                user.youtubeAccount = true
                user.youtubeDetails = {
                    subscribers: 0,
                    likes: 0,
                    viewers: 0,
                    videos: 0
                }
                conn.reply(m.chat, `Akun YouTube berhasil dibuat! Mulailah membangun channel YouTube-mu dengan membuat video atau live streaming.\nPerintah live: .liveyt`, m)
            }
            break

        case 'liveyt':
            if (!user.youtubeAccount) {
                conn.reply(m.chat, `Kamu belum memiliki akun YouTube. Gunakan perintah *createyt* untuk membuat akun.`, m)
            } else if (user.youtubeLive) {
                conn.reply(m.chat, `Kamu sudah sedang live di YouTube!`, m)
            } else if (new Date - user.lastYouTube < 3600000) {
                conn.reply(m.chat, `Tunggu ${timers} lagi untuk bisa live di YouTube.`, m)
            } else {
                user.youtubeLive = true
                user.lastYouTube = new Date * 1

                let viewers = Math.floor(Math.random() * (500 - 50 + 1)) + 50 
                let likes = Math.floor(viewers * (Math.random() * (0.5 - 0.1) + 0.1))
                let subscribers = Math.floor(viewers * (Math.random() * (0.1 - 0.01) + 0.01))

                let teks = [
                    `📡 Kamu memulai live di YouTube...`,
                    `👥 Penonton mulai berdatangan: ${Math.floor(viewers * 0.2)} viewers`,
                    `👍 Beberapa penonton mulai menyukai live: ${Math.floor(likes * 0.2)} likes`,
                    `🔔 Subscriber baru bertambah: ${Math.floor(subscribers * 0.2)} subscribers`,
                    `👥 Penonton bertambah menjadi: ${Math.floor(viewers * 0.5)} viewers`,
                    `👍 Likes semakin banyak: ${Math.floor(likes * 0.5)} likes`,
                    `🔔 Subscriber baru lagi: ${Math.floor(subscribers * 0.5)} subscribers`,
                    `🎉 Live selesai! Hasil akhir:
- Viewers: ${viewers}
- Likes: ${likes}
- Subscribers Baru: ${subscribers}`
                ]

                let { key } = await conn.sendMessage(m.chat, { text: teks[0] }, { quoted: m })

                for (let i = 1; i < teks.length; i++) {
                    await delay(3000) 
                    await conn.sendMessage(m.chat, { text: teks[i], edit: key }, { quoted: m })
                }

                user.youtubeDetails.viewers += viewers
                user.youtubeDetails.likes += likes
                user.youtubeDetails.subscribers += subscribers
                user.youtubeDetails.videos += 1

                user.youtubeLive = false 
            }
            break

        case 'akunyt':
            if (!user.youtubeAccount) {
                conn.reply(m.chat, `Kamu belum memiliki akun YouTube. Gunakan perintah *createyt* untuk membuat akun.`, m)
            } else {
                let { subscribers, likes, viewers, videos } = user.youtubeDetails
                conn.reply(
                    m.chat,
                    `Detail Akun YouTube Kamu:
- Subscribers: ${subscribers}
- Likes: ${likes}
- Viewers: ${viewers}
- Video: ${videos}

Terus berkarya dan bangun channel YouTube-mu!`,
                    m
                )
            }
            break
            case 'hapusakunyt':
            if (!user.youtubeAccount) {
                conn.reply(m.chat, `Kamu belum memiliki akun YouTube untuk dihapus.`, m)
            } else {
                user.youtubeAccount = false
                user.youtubeDetails = {
                    subscribers: 0,
                    likes: 0,
                    viewers: 0,
                    videos: 0
                }
                user.youtubeLive = false
                user.lastYouTube = 0

                conn.reply(m.chat, `Akun YouTube kamu telah dihapus. Semua data terkait akun YouTube juga telah dihapus.`, m)
            }
            break
        default:
            conn.reply(m.chat, `Perintah tidak ditemukan.`, m)
            break
    }
}

Tio.help = ['createyt', 'hapusakunyt', 'liveyt', 'akunyt']
Tio.tags = ['rpg']
Tio.command = /^(hapusakunyt|createyt|liveyt|akunyt)$/i
Tio.group = true
Tio.fail = null

export default Tio

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, ' *Jam*\n ', m, ' *Menit*\n ', s, ' *Detik* '].map(v => v.toString().padStart(2, 0)).join('')
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}