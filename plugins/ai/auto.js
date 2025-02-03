/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import axios from "axios";

export async function before(m) {
    conn.ai = conn.ai || {};
    if (!m.text || m.isGroup) return;

    if (m.text.toLowerCase() == 'on-ai') {

        conn.ai[m.sender] = {}

        return m.reply('Auto ai on');

    } else if (m.text.toLowerCase() == 'off-ai') {

        delete conn.ai[m.sender];

        return m.reply('Auto ai off');

    };
    if (!(m.sender in conn.ai)) return;

    const {
        message
    } = await groq.send(m.text);
    await m.reply(message);
}
const groq = {
    key: global.APIKeys["groq"],

    send: async function(messages) {
        const url = "https://api.groq.com/openai/v1/chat/completions";
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.key}`,
        };

        const data = {
            messages: [{
                role: "user",
                content: messages
            }],
            model: "llama3-8b-8192",
            temperature: 1,
            max_tokens: 1024,
            top_p: 1,
            stream: false,
            stop: null,
        };

        try {
            const response = await axios.post(url, data, {
                headers
            });
            return {
                model: response.data.model,
                message: response.data.choices[0].message.content
            };
        } catch (error) {
            throw new Error(error.response ? error.response.data : error.message);
        }
    }
};