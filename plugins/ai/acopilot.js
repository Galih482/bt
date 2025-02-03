import axios from "axios";

let Tio = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
  const sh = '`';
  const userInput = text.trim();
  if (!userInput) throw `Tolong masukkan teks setelah perintah ${usedPrefix + command}`;

  await m.react('🕒');

  try {
    const { data } = await axios.get(`https://api.siputzx.my.id/api/ai/copilot?text=${encodeURIComponent(userInput)}`);

    if (!data || !data.status) {
      throw new Error('Tidak ada respons dari API. Silakan coba lagi nanti.');
    }

    const responseText = data.data.text;
    const imageGenerated = data.data.imageGenerated;

    // Menambahkan backtick di awal dan di akhir respons
    let replyMessage = `${sh}${responseText}${sh}`;

    if (imageGenerated && imageGenerated.url) {
      await conn.sendMessage(m.chat, {
        image: { url: imageGenerated.url },
        caption: '`Succes 😸`'
      }, { quoted: m });
      m.react('✅');
    } else {
      m.reply(replyMessage);
    }
  } catch (e) {
    console.error('Error:', e);
    m.reply('Terjadi kesalahan saat memproses permintaan: ' + e.message);
  }
};

Tio.help = ['copilot'];
Tio.tags = ['internet'];
Tio.command = /^(copilot)$/i;

export default Tio;