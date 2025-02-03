/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3})?/i;

let Tio = async (m, {
    conn,
    args,
    text,
    usedPrefix,
    command
}) => {
    let teks = text.split(' ');
    let jumlahHari = teks[0] ? parseInt(teks[0]) : null;

    if (!jumlahHari || isNaN(jumlahHari)) {
        throw `Silakan masukkan jumlah hari yang valid!\nContoh: ${usedPrefix + command} 1 https://chat.whatsapp.com/xxx`;
    }
    let res;
    let groupId = m.isGroup ? m.chat : undefined;

    if (!m.isGroup) {
        let [_, code] = teks[1] ? teks[1].match(linkRegex) : [];

        if (!code) {
            throw 'Link yang diberikan tidak valid.';
        }
        res = await conn.groupAcceptInvite(code);
        groupId = res;
    }

    let namaGrup = await conn.getName(groupId);
    let expiredDuration = 86400000 * jumlahHari;
    let now = Date.now();

    if (now < global.db.data.chats[groupId].expired) {
        global.db.data.chats[groupId].expired += expiredDuration;
    } else {
        global.db.data.chats[groupId].expired = now + expiredDuration;
    }

    global.db.data.chats[groupId].rpgs = true;
    global.db.data.chats[groupId].games = true;

    await conn.reply(m.chat, `✅ Berhasil menetapkan masa kadaluarsa grup *${namaGrup}* selama ${jumlahHari} hari.\n\n🕒 Hitung Mundur: ${msToDate(global.db.data.chats[groupId].expired - now)}`, m);
    await conn.reply(groupId, 'Halo semua! Selamat datang di grup!', null);
};

Tio.help = ['addsewa'];
Tio.tags = ['owner'];
Tio.command = /^(addsewa)$/i;
Tio.rowner = true;
Tio.group = false;

export default Tio;

function msToDate(ms) {
    let days = Math.floor(ms / (24 * 60 * 60 * 1000));
    let hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    let minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));

    return `${days} Hari ${hours} Jam ${minutes} Menit`;
}