/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import axios from 'axios';

let Tio = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    if (!text) return m.reply(await Func.exam(usedPrefix, command, 'hai'))
    await m.react('⏱️');
    let {
        code,
        data
    } = await ai.chat(text);
    if (code !== 200) return m.react('❎');
    await m.reply(data.answer);
}
Tio.help = Tio.command = ['ai-answer']
Tio.tags = ['ai']
Tio.limit = true

export default Tio

const ai = {
    chat: async function(input) {
        try {
            const response = await axios.post('https://aianswer.pro/api', {
                question: input
            }, {
                headers: {
                    'content-type': 'application/json',
                    'origin': 'https://aianswer.pro',
                    'referer': 'https://aianswer.pro/',
                    'user-agent': 'Postify/1.0.0'
                }
            });
            return {
                code: 200,
                data: response.data
            };
        } catch (error) {
            return {
                code: error.response ? error.response.status : 500,
                message: error.message
            };
        }
    }
};