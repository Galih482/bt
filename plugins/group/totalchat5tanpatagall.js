import { areJidsSameUser  } from '@adiwajshing/baileys';

let Tio = async (m, {
    dbChat,
    text,
    conn,
    participants
}) => {
    if (!dbChat[m.chat]?.totalChat) return m.reply('Tidak ada data chat.');

    if (text && text === 'reset') {
        dbChat[m.chat].totalChat = {};
        return m.reply("Total chat telah direset untuk grup ini.");
    }

    const entries = Object.entries(dbChat[m.chat].totalChat);
    const kickedUsers = [];
    const usersToKick = [];

    // Filter entries untuk hanya menampilkan anggota yang ada di dalam grup
    const filteredEntries = entries.filter(([index]) => 
        participants.some(v => areJidsSameUser (v.id, index))
    );

    const total = await Promise.all(
        filteredEntries.map(async ([index, value], i) => {
            // Cek jika total chat kurang dari 2
            if (value < 2) {
                const user = index; // index adalah jid pengguna
                // Cek apakah pengguna bukan admin
                if (user.endsWith('@s.whatsapp.net') && !participants.find(v => areJidsSameUser (v.id, user) && v.admin)) {
                    usersToKick.push(user); // Simpan pengguna yang akan di-kick
                    return `${i + 1}. @${user.split('@')[0]}: ${value} pesan - *Akan di KICK* (kurang dari 2 pesan)`;
                }
            }
            return `${i + 1}. @${index.split('@')[0]}: ${value} pesan`;
        })
    );

    // Batasi jumlah pengguna yang akan di-kick menjadi 5 dan hanya anggota grup
    const limitedUsersToKick = usersToKick.filter(user => 
        participants.some(v => areJidsSameUser (v.id, user))
    ).slice(0, 5);

    if (limitedUsersToKick.length > 0) {
        const kickMessage = limitedUsersToKick.map(user => {
            const userMessages = dbChat[m.chat].totalChat[user] || 0;
            return `@${user.split('@')[0]}: ${userMessages} pesan`;
        }).join('\n');

        // Menampilkan total anggota yang akan di-kick
        const totalToKick = limitedUsersToKick.length;

        m.reply(`*Pengguna berikut akan di-kick dalam 10 menit jika tidak mengirim pesan (Total: ${totalToKick}):*\n${kickMessage}`, null, { mentions: limitedUsersToKick });

        // Tunggu selama 10 menit
        setTimeout(async () => {
            for (const user of limitedUsersToKick) {
                const userMessages = dbChat[m.chat].totalChat[user] || 0;
                if (userMessages < 2) {
                    try {
                        await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
                        kickedUsers.push(user);
                        await conn.sendMessage(user, { text: `Anda telah dikeluarkan dari grup karena tidak mengirim pesan dalam waktu 10 menit. Alasan: Anda hanya mengirim ${userMessages} pesan.` });
                    } catch (error) {
                        console.error(`Gagal mengeluarkan @${user.split('@')[0]}: ${error}`);
                    }
                }
            }

            if (kickedUsers.length > 0) {
                m.reply(`*Sukses Mengeluarkan* ${kickedUsers.map(v => '@' + v.split('@')[0]).join(', ')}`, null, { mentions: kickedUsers });
            }
        }, 10 * 60 * 1000); // 10 menit dalam milidetik
    }
};

Tio.help = ['kickread'];
Tio.tags = ['group', 'info'];
Tio.admin = true;
Tio.group = true;
Tio.register = true;
Tio.premium = true;
Tio.command = /^(kickread)$/i;

export default Tio;