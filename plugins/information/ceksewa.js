/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    if (db.data.chats[m.chat].expired < 1) throw `Grup ini tidak diset untuk sewa!`

    let who
    if (m.isGroup) who = args[1] ? args[1] : m.chat
    else who = args[1]

    let jumlahHari = 86400000 * args[0]
    let now = new Date() * 1
    let name = await conn.getName(m.chat) 
    let timeRemaining = global.db.data.chats[who].expired - now;
    let daysRemaining = Math.ceil(timeRemaining / (24 * 60 * 60 * 1000));

    conn.reply(m.chat, `*Nama Grup*: ${name}
*Status Sewa*: Akan berakhir dalam 
- ${msToDate(timeRemaining)} (${daysRemaining} hari lagi)`, m)
}

Tio.help = ['ceksewa']
Tio.tags = ['group']
Tio.command = /^(ceksewa)$/i
Tio.group = true

export default Tio

function msToDate(ms) {
    let days = Math.floor(ms / (24 * 60 * 60 * 1000));
    let daysms = ms % (24 * 60 * 60 * 1000);
    let hours = Math.floor((daysms) / (60 * 60 * 1000));
    let hoursms = ms % (60 * 60 * 1000);
    let minutes = Math.floor((hoursms) / (60 * 1000));
    return `${days} Hari ${hours} Jam ${minutes} Menit`;
}