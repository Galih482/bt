/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import axios from 'axios';

let Tio = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) {
        return m.reply(`Harap masukkan teks. Contoh: ${usedPrefix + command} Halo, apa kabar?`);
    }

    try {
        await m.react('💬');
        let result;

        switch (command) {
            case 'gpt4o':
                result = await chatbot.send(text, 'gpt-4o');
                break;
            case 'gpt4o-mini':
                result = await chatbot.send(text, 'gpt-4o-mini');
                break;
            case 'gpt3.5':
                result = await chatbot.send(text, 'gpt-3.5-turbo');
                break;
            case 'gpt3.5-0125':
                result = await chatbot.send(text, 'gpt-3.5-turbo-0125');
                break;
            default:
                return m.reply(
                    `Perintah tidak valid. Pilih salah satu:\n- gpt4o\n- gpt4o-mini\n- gpt3.5\n- gpt3.5-0125`
                );
        }

        await m.reply(`✨ ${result}`).then(() => {
            m.react('🔥');
        });
    } catch (e) {
        console.error(e);
        await m.reply(`Maaf, terjadi kesalahan: ${e.message}`);
    }
};

Tio.help = ["gpt4o", "gpt4o-mini", "gpt3.5", "gpt3.5-0125"];
Tio.tags = ["ai"];
Tio.command = /^(gpt4o|gpt4o-mini|gpt3.5|gpt3.5-0125)$/i;
Tio.limit = true;

export default Tio;

const chatbot = {
    send: async (message, model) => {
        try {
            const payload = {
                messages: [{ role: "user", content: message }],
                model: model
            };

            const response = await axios.post(
                "https://mpzxsmlptc4kfw5qw2h6nat6iu0hvxiw.lambda-url.us-east-2.on.aws/process",
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'User-Agent': 'Postify/1.0.0'
                    }
                }
            );

            return response.data?.choices[0]?.message?.content || "Tidak ada respons dari model.";
        } catch (error) {
            console.error("Kesalahan pada chatbot.send:", error.message);
            throw error;
        }
    }
};