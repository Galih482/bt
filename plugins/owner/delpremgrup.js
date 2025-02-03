/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

let Tio = async (m, { conn, text, dbUser , usedPrefix, command, participants }) => {
    await m.reply('Menghapus status premium dari semua anggota grup...');

    let regis = 0, noregis = 0;

    for (let v of participants) {
        let user = dbUser [v.id];
        if (user?.registered) {
            user.premium = false; 
            user.premiumTime = 0; 
            regis++;
        } else {
            noregis++;
        }
    }

    await m.reply(`*Berhasil menghapus premium dari grup ${await conn.getName(m.chat)}:*
    
- **Anggota terdaftar**: ${regis} anggota
- **Anggota tidak terdaftar**: ${noregis} anggota`);
};

Tio.help = ['deletepremiumgrup'];
Tio.tags = ['owner'];
Tio.command = /^(del(ete)?prem(ium)?gr(o)?up)$/i;
Tio.group = true;
Tio.rowner = true;

export default Tio;