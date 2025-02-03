/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

let Tio = async (m, { text, usedPrefix, command, dbBot, conn }) => {
    if (!dbBot[conn.user.jid]) dbBot[conn.user.jid] = {};
    if (!('listblock' in dbBot[conn.user.jid])) dbBot[conn.user.jid].listblock = [];

    const list = dbBot[conn.user.jid].listblock;

    if (!text) return m.reply(await Func.exam(usedPrefix, command, '62'));

    switch (command) {
        case 'addblock':
            if (list.includes(text)) {
                return m.reply('Awalan nomor sudah ada di database block');
            }
            list.push(text);
            m.reply('Awalan nomor berhasil ditambahkan ke database block');
            break;

        case 'delblock':
            if (!list.includes(text)) {
                return m.reply('Awalan nomor tidak ada di database block');
            }
            const index = list.indexOf(text);
            if (index > -1) {
                list.splice(index, 1);
                m.reply('Awalan nomor berhasil dihapus dari database block');
            }
            break;
    }
};

Tio.before = async (m, { dbBot, conn }) => {

    if (m.fromMe) return;
    
    if (!dbBot[conn.user.jid]) dbBot[conn.user.jid] = {};
    if (!('listblock' in dbBot[conn.user.jid])) dbBot[conn.user.jid].listblock = [];

    const list = dbBot[conn.user.jid].listblock;

    const senderNumber = m.sender.split('@')[0];

    if (list.some(prefix => senderNumber.startsWith(prefix))) {
        await conn.updateBlockStatus(m.sender, 'block');
    }
};

Tio.help = ['addblock', 'delblock'];
Tio.tags = ['owner'];
Tio.rowner = true;
Tio.command = /^(addblock|delblock)$/i;

export default Tio;