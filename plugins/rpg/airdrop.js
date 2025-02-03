let airDropInterval = 2 * 60 * 60 * 1000; // Interval 2 jam

conn.activeChats = conn.activeChats || {};
conn.activeChatsInitialized = conn.activeChatsInitialized || false;

const initAirDrop = async (conn, dbChat) => {
    let allChats = Object.keys(dbChat);

    allChats.forEach(chatId => {
        if (!dbChat[chatId].airdrop) {
            dbChat[chatId].airdrop = {
                droppedAt: 0,
                usersOpened: [],
                reward: {}
            };
        }

        startAirDropTimer(chatId, conn, dbChat);
    });
};

const startAirDropTimer = (chatId, conn, dbChat) => {
    if (conn.activeChats[chatId]) clearInterval(conn.activeChats[chatId]);

    conn.activeChats[chatId] = setInterval(() => {
        let chat = dbChat[chatId];
        let now = Date.now();

        if (now - chat.airdrop.droppedAt >= airDropInterval) {
            chat.airdrop = {
                droppedAt: now,
                usersOpened: [],
                reward: {
                    limit: Math.floor(Math.random() * 100) + 1,
                    money: Math.floor(Math.random() * 100000) + 500,
                    exp: Math.floor(Math.random() * 2000) + 100
                }
            };

            conn.sendMessage(chatId, {
                image: { url: 'https://cdn.tioxy.xyz/file/file-1736302920159.jpg' },
                caption: `🎉 *AirDrop Baru Tiba!* 🎉  
🚨 Jangan lewatkan kesempatan besar ini!  
💥 Hadiah menarik menanti kamu!  
👉 Balas pesan ini dengan *.openbox* dan buka kotaknya sekarang juga! 🤑💰✨`
            });
        }
    }, 60 * 1000); 
};

let Tio = async (m, { conn, dbUser, dbChat }) => {
    let chat = dbChat[m.chat];
    let user = dbUser[m.sender];

    if (!chat.airdrop) return conn.reply(m.chat, `⚠️ *Tidak ada AirDrop aktif* di grup ini! 😓 Ayo tunggu AirDrop berikutnya!`, m);

    if (chat.airdrop.usersOpened.includes(m.sender)) {
        return conn.reply(m.chat, `⚠️ *Kamu sudah membuka AirDrop ini sebelumnya!* 🎁 Jangan khawatir, masih ada banyak AirDrop lainnya! 💥`, m);
    }

    user.limit = (user.limit || 0) + chat.airdrop.reward.limit;
    user.money = (user.money || 0) + chat.airdrop.reward.money;
    user.exp = (user.exp || 0) + chat.airdrop.reward.exp;

    chat.airdrop.usersOpened.push(m.sender);

    return conn.reply(m.chat, `🎉 *Selamat!* Kamu berhasil membuka AirDrop! 🎁  
Dapatkan hadiah berikut:
- 📦 *Limit:* ${chat.airdrop.reward.limit}
- 💰 *Uang:* ${chat.airdrop.reward.money}
- ✨ *EXP:* ${chat.airdrop.reward.exp}

🌟 Jangan lewatkan AirDrop berikutnya yang lebih seru dan lebih besar!  
💬 Aktif terus di grup untuk lebih banyak kejutan! 🎊`
, m);
};

Tio.before = async function (m) {
    if (!m.isGroup) return; // Pastikan hanya berjalan di grup
    if (!conn.activeChatsInitialized) {
        conn.activeChatsInitialized = true;
        await initAirDrop(global.conn, global.db.data.chats);
    }
};

Tio.command = ['openbox'];
Tio.tags = ['main'];
Tio.help = ['openbox'];
Tio.group = true;

export default Tio;

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
