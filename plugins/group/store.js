/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

const {
    proto
} = (await import("@adiwajshing/baileys")).default;

let Tio = async (m, {
    conn,
    text,
    command,
    usedPrefix
}) => {
    let M = proto.WebMessageInfo;

    // Ensure chat list exists
    if (!global.db.data.chats[m.chat].list) global.db.data.chats[m.chat].list = {};
    let msgs = global.db.data.chats[m.chat].list;

    switch (command) {
        case 'addstore':
            if (!m.quoted) throw `Silakan balas pesan dengan perintah *${usedPrefix}${command}*.`;
            if (!text) throw `Penggunaan: ${usedPrefix}${command} <teks>\n\nContoh:\n${usedPrefix}${command} tes`;
            if (text in msgs) throw `[ ${text} ] sudah terdaftar di list store.`;
            msgs[text] = M.fromObject(await m.getQuotedObj()).toJSON();
            return m.reply(`✅ Berhasil menambahkan *${text}* ke list store.\n\nAkses dengan mengetik namanya.`);
break
        case 'updatestore':
            if (!m.quoted) throw `Balas Pesan Dengan Perintah *${usedPrefix}${command}*`;
            if (!text) throw `Penggunaan: ${usedPrefix}${command} <teks>\n\nContoh:\n${usedPrefix}${command} tes`;
            if (!(text in msgs)) throw `[ ${text} ] Tidak Terdaftar Di List Store`;
            msgs[text] = M.fromObject(await m.getQuotedObj()).toJSON();
            return m.reply(`✅ Berhasil update *${text}* ke list store.\n\nAkses dengan mengetik namanya.`);
break
        case 'liststore':
        case 'listshop':
            let listMessages = Object.entries(msgs).map(([nama]) => `├ ${nama}`).join('\n');
            if (listMessages) {
                return await conn.reply(m.chat, `┌「 *Daftar Store* 」\n${listMessages}\n└──────────`, m);
            } else {
                return m.reply(`Belum ada list store.\nKetik *${usedPrefix}addstore <teks>* untuk menambahkan daftar store.`);
            }
break
        case 'getmsg':
            if (!text) throw 'Silakan ketik nama pesan yang ingin diambil.';
            if (!(text in msgs)) throw `Pesan [ ${text} ] tidak ditemukan.`;
            try {
                let _m = conn.serializeM(JSON.parse(JSON.stringify(msgs[text]), (_, v) => {
                    if (v !== null && typeof v === 'object' && 'type' in v && v.type === 'Buffer' && 'data' in v && Array.isArray(v.data)) {
                        return Buffer.from(v.data);
                    }
                    return v;
                }));
                await _m.copyNForward(m.chat, false);
            } catch (e) {
                throw 'Tidak dapat menemukan pesan.';
            }
            break;
        case 'delstore':
            if (!text) throw `Gunakan *${usedPrefix}liststore* untuk melihat daftar store yang tersimpan.`;
            if (!(text in msgs)) throw `[ ${text} ] tidak terdaftar di daftar list.`;
            delete msgs[text];
            return m.reply(`✅ Berhasil menghapus pesan dari daftar list dengan nama: ${text}`);

        default:
            throw 'Perintah tidak dikenal. Silakan coba perintah yang valid.';
    }
};

Tio.help = ['addstore', 'updatestore', 'liststore', 'getmsg', 'delstore'];
Tio.tags = ['store', 'group'];
Tio.group = Tio.admin = true;
Tio.command = /^(addstore|updatestore|liststore|listshop|getmsg|delstore)$/i;
Tio.group = true

Tio.before = async (m) => {
    if (m.isGroup) {
        let chat = global.db.data.chats[m.chat]
if (!chat.list) chat.list = {};
        if (m.chat.endsWith('broadcast') || chat.isBanned || global.db.data.users[m.sender].banned || m.isBaileys) return;
        let msgs = global.db.data.chats[m.chat].list
        if (!(m.text in msgs)) return
        let _m = conn.serializeM(JSON.parse(JSON.stringify(msgs[m.text]), (_, v) => {
            if (
                v !== null &&
                typeof v === 'object' &&
                'type' in v &&
                v.type === 'Buffer' &&
                'data' in v &&
                Array.isArray(v.data)) {
                return Buffer.from(v.data)
            }
            return v
        }))
        await _m.copyNForward(m.chat, false)

    }
}
export default Tio;