/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import axios from "axios";

const Tio = async (m, {
    text,
    command
}) => {
    conn.meta = conn.meta || {};
    const id = m.sender;

    if (!(id in conn.meta)) {
        conn.meta[id] = {
            history: [],
            model: "meta-llama/Llama-3.2-3B-Instruct"
        };
    }

    const {
        history,
        model
    } = conn.meta[id];

    if (text === "reset") {
        conn.meta[id] = {
            history: [],
            model: "meta-llama/Llama-3.2-3B-Instruct"
        };
        m.reply("Sesi chat direset");
        return;
    }

    if (text === "--set") {
        try {
            const models = await getModel;
            let list = models.map((item, index) => `${index + 1}. ${item.model}`).join("\n");
            m.reply(`Model yang tersedia:\n\n${list}\n\nGunakan "${command} --set [nomor]" untuk memilih.`);
        } catch (error) {
            m.reply(`Gagal mengambil model: ${error.message}`);
        }
        return;
    }

    if (text.startsWith("--set ")) {
        const num = parseInt(text.split(" ")[1]) - 1;
        try {
            const models = await getModel;
            if (num >= 0 && num < models.length) {
                conn.meta[id].model = models[num].model;
                m.reply(`Model berhasil diubah ke: ${models[num].id}`);
            } else {
                m.reply("Nomor model tidak valid.");
            }
        } catch (error) {
            m.reply(`Gagal mengambil model: ${error.message}`);
        }
        return;
    }

    try {
        if (!text) return m.reply('Hai, how are you!');

        await m.react('✨');

        const messages = [
            ...history,
            {
                role: "user",
                content: text
            },
        ]

        const response = await sendChat(messages, model);
        history.push({
            role: "user",
            content: text
        }, {
            role: "assistant",
            content: response?.answer
        });

        const result = response?.answer;
        await m.reply(`${result}\n\n> ${model.split('/')[1]}`)
    } catch (error) {
        m.reply(`Terjadi kesalahan: ${error.message}`);
    }

};

Tio.help = Tio.command = ["meta"];
Tio.tags = ["ai"];
Tio.limit = true;

export default Tio;


async function sendChat(messages, model) {
    try {
        const data = {
                model,
                messages
        }
        const response = await axios.post(APIs["Tixo"] + '/ai/meta', data)
        return response.data?.result;
    } catch (err) {
        throw err
    }
}
const getModel = [{
    "model": "meta-llama/Llama-3.2-3B-Instruct"
}, {
    "model": "Qwen/Qwen2.5-72B-Instruct"
}, {
    "model": "Qwen/QwQ-32B-Preview"
}, {
    "model": "codellama/CodeLlama-34b-Instruct-hf"
}, {
    "model": "google/gemma-1.1-7b-it"
}, {
    "model": "google/gemma-2-27b-it"
}, {
    "model": "HuggingFaceH4/starchat2-15b-v0.1"
}, {
    "model": "HuggingFaceH4/zephyr-7b-alpha"
}, {
    "model": "HuggingFaceH4/zephyr-7b-beta"
}, {
    "model": "meta-llama/Llama-3.2-1B-Instruct"
}, {
    "model": "meta-llama/Meta-Llama-3-8B-Instruct"
}, {
    "model": "microsoft/Phi-3-mini-4k-instruct"
}, {
    "model": "microsoft/Phi-3.5-mini-instruct"
}, {
    "model": "mistralai/Mistral-7B-Instruct-v0.2"
}, {
    "model": "mistralai/Mistral-7B-Instruct-v0.3"
}, {
    "model": "mistralai/Mistral-Nemo-Instruct-2407"
}, {
    "model": "mistralai/Mixtral-8x7B-Instruct-v0.1"
}, {
    "model": "NousResearch/Hermes-3-Llama-3.1-8B"
}, {
    "model": "Qwen/Qwen2.5-1.5B-Instruct"
}, {
    "model": "Qwen/Qwen2.5-Coder-32B-Instruct"
}, {
    "model": "tiiuae/falcon-7b-instruct"
}]