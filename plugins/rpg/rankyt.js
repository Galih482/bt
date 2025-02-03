/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

let Tio = async (m, { conn }) => {
    let users = Object.entries(global.db.data.users)
        .filter(([_, user]) => user.youtubeAccount) 
        .map(([id, user]) => ({
            id,
            name: conn.getName(id) || 'Anonymous',
            subscribers: user.youtubeDetails.subscribers || 0
        }))
        .sort((a, b) => b.subscribers - a.subscribers) 

    if (users.length === 0) {
        conn.reply(m.chat, `Belum ada YouTuber yang terdaftar. Gunakan perintah *createyt* untuk membuat akun YouTube.`, m)
        return
    }

    let leaderboard = users
        .slice(0, 10) 
        .map((user, i) => `${i + 1}. ${user.name} - ${user.subscribers} Subscribers`)
        .join('\n')

    let teks = `🏆 *Ranking YouTuber Terbanyak Subscribers* 🏆\n\n${leaderboard}\n\nTeruslah berkarya untuk menjadi YouTuber terbaik!`

    conn.reply(m.chat, teks, m)
}

Tio.help = ['rankyt']
Tio.tags = ['youtube']
Tio.command = /^(rankyt|youtuberleaderboard)$/i
Tio.group = true
Tio.fail = null

export default Tio