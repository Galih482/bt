/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let handler = async (m, {
    conn,
    text,
    dbUser: user,
    command
}) => {

    try {
        if (!m.isGroup) return m.reply('Khusus didalam grup');

        if (/^(tagprem(ium)?)$/i.test(command)) {
            let {
                participants
            } = await conn.groupMetadata(m.chat);
            let prem = [];

            participants.map(v => v.id).forEach(v => {
                if (user[v] !== undefined && user[v].premium) {
                    prem.push(v);
                }
            });

            if (prem.length === 0) {
                return m.reply('Member premium saat ini kosong');
            }

            let cap = `Tags Premium\n\n`;
            for (let usr of prem) {
                cap += `- @${usr.split("@")[0]}\n`;
            }

            await conn.reply(m.chat, cap, m, {
                contextInfo: {
                    mentionedJid: prem
                }
            });
        }

        if (/^tagme$/i.test(command)) {
            let tag = `@${m.sender.replace(/@.+/, '')}`;
            let mentionedJid = [m.sender];
            await conn.reply(m.chat, tag, m, {
                contextInfo: {
                    mentionedJid
                }
            });
        }
    } catch (e) {
        throw e;
    }
};

handler.help = ['tagpremium', 'tagme'];
handler.tags = ['group'];
handler.command = /^(tagprem(ium)?|tagme)$/i;

export default handler;