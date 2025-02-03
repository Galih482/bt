import axios from "axios";

let Tio = async (m, { conn, args, usedPrefix, command }) => {
    let text;
    if (args.length >= 1) {
        text = args.join(" ");
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text;
    } else throw "Input teks";

    await m.react('🕒')

    try {
        let imageUrl = await AINSFX(text);
        if (imageUrl) {
            await conn.sendFile(m.chat, imageUrl, '', `*Prompt : ${text}*`, m, false, {
                mentions: [m.sender]
            });
        }
                m.react('✅')
    } catch (e) {
        await m.reply("Terjadi kesalahan, coba lagi.");
        console.error(e);
    }
};

Tio.help = ["ainsfx"];
Tio.tags = ["ai"];
Tio.command = /^(ainsfx|ainsfx|insfx|aifx)$/i;
Tio.register = Tio.limit = true;
export default Tio;

/* New API Function */
async function AINSFX(prompt) {
    const url = 'https://ins.neastooid.xyz/api/ai/AINSfx';
    const data = {
        prompt: prompt
    };

    try {
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.data.thumbnailUrl;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}