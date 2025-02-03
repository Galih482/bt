/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, { conn, text, args, usedPrefix, command, isROwner, isOwner }) => {
    switch (command) {
        case "setwelcome":
            if (text) {
                global.db.data.chats[m.chat].sWelcome = text;
                return m.reply("Pesan sambutan berhasil diatur!");
            } else {
                return m.reply("Tolong berikan teks sambutan.");
            }
        
        case "setbye":
            if (text) {
                db.data.chats[m.chat].sBye = text;
                return m.reply("Pesan perpisahan berhasil diatur!");
            } else {
                return m.reply("Tolong berikan teks perpisahan.");
            }

        case "setdesc":
        case "sdesc":
            if (!text) {
                return m.reply("Tolong berikan deskripsi baru.");
            }
            await conn.groupUpdateDescription(m.chat, text);
            return m.reply("Deskripsi grup berhasil diperbarui!");
        
        case "setnamagc":
            if (args.length === 0) {
                return m.reply(`Penggunaan: ${usedPrefix + command} <nama grup baru>`);
            }
            await conn.groupUpdateSubject(m.chat, args.join(" "));
            return m.reply("Nama grup berhasil diubah!");
        
        default:
            return m.reply("Perintah tidak ditemukan.");
    }
};

Tio.help = ["setwelcome", "setbye", "setdesc", "sdesc", "setnamagc"];
Tio.tags = ["group"];
Tio.command = /^(setwelcome|setbye|setdesc|sdesc|setnamagc)$/i;

Tio.group = true;
Tio.admin = true;
Tio.botAdmin = true;

export default Tio;