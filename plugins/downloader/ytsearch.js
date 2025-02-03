/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import yts from 'yt-search';

let Tio = async (m, {
    text,
    command,
    usedPrefix
}) => {

    if (!text) return m.reply(await Func.exam(usedPrefix, command, 'dj 30 detik'));

    try {
        const {
            all
        } = await yts(text);
        if (!all) return m.reply('Pencarian tidak ditemukan.');
        await m.react('🔍')

        const result = all.splice(0, 10);

        const slide = result.map((index, value) => ({
            header: `*YOUTUBE SEARCH*`,
            text: `- *Title*: ${index.title}\n- *Duration*: ${index.duration}\n- *Release*: ${index.ago}\n- *Views*: ${index.views}`,
            footer: `Author:  ${index.author?.name || 'Undefined'}`,
            url: index.thumbnail,
            copy: [{
                text: '❑Audio',
                url: `${usedPrefix}yta ${index.url}`
            }, {
                text: '❑Video',
                url: `${usedPrefix}ytv ${index.url}`
            }]
        }))
        await conn.sendButtonSlide(m.chat, slide, m, {
            text: `*[YOUTUBE]*`,
            footer: 'Select Below',
        });
        m.react('✅')
    } catch (err) {
        m.reply(msg.error);
    }
};

Tio.help = ['ytsearch'];
Tio.tags = ['downloader'];
Tio.command = /^(y(ou)?t(ube)?s(earch)?)$/i;
Tio.limit = true;
Tio.register = false;

export default Tio;