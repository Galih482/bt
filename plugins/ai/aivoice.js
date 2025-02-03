/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import axios from "axios";

const Tio = async (m, { text, command }) => {
  conn.aivoice = conn.aivoice || {};
  const id = m.sender;

  if (!(id in conn.aivoice)) {
    conn.aivoice[id] = { history: [], model: "llama3-8b-8192" };
  }

  const userSession = conn.aivoice[id];
  const { history, model } = userSession;

  if (text === "reset") {
    userSession.history = [];
    userSession.model = "llama3-8b-8192";
    return m.reply("✅ Sesi chat berhasil direset.");
  }

  if (text === "--set") {
    try {
      const models = await groq.model();
      const list = models
        .map((item, index) => `${index + 1}. ${item.id} (Dimiliki oleh: ${item.owned})`)
        .join("\n");

      return m.reply(`📚 Model yang tersedia:\n\n${list}\n\nGunakan *${command} --set <nomor>* untuk memilih model.`);
    } catch (error) {
      return m.reply(`❌ Gagal mengambil daftar model: ${error.message}`);
    }
  }

  if (text.startsWith("--set ")) {
    const num = parseInt(text.split(" ")[1]) - 1;

    try {
      const models = await groq.model();
      if (num >= 0 && num < models.length) {
        userSession.model = models[num].id;
        return m.reply(`✅ Model berhasil diubah ke: ${models[num].id}`);
      } else {
        return m.reply("❌ Nomor model tidak valid.");
      }
    } catch (error) {
      return m.reply(`❌ Gagal mengatur model: ${error.message}`);
    }
  }

  try {
    const prompt = createPrompt(await conn.getName(m.sender));
    const messages = [
      ...history,
      { role: "user", content: text },
      { role: "system", content: prompt },
    ];

    const response = await groq.send(messages, model);
    history.push({ role: "assistant", content: response.message });

    const audioMessage = {
      audio: await voice(response.message),
      mimetype: "audio/mpeg",
      ptt: true,
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          mediaType: 1,
          mediaUrl: "",
          title: "AI Voice",
          body: "",
          sourceUrl: "",
          thumbnailUrl: "https://telegra.ph/file/e43ecad333e8d4aedb739.jpg",
          renderLargerThumbnail: false,
        },
      },
    };

    await conn.sendMessage(m.chat, audioMessage, { quoted: m });
  } catch (error) {
    return m.reply(`❌ Terjadi kesalahan: ${error.message}`);
  }
};

Tio.help = Tio.command = ["aivoice"];
Tio.tags = ["ai"];
Tio.limit = true;

export default Tio;

const createPrompt = (userName) => {
  const d = new Date();
  const locale = "id";
  const week = d.toLocaleDateString(locale, { weekday: "long" });
  const date = d.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });
  const time = d.toLocaleTimeString(locale, { hour: "numeric", minute: "numeric", second: "numeric", timeZone: "Asia/Jakarta" });

  return `Kamu adalah Glasly, asisten virtual yang santai, informatif, dan ramah. Hari ini adalah ${week}, ${date}, dan sekarang jam ${time}. 
Selalu gunakan bahasa kasual tapi informatif, dengan nada seperti teman dekat.`;
};

// API helper untuk Groq
const groq = {
  key: global.APIKeys["groq"],

  send: async function (messages, model) {
    const url = "https://api.groq.com/openai/v1/chat/completions";
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.key}`,
    };

    const data = {
      messages,
      model: model || "llama3-8b-8192",
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
    };

    try {
      const response = await axios.post(url, data, { headers });
      return { model: response.data.model, message: response.data.choices[0].message.content };
    } catch (error) {
      throw new Error(error.response ? error.response.data.error.message : error.message);
    }
  },

  model: async function () {
    const url = "https://api.groq.com/openai/v1/models";
    const headers = {
      "Authorization": `Bearer ${this.key}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.get(url, { headers });
      return response.data.data.map((model) => ({
        id: model.id,
        owned: model.owned_by,
      }));
    } catch (error) {
      throw new Error(error.response ? error.response.data.error.message : error.message);
    }
  },
};

// API helper untuk ElevenLabs
async function voice(text) {
  const data = {
    text,
    model_id: "eleven_multilingual_v2",
  };

  const headers = {
    "xi-api-key": global.APIKeys["elevenlabs"],
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(
      "https://api.elevenlabs.io/v1/text-to-speech/tJx7PsKA0xKckfV0qHhK?allow_unauthenticated=1",
      data,
      { headers, responseType: "arraybuffer" }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.error.message : error.message);
  }
}