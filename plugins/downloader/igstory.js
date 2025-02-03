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

let regex = /https:\/\/www\.instagram\.com\/stories\/([\w.-]+)(\/)?/;

let Tio = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    if (!text) return m.reply(await Func.exam(usedPrefix, command, 'https://www.instagram.com/stories/cactus_destroy/3512043757823714900?utm_source=ig_story_item_share&igsh=azZyZjF2MHFma2x2'))
    await m.reply(msg.wait);

    if (regex.test(text)) {
        try {
            
            let {
                data
            } = await Func.fetchJson(API(APIs["Tixo"], '/downloader/igstory', {
                url: text
            }));
            const {
                username,
                media: result
            } = data;
            await conn.sendFile(m.chat, result, '', `- Username: ${username}\n- Url: ${text}`, m);
        } catch (error) {
            m.reply(`Gagal mengambil story: ${error.message}`);
        }
    } else {
        try {
            let {
                data: result
            } = await Func.fetchJson(API(APIs["Tixo"], '/downloader/igstory-username', {
                username: text
            }));
            for (let i of result.data) {
                await conn.sendFile(m.chat, i, '', `- Username: ${result.username}`, m);
            }
        } catch (e) {
            throw e.message
        }
    }
}

Tio.help = ['instagramstory'];
Tio.tags = ['downloader'];
Tio.command = /^(i(nsta)?g(ram)?story)$/i;
Tio.register = true;
Tio.limit = true;

export default Tio;