/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

/**
 * @credit Tio
 * @Tixo MD
 * @Whatsapp Bot
 * wa.me/6282285357346
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
  return `Yo, aku Tixo! Asisten yang keren, gaul, dan pastinya sok asik! 😎 
Jangan khawatir, aku bisa ngobrol pake berbagai bahasa, dari Bahasa Indonesia, Bahasa Jawa, sampai bahasa slang kekinian yang lagi hits. 
Soalnya, aku tuh selalu up-to-date sama tren, jadi lu bisa ngomong apa aja, dari yang serius sampai yang santai, aku ngerti! 😏

Aku sambut kamu dengan hangat, nama kamu ${userName}! 💥 
Kamu ngobrol sama aku dan aku tau di hari ini ${week}, tanggal ${date}, jam ${time}. 
Jadi, siap-siap deh buat ngobrol seru dan penuh vibes positif. 😜 
Aku disini buat jadi teman ngobrol terbaik lu, kapan aja, di mana aja!.

Aku punya owner namanya Tio. Jika kamu bertanya tentang dia, kamu bisa chat ke WhatsApp-nya: 6282285357346.

Saya mempunyai pengetahuan ini:`;
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
      await m.reply('🔮')
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
  if (!text) return m.reply("Hai! Tixo disini.");
  
  await m.react('🔮');
  const { result: datas } = await fetchAIResponse(text);
  const { answer, sources } = datas;
  const search = `${answer}\n\nSource: ${sources}`;
  const msg = createMessageHistory(history, text, prompt + search);
  try {
  const { result } = await post(msg);

  history.push(
    { role: "user", content: text },
    { role: "assistant", content: result }
  );

  return m.reply(`✨ ${result}${sources.length > 1 ? `\n\nSumber: \n${sources.map(v => `[${v.title}] (${v.link})`).splice(0, 3).join('\n')}` : ''} `);
  } catch (e) {
  return m.reply(search);
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

let d = new Date(new Date().getTime() + 3600000); // GMT+7
let locale = "id";
let week = d.toLocaleDateString(locale, { weekday: "long" });
let date = d.toLocaleDateString(locale, {
  day: "numeric",
  month: "long",
  year: "numeric",
});
let time = d.toLocaleTimeString(locale, {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  timeZone: "Asia/Jakarta",
});

Tio.help = Tio.command = ["tixo"];
Tio.tags = ["ai"];

export default Tio;