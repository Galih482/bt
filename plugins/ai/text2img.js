/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import {
    getModels,
    generate
} from '../../lib/scraper/prodia.js';

let Tio = async (m, {
    command,
    usedPrefix,
    conn,
    text
}) => {
    const input_data = await getModels();

    let [tema, urutan] = text.split("|");
    if (!tema) {
        return m.reply("Input query!\n*Example:*\n.txt2img2 [prompt]|[model]");
    }

    try {
        let data = Object.keys(input_data).map(title => ({
            title,
            id: input_data[title]
        }));

        if (!urutan) {
            return m.reply("Input query!\n*Example:*\n.txt2img2 [prompt]|[model]\n\n*Pilih angka yg ada*\n" + 
                data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"));
        }
        if (isNaN(urutan)) {
            return m.reply("Input query!\n*Example:*\n.txt2img2 [prompt]|[model]\n\n*Pilih angka yg ada*\n" + 
                data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"));
        }
        if (urutan > data.length) {
            return m.reply("Input query!\n*Example:*\n.txt2img2 [prompt]|[model]\n\n*Pilih angka yg ada*\n" + 
                data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"));
        }

        let out = data[urutan - 1].id;

        const params = {
            prompt: encodeURIComponent(tema),
            negative_prompt: '',
            model: out
        };

        await m.reply(msg.wait); 
        const openAIResponse = await generate(params); 

        if (openAIResponse) {
            const tag = `@${m.sender.split('@')[0]}`;
            await conn.sendMessage(m.chat, {
                image: openAIResponse[0].buffer,
                caption: `Model: *${out}* nya\nUser: ${tag}`,
                mentions: [m.sender]
            }, {
                quoted: m
            });
        } else {
            console.log("Tidak ada respons dari OpenAI atau terjadi kesalahan.");
        }
    } catch (e) {
        await m.reply(msg.error);
    }
}

Tio.help = ["txt2img"];
Tio.tags = ["ai"];
Tio.command = /^(t(e)?xt2im(a)?g(e)?)$/i;
Tio.register = true;
Tio.limit = true;

export default Tio;