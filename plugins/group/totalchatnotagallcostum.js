import { areJidsSameUser  } from '@adiwajshing/baileys';

let Tio = async (m, {
    dbChat,
    text,
    conn,
    participants
}) => {
    if (!dbChat[m.chat]?.totalChat) return m.reply('Tidak ada data chat.');

    // Memisahkan argumen untuk mendapatkan nilai minimum dan maksimum menggunakan '|'
    const args = text.split('|');
    const minMessages = args[0] ? parseInt(args[0].trim()) : 2; // Default ke 2 jika tidak ada argumen
    const maxKick = args[1] ? parseInt(args[1].trim()) : 5; // Default ke 5 jika tidak ada argumen

    if (isNaN(minMessages) || minMessages < 1) {
        return m.reply('Silakan masukkan angka minimum yang valid (minimal 1).');
    }

    if (isNaN(maxKick) || maxKick < 1) {
        return m.reply('Silakan masukkan angka maksimum yang valid (minimal 1).');
    }

    if (args.length > 2 && args[2].trim() === 'reset') {
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
            // Cek jika total chat kurang dari nilai minimum yang ditentukan
            if (value < minMessages) {
                const user = index; // index adalah jid pengguna
                // Cek apakah pengguna bukan admin
                if (user.endsWith('@s.whatsapp.net') && !participants.find(v => areJidsSameUser (v.id, user) && v.admin)) {
                    usersToKick.push(user); // Simpan pengguna yang akan di-kick
                    return `${i + 1}. @${user.split('@')[0]}: ${value} pesan - *Akan di KICK* (kurang dari ${minMessages} pesan)`;
                }
            }
            return `${i + 1}. @${index.split('@')[0]}: ${value} pesan`;
        })
    );

    // Batasi jumlah pengguna yang akan di-kick sesuai dengan maxKick yang ditentukan
    const limitedUsersToKick = usersToKick.filter(user => 
        participants.some(v => areJidsSameUser (v.id, user))
    ).slice(0, maxKick);

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
                if (userMessages < minMessages) {
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

Tio.help = ['kickread [minMessages|maxKick]'];
Tio.tags = ['group', 'info'];
Tio.admin = true;
Tio.group = true;
Tio.register = true;
Tio.premium = true;
Tio.command = /^(kickread)$/i;

export default Tio;