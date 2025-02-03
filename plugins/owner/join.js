/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let linkRegex = /chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3})?/i;

let Tio = async (m, { conn, text, usedPrefix, command, isOwner }) => {
    switch (command) {
        case 'join':
            if (!text) return m.reply(await Func.exam(usedPrefix, command, 'https://chat.whatsapp.com/xxx'));
            try {
                let [_, code] = text.match(linkRegex) || [];
                if (!code) throw 'Link invalid';
                let res = await conn.groupAcceptInvite(code);
                m.reply(`Berhasil Join Grup`);
            } catch (e) {
                throw e; // sebelumnya `eror`, diganti menjadi `e`
            }
            break;
        case 'leave':
            if (!m.isGroup) return m.reply('Harus didalam grup');
            await m.reply('Gw pergi bye..bye.. :b');
            await conn.groupLeave(m.chat);
            break;
    }
};

Tio.help = ['join', 'leave'];
Tio.tags = ['owner'];
Tio.command = /^(join|leave)$/i;
Tio.rowner = true;

export default Tio;