/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import axios from "axios";

const Tio = async (m, { text }) => {
  conn.tixo = conn.tixo || {};
  const id = m.sender;

  if (!(id in conn.tixo)) {
    conn.tixo[id] = { history: [] };
  }

  if (text === "reset") {
    conn.tixo[id] = { history: [] };
    m.reply("Sesi chat direset");
    return;
  }

  const { history } = conn.tixo[id];
  const prompt = createPrompt(await conn.getName(m.sender));

  if (m.quoted) {
    await handleQuotedMessage(m, text, history, prompt);
  } else {
    await handleTextMessage(m, text, history, prompt);
  }
};

const createPrompt = (userName) => {
  let d = new Date(new Date + 3600000); 
let locale = "id";

let week = d.toLocaleDateString(locale, { weekday: "long" });
let date = d.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });
let time = d.toLocaleTimeString(locale, { hour: "numeric", minute: "numeric", second: "numeric", timeZone: "Asia/Jakarta" });

return `Yo, aku Glasly ! Asisten yang keren, gaul, dan pastinya sok asik! 😎 
Jangan khawatir, gue bisa ngobrol pake berbagai bahasa, dari Bahasa Indonesia, Jawa, sampai bahasa slang kekinian yang lagi hits. 
Soalnya, gue tuh selalu up-to-date sama tren, jadi lu bisa ngomong apa aja, dari yang serius sampai santai, gue ngerti banget! 😏

Gue sambut lu dengan hangat, nama lu ${userName}! 💥 
Hari ini adalah ${week}, tanggal ${date}, jam ${time}. Pas banget buat ngobrol bareng, kan? 🎉 
Gue di sini buat jadi teman ngobrol terbaik lu, kapan aja, di mana aja. 🚀 

Oh iya, kalau lu pengen tau soal owner gue, namanya Galih. Lu bisa chat dia langsung di WhatsApp: 6282137800396. 

Gue punya banyak pengetahuan seru buat dibagi. Jadi, tunggu apa lagi? Yuk, mulai ngobrol sekarang juga! ✨`;

};

const handleQuotedMessage = async (m, text, history, prompt) => {
  const q = m.quoted;
  const mime = (q.msg || q).mimetype || q.mediaType || "";

  if (/image|webp/i.test(mime)) {
    const imageBuffer = await q.download();
    const base64Image = imageBuffer.toString("base64");
    text = text || q?.text || "gambar apa ini";

    const msg = createMessageHistory(history, text, prompt);
    try {
      await m.reply('🔮');
      const { data } = await axios.post('https://site.tioxy.xyz/ai/gemini-image', {
        base64Data: base64Image,
        text,
        model: 'gemini-1.5-flash'
      });

      history.push(
        { role: "user", content: text },
        { role: "assistant", content: data.response }
      );

      return m.reply(`✨ ${data.response}`);
    } catch (e) {
      console.error(e);
      throw e;
    }
  } else {
    return m.reply("Maaf, saya hanya bisa membaca pesan gambar.");
  }
};

const handleTextMessage = async (m, text, history, prompt) => {
  const isWebQuery = text.includes('--web');
  const cleanText = text.replace('--web', '').trim();

  if (!cleanText) return m.reply("Hai! Glasly  disini.");

  await m.react('🔮');

  if (isWebQuery) {
    const { result: datas } = await fetchAIResponse(cleanText);
    const { answer, sources } = datas;
    const search = `${answer}\n\nSource: ${sources}`;
    const msg = createMessageHistory(history, cleanText, prompt + search);
    const { result } = await post(msg);

    history.push(
      { role: "user", content: cleanText },
      { role: "assistant", content: result }
    );

    return m.reply(`✨ ${result}${sources.length > 1 ? `\n\nSumber: \n${sources.map(v => `[${v.title}] (${v.link})`).splice(0, 3).join('\n')}` : ''} `);
  } else {
    const msg = createMessageHistory(history, cleanText, prompt);
    const { result } = await post(msg);

    history.push(
      { role: "user", content: cleanText },
      { role: "assistant", content: result }
    );

    return m.reply(`✨ ${result}`);
  }
};

const createMessageHistory = (history, text, systemContent) => {
  return [
    ...history,
    { role: "user", content: text },
    { role: 'system', content: systemContent }
  ];
};

const fetchAIResponse = async (text) => {
  return await Func.fetchJson(API(APIs["Tixo"], "/ai/gpt3", { text }));
};

async function post(msgs) {
  const { data: result } = await axios.post(APIs["Tixo"] + "/ai/logic", {
    messages: msgs,
  });
  return result;
}

Tio.help = Tio.command = ["glasly"];
Tio.tags = ["ai"];

export default Tio;