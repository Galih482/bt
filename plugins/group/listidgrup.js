/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

let Tio = async (m, { conn, args }) => {
    let now = new Date() * 1;
    let allGroups = await conn.groupFetchAllParticipating();
    let groups = Object.entries(allGroups).map(([jid, data], index) => ({
        index: index + 1,
        jid,
        name: data.subject,
        participants: data.participants,
        desc: data.desc,
    }));

    if (!args[0]) {
        let txt = groups.map((group, i) => `${i + 1}. Name: ${group.name}\n- Member: ${group.participants.length}`).join('\n\n');
        m.reply(`乂 *L i s t  G r o u p* :

Total Group: ${groups.length}

${txt}`.trim());
    } else {
        let index = parseInt(args[0]) - 1;

        if (isNaN(index) || index < 0 || index >= groups.length) {
            return m.reply('Nomor grup tidak valid.');
        }

        let { jid, name, participants, desc } = groups[index];

        if (args[1] === '--id') {
            m.reply(`ID Grup: ${jid}`);
        } else {
            let adminList = participants
                .filter(p => p.admin)
                .map(p => `@${p.id.split('@')[0]}`)
                .join(', ');

            let groupData = db.data.chats[jid] || {
                isBanned: false,
                welcome: false,
                antilink: false,
                antispam: true,
                delete: false,
                expired: null,
            };

            let sewaStatus = groupData.expired
                ? msToDate(groupData.expired - now)
                : 'Tidak diatur';

            let detail = `- Nama Grup: ${name}
- ID Grup: ${jid}
- Deskripsi: ${desc || 'Tidak ada deskripsi'}
- Total Member: ${participants.length}
- Admin Grup: ${adminList || 'Tidak ada admin'}
- Status Sewa: ${sewaStatus}
- Grup Diblokir: ${groupData.isBanned ? '✅ Ya' : '❌ Tidak'}
- Auto Welcome: ${groupData.welcome ? '✅ Ya' : '❌ Tidak'}
- Anti Link: ${groupData.antilink ? '✅ Ya' : '❌ Tidak'}
- Anti Spam: ${groupData.antilpam ? '✅ Ya' : '❌ Tidak'}
`.trim();

            m.reply(detail, null, {
                mentions: participants.map(p => p.id),
            });
        }
    }
};

Tio.help = ['listidgc'];
Tio.tags = ['group'];
Tio.command = /^(listidgc)$/i;

export default Tio;

function msToDate(ms) {
    let days = Math.floor(ms / (24 * 60 * 60 * 1000));
    let daysms = ms % (24 * 60 * 60 * 1000);
    let hours = Math.floor((daysms) / (60 * 60 * 1000));
    let hoursms = ms % (60 * 60 * 1000);
    let minutes = Math.floor((hoursms) / (60 * 1000));
    let minutesms = ms % (60 * 1000);
    let sec = Math.floor((minutesms) / (1000));
    return `${days} Hari ${hours} Jam ${minutes} Menit`;
}