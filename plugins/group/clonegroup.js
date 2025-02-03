/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, { conn, text, participants }) => {
    let gc = await conn.groupMetadata(m.chat);
    let teks = await Func.style('Tunggu sebentar, sedang kloning group: ' + gc.subject);
    m.reply(teks);

    try {
        let grup = await conn.groupCreate(gc.subject, [m.sender]);
        let id = grup.id;
        let pp = await conn.profilePictureUrl(m.chat);
        
        db.data.chats[id].welcome = false;
        await conn.delay(1000);
        conn.groupUpdateDescription(id, gc.desc);
        conn.updateProfilePicture(id, { url: pp });

        for (let idny of participants) {
            conn.groupParticipantsUpdate(id, [`${idny.id.split('@')[0]}` + info.jid], "add");
            await conn.delay(2000);
        }

        m.reply('Sukses kloning group: ' + gc.subject);
    } catch (e) {
        console.log(e);
        m.reply('Error: ' + e);
    }
}

Tio.help = ['clonegrup'];
Tio.tags = ['owner'];
Tio.command = /^(clon|klon(ing|grup|gc)?)$/;
Tio.owner = true;
Tio.admin = true;

export default Tio;