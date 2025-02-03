/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

let Tio = async (m, { text, conn }) => {

    if (!text) return m.reply(await Func.exam(usedPrefix, command, 'hai'))
  try {
    const apiUrl = 'http://107.172.32.198:30013/api/openai/v1/chat/completions';

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
      'Referer': 'http://107.172.32.198:30013/#/chat',
    };

    const body = {
      messages: [
        {
          role: 'system',
          content: `
            You are ChatGPT, a large language model trained by OpenAI.
            Knowledge cutoff: 2023-10
            Current model: gpt-4o-mini
            Current time: ${new Date().toLocaleString()}
            Latex inline: \\(x^2\\) 
            Latex block: $$e=mc^2$$
          `,
        },
        {
          role: 'user',
          content: text || 'Hai',
        },
      ],
      stream: false,
      model: 'gpt-4o-mini',
      temperature: 0.5,
      presence_penalty: 0,
      frequency_penalty: 0,
      top_p: 1,
    };

    let response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });

    if (response.ok) {
      let result = await response.json();
      let reply = result.choices?.[0]?.message?.content || 'Tidak ada respon dari API.';
      await conn.reply(m.chat, reply, m);
    } else {
      await conn.reply(m.chat, `Terjadi kesalahan: ${response.status}`, m);
    }
  } catch (e) {
    console.error(e);
    await conn.reply(m.chat, 'Maaf, terjadi kesalahan saat mencoba menghubungi API.', m);
  }
};

Tio.help = ['nextchat'];
Tio.tags = ['ai'];
Tio.command = /^(nextchat)$/i;

export default Tio;