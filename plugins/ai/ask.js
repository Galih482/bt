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

let Tio = async (m, {
    conn,
    usedPrefix,
    command,
    text
}) => {
    if (!text)
        return m.reply(await Func.exam(usedPrefix, command, 'hai'))

    try {
        await m.react('💬');
        let { result } = await Func.fetchJson(API(APIs["Tixo"], '/ai/ask', { text }));
        
        // Parsing result from reply
        
        let { image, answer, webSearch } = result;

        // Prepare WhatsApp message format
        let messageCaption = `✨ ${answer}\n\n🌐 *Web Search:*\n`;
        webSearch.forEach((item, index) => {
            messageCaption += `${index + 1}. ${item.title}\n🔗 ${item.link}\n\n`;
        });

        // Check if there's an image
        if (image && image.length > 0) {
            await conn.sendMessage(m.chat, { 
                image: { url: image[0] }, 
                caption: messageCaption 
            }, { quoted: m }).then(() => {
                m.react('🔥');
            });
        } else {
            await conn.sendMessage(m.chat, { 
                text: messageCaption 
            }, { quoted: m }).then(() => {
                m.react('🔥');
            });
        }
    } catch (e) {
        throw e;
    }
};

Tio.help = ["ask"];
Tio.tags = ["ai"];
Tio.command = /^(ask)$/i;
Tio.limit = true;

export default Tio;