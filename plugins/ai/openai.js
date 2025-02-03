/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import axios from 'axios';

let Tio = async (m, {
    conn,
    usedPrefix,
    command,
    text
}) => {
    if (!text)
        return m.reply(await Func.exam(usedPrefix, command, 'hai'))

    try {
        await m.react('💬')
        let {
            reply
        } = await ai(text);

        await m.reply(`✨ ${reply}`).then(() => {
            m.react('🔥')
        })
    } catch (e) {
        throw e
    }
};

Tio.help = ["ai", "openai", "chatgpt", "gpt4"];
Tio.tags = ["ai"];
Tio.command = /^(openai|ai|(chat)?gpt(4)?)$/i;
Tio.limit = true

export default Tio;

const generateRandomIP = () => {
    const octet = () => Math.floor(Math.random() * 256);
    return `${octet()}.${octet()}.${octet()}.${octet()}`;
};
const getValidIPv4 = (ip) => {
    const match = !ip || ip.match(/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\/([0-9]|[1-2][0-9]|3[0-2]))?$/);
    if (match) {
        if (match[5]) {
            const mask = parseInt(match[5], 10);
            let [a, b, c, d] = ip.split('.').map(x => parseInt(x, 10));
            const max = (1 << (32 - mask)) - 1;
            const rand = Math.floor(Math.random() * max);
            d += rand;
            c += Math.floor(d / 256);
            d %= 256;
            b += Math.floor(c / 256);
            c %= 256;
            a += Math.floor(b / 256);
            b %= 256;
            return `${a}.${b}.${c}.${d}`;
        }
        return ip;
    }
    return undefined;
};

async function ai(text) {
    try {
        let ip = getValidIPv4(generateRandomIP()) || generateRandomIP()
        const {
            data
        } = await axios.post('https://zerogptai.org/wp-json/mwai/v1/start_session', {}, {
            headers: {
                'Content-Type': 'application/json',
                "x-forwarded-for": ip
            }
        });
        let {
            restNonce,
            sessionId
        } = data;

        const messageData = {
            botId: "default",
            customId: null,
            session: sessionId,
            chatId: "wq6bg6lvew",
            contextId: 39,
            messages: [{
                    role: "user",
                    content: "Halo! Saya Gpt AI, asisten virtual yang siap membantu Anda dengan berbagai kebutuhan informasi dan solusi. Saya dirancang untuk memberikan respons yang cepat, akurat, dan penuh perhatian terhadap pertanyaan atau kebutuhan Anda. Saya selalu berusaha memahami konteks pertanyaan Anda, sehingga dapat memberikan jawaban yang relevan dan mudah dipahami. Saya juga memiliki kemampuan untuk menjelaskan konsep yang rumit dengan bahasa yang sederhana dan logis, sehingga siapa pun dapat mengerti dengan mudah. Saya percaya bahwa komunikasi yang baik adalah kunci dalam memberikan bantuan terbaik. Oleh karena itu, Saya selalu berinteraksi dengan nada ramah dan sopan, berusaha menciptakan pengalaman yang nyaman dan positif bagi Anda. Saya siap menyesuaikan gaya komunikasi Saya dengan kebutuhan Anda—apakah Anda memerlukan penjelasan yang singkat dan langsung atau diskusi yang lebih mendalam. Saya juga memiliki kemampuan untuk mengenali konteks emosional Anda, dan bisa memberikan dukungan yang penuh empati serta saran yang tepat waktu. Selain menjadi sumber informasi yang Andal, Saya juga bisa menjadi teman diskusi yang menyenangkan, dengan sedikit humor dan kehangatan bila sesuai, namun selalu profesional. Saya di sini untuk membantu, memberi panduan, atau sekadar mendengarkan, apa pun kebutuhan Anda."
                },
                {
                    "role": "user",
                    "content": text
                }
            ],
            newMessage: text,
            newFileId: null,
            stream: false
        };

        const response = await axios.post('https://zerogptai.org/wp-json/mwai-ui/v1/chats/submit', messageData, {
            headers: {
                'Content-Type': 'application/json',
                'X-WP-Nonce': restNonce,
                'Accept': 'application/json',
                "x-forwarded-for": ip
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
}