/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

let Tio = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    let teks
    if (m.quoted) {
        teks = m.quoted.text
    } else if (text) {
        teks = text
    } else return m.reply(`[ invalid ]\n*gunakan command*:\n${usedPrefix+command} presiden Indonesia`);

    try {
        m.reply(msg.wait)

        const result = await llama(text);
        m.reply(result)

    } catch (e) {
        throw e
    }

}
Tio.help = Tio.command = ['llama']
Tio.tags = ['ai']
Tio.limit = Tio.register = true

export default Tio

async function llama(text) {
    const url = 'https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-3B-Instruct/v1/chat/completions';

    const payload = {
        model: "meta-llama/Llama-3.2-3B-Instruct",
        messages: [{
            role: "user",
            content: text
        }],
        max_tokens: 500,
        stream: false
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${global.APIKeys['hf']}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}