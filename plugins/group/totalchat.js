/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

let Tio = async (m, {
    dbChat,
    text,
    conn
}) => {
    if (!dbChat[m.chat]?.totalChat) return m.reply('Tidak ada data chat.');
    if (text && text == 'reset') {
        dbChat[m.chat].totalChat = {}
        return m.reply("Total chat telah di reset untuk grup ini.");
    }
    const entries = Object.entries(dbChat[m.chat].totalChat);


    const total = await Promise.all(
        entries.map(async ([index, value], i) => {

            return `${i + 1}. @${index.split('@')[0]}: ${value} pesan`;
        })
    );

    m.reply(`*\`Total Chat Grup ${await conn.getName(m.chat)}\`*:\n\n${total.join('\n')}`);
};

Tio.help = ['totalchat'];
Tio.tags = ['group', 'info'];
Tio.group = true;
Tio.command = /^(totalchat|totalpesan|jumlahpesan|jumlahchat)$/i;

export default Tio;