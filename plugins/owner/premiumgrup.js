/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

let Tio = async (m, { conn, text, dbUser, usedPrefix, command, participants }) => {
    if (!text) return m.reply('Harap masukkan jumlah hari premium.');
    if (isNaN(text)) return m.reply('Input hanya boleh berupa angka.');

    await m.reply('Menambahkan status premium ke semua anggota grup...');

    let regis = 0, noregis = 0;
    let now = new Date();
    let Expired = 86400000 * text;

    for (let v of participants) {
        let user = dbUser[v.id];
        if (user?.registered) {
           user.premium = true
            if (now < user.premiumTime) {
                user.premiumTime += Expired;
            } else {
                user.premiumTime = now.getTime() + Expired;
            }
            regis++;
        } else {
            noregis++;
        }
    }

    await m.reply(`*Berhasil menambahkan premium ke grup ${await conn.getName(m.chat)}:*
    
- **Jumlah hari premium**: ${text} hari
- **Anggota terdaftar**: ${regis} anggota
- **Anggota tidak terdaftar**: ${noregis} anggota`);
};

Tio.help = ['premiumgrup'];
Tio.tags = ['owner'];
Tio.command = /^(prem(ium)?gr(o)?up)$/i;
Tio.group = true;
Tio.rowner = true;

export default Tio;