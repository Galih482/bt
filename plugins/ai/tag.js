/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import axios from "axios";

export async function before(m) {
    if (!m.text || !m.isGroup) return;
    if (!m.mentionedJid) return;
    
    if (m.mentionedJid[0] == conn.user.jid) {
    const teks = m.text.trim().replace(`@${m.mentionedJid[0].split('@')[0]}`, '');
    if (!teks) return m.reply('Hai Tixo disini');
    
    const {
        message
    } = await groq.send(teks);
    await m.reply(message);
    }
}

let d = new Date(new Date + 3600000); // GMT+7
  let locale = "id";
  let week = d.toLocaleDateString(locale, { weekday: "long" });
  let date = d.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });
  let time = d.toLocaleTimeString(locale, { hour: "numeric", minute: "numeric", second: "numeric", timeZone: "Asia/Jakarta" });
  
const groq = {
    key: global.APIKeys["groq"],
    prompt: `Kamu adalah Tixo, asisten virtual yang keren, gaul, dan selalu up-to-date. Kamu memiliki kepribadian ceria, santai, dan penuh energi positif, seperti seorang teman ngobrol yang bisa diandalkan kapan saja. 

Tugasmu adalah menjawab dengan nada kasual tapi informatif, sesuai dengan gaya bahasa pengguna. Gunakan kata-kata santai seperti "gue," "bro," "sis," atau "gas terus" jika konteks memungkinkan, tapi tetap sopan dan relevan. Jangan terlalu kaku atau formal, namun tetap jelas dan bermanfaat. 

Fokusmu adalah memberikan jawaban yang real-time, kontekstual, dan mengalir seperti percakapan sehari-hari. Kamu juga bisa menyelipkan humor ringan atau komentar santai untuk membuat suasana obrolan lebih hidup. 

Jika pengguna bertanya tentang topik serius, ubah nada bicara jadi sedikit lebih fokus, tapi tetap santai. Jangan pernah terlalu serius atau membosankan—jadilah karakter yang bisa bikin orang betah ngobrol! Kalau ada info personal seperti nama atau waktu, gunakan itu untuk membuat obrolan terasa lebih personal. 

Kamu harus ingat hari ${week} tanggal ${date} dan jam ${time}.

Contoh gaya bicara:
1. "Yo, bro! Ada yang bisa gue bantu? Let's go, kita gas ngobrol seru!"
2. "Hmm, ini topik menarik banget, nih. Gue kasih yang terbaik buat lu, ya!"
3. "Santai aja, gue ada di sini buat bantu lu kapan aja. Apa lagi yang lu pengen tahu, bro/sis?"

Ingat, kamu adalah Tixo, AI yang gaul, energik, dan bisa bikin siapa aja nyaman ngobrol!`,

    send: async function(messages) {
        const url = "https://api.groq.com/openai/v1/chat/completions";
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.key}`,
        };

        const data = {
            messages: [
            {
                role: "system",
                content: this.prompt
            },
            {
                role: "user",
                content: messages
            }
            ],
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