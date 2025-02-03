/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, { conn }) => {
    let button = [{
        header: '*MY OWNER*',
        text: 'OWNER GALIHZ',
        footer: 'Klik dibawah jika ada kendala',
        url: 'https://telegra.ph/file/74fd1a3efc12da8ae17ce.png',
        web: [{
            text: 'Owner',
            url: 'https://wa.me/6282137800396'
        }]
    }];

    await conn.sendButtonSlide(m.chat, button, m, {
        footer: 'Hubungi Owner untuk info lebih lanjut',
        text: 'Owner Galihz'
    });
}

Tio.help = ['owner', 'creator']
Tio.tags = ['main']
Tio.command = /^(owner|creator)$/i
export default Tio;