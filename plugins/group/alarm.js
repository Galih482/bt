/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import cron from 'node-cron';

const scheduledTasks = {};

const Tio = async (m, { conn, command, text, participants }) => {
    const chat = global.db.data.chats[m.chat];
    chat.alarm = chat.alarm || [];

    switch (command) {
        case 'addalarm':
            await addAlarm(m, conn, text, chat);
            break;
        case 'delalarm':
            await delAlarm(m, conn, text, chat);
            break;
        case 'listalarm':
            await listAlarms(m, conn, chat);
            break;
    }
};

const addAlarm = async (m, conn, text, chat) => {
    try {
        const [time, name, message, options] = text.split('|').map(v => v.trim());
        const [hour, minute] = time.split(':').map(Number);

        if (!time || isNaN(hour) || isNaN(minute) || !name) {
            return conn.reply(m.chat, 'Format salah! Gunakan: .addalarm <jam:menit>|<nama alarm>|[pesan]|[opsi]', m);
        }

        if (chat.alarm.some(alarm => alarm.name === name)) {
            return conn.reply(m.chat, `❌ Alarm dengan nama "${name}" sudah ada!`, m);
        }

        chat.alarm.push({
            time: `${hour}:${minute}`,
            name,
            message: message || '⏰ Alarm aktif!',
            options
        });

        startAlarm(m.chat, conn, {
            time: `${hour}:${minute}`,
            name,
            message: message || '⏰ Alarm aktif!',
            options
        });

        conn.reply(m.chat, `✅ Alarm "${name}" berhasil ditambahkan pada ${hour}:${minute} WIB.`, m);
    } catch (e) {
        console.error(e);
        conn.reply(m.chat, '❌ Terjadi kesalahan saat menambahkan alarm!', m);
    }
};

const delAlarm = async (m, conn, text, chat) => {
    try {
        const name = text.trim();

        if (!name) {
            return conn.reply(m.chat, 'Format salah! Gunakan: .delalarm <nama alarm>', m);
        }

        const index = chat.alarm.findIndex(alarm => alarm.name === name);
        if (index === -1) {
            return conn.reply(m.chat, `❌ Alarm "${name}" tidak ditemukan.`, m);
        }

        const taskId = `${m.chat}-${name}`;
        if (scheduledTasks[taskId]) {
            scheduledTasks[taskId].stop();
            delete scheduledTasks[taskId];
        }

        chat.alarm.splice(index, 1);

        conn.reply(m.chat, `✅ Alarm "${name}" berhasil dihapus.`, m);
    } catch (e) {
        console.error(e);
        conn.reply(m.chat, '❌ Terjadi kesalahan saat menghapus alarm!', m);
    }
};

const listAlarms = async (m, conn, chat) => {
    try {
        if (chat.alarm.length === 0) {
            return conn.reply(m.chat, '❌ Tidak ada alarm yang terdaftar.', m);
        }

        let message = '⏰ *Daftar Alarm* ⏰\n\n';
        chat.alarm.forEach((alarm, index) => {
            message += `${index + 1}. *${alarm.name}*\n   Jam: ${alarm.time} WIB\n   Pesan: ${alarm.message}\n   Opsi: ${alarm.options || '-'}\n\n`;
        });

        conn.reply(m.chat, message.trim(), m);
    } catch (e) {
        console.error(e);
        conn.reply(m.chat, '❌ Terjadi kesalahan saat menampilkan daftar alarm!', m);
    }
};

const startAlarm = (chatId, conn, alarm) => {
    const { time, name, message, options } = alarm;
    const [hour, minute] = time.split(':').map(Number);
    const cronExpression = `${minute} ${hour} * * *`;
    const taskId = `${chatId}-${name}`;

    if (scheduledTasks[taskId]) {
        return;
    }

    const task = cron.schedule(
        cronExpression,
        async () => {
            const participants = await conn.groupMetadata(chatId).then(meta => meta.participants);
            const mentions = participants.map(p => p.id);

            if (options === 'groupopen' || options === 'groupclose') {
                const isClose = options === 'groupopen' ? 'not_announcement' : 'announcement';
                conn.groupSettingUpdate(chatId, isClose).catch(e => console.error(e));
            }

            conn.sendMessage(chatId, { text: `${message}`, mentions }, { quoted: null });
        },
        { timezone: 'Asia/Jakarta' }
    );

    scheduledTasks[taskId] = task;
};

const reloadAlarms = (conn) => {
    Object.keys(global.db.data.chats).forEach(chatId => {
        const chat = global.db.data.chats[chatId];
        chat.alarm = chat.alarm || [];
        chat.alarm.forEach(alarm => {
            startAlarm(chatId, conn, alarm);
        });
    });
};

setInterval(() => {
    Object.keys(global.db.data.chats).forEach(chatId => {
        const chat = global.db.data.chats[chatId];
        chat.alarm = chat.alarm || [];
        chat.alarm.forEach(alarm => {
            const taskId = `${chatId}-${alarm.name}`;
            if (!scheduledTasks[taskId]) {
                startAlarm(chatId, global.conn, alarm);
            }
        });
    });
}, 30000);

setTimeout(() => reloadAlarms(global.conn), 1000);

Tio.help = [
    'addalarm <jam:menit>|<nama alarm>|[pesan]|[opsi]',
    'delalarm <nama alarm>',
    'listalarm'
];
Tio.tags = ['tools'];
Tio.command = /^(addalarm|delalarm|listalarm)$/i;
Tio.group = true;
Tio.admin = true;

export default Tio;