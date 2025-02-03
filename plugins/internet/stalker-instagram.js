/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

const Tio = async (m, {
    usedPrefix,
    command,
    conn,
    text
}) => {
    if (!text) return m.reply(await Func.exam(usedPrefix, command, 'tulisan.ku.id'));

    try {
        await m.reply(msg.wait)
        const {
            result
        } = await Func.fetchJson(API(APIs["Tixo"], '/stalker/instagram', {
            username: text.replace('@', '')
        }));

        const {
            username,
            profilePhoto,
            nickname,
            biodata,
            posts,
            followers,
            following
        } = result;

        const message = `乂 I G S T A L K

📷 *Name:* ${nickname}
👤 *Username:* ${username}
❤️ *Followers:* ${followers}
💙 *Following:* ${following}
📅 *Posts:* ${posts}
📝 *Bio:* ${biodata}`;

        conn.sendMessage(m.chat, {
            text: message,
            contextInfo: {
                externalAdReply: {
                    title: 'Click here to view profile',
                    body: 'View Instagram profile',
                    previewType: "PHOTO",
                    showAdAttribution: true,
                    sourceUrl: `https://instagram.com/${username.replace('@', '')}`,
                    thumbnailUrl: profilePhoto
                }
            }
        }, {
            quoted: m
        });
    } catch (err) {
        m.reply('Error: ' + err + '\nInvalid username!');
    }
};

Tio.help = ['igstalk'];
Tio.tags = ['stalker'];
Tio.command = /^(i(nsta)?g(ram)?stalk(er)?)$/i;

Tio.limit = true;

export default Tio;