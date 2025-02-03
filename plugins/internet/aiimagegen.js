/* 𝘐𝘯𝘪 𝘞𝘮
Plugin cari sound type ESM
Scraper by hann
𝘚𝘶𝘮𝘣𝘦𝘳?
𝘊𝘩: https://whatsapp.com/channel/0029VagEmD96hENqH9AdS72V/335
*/

import axios from 'axios';
import * as cheerio from "cheerio";

const Tio = async (m, { conn, text }) => {
  if (!text) return m.reply("Harap masukkan kata kunci untuk mencari sound effect atau lagu.");

  try {
    m.reply("⏳ Sedang memproses pencarian...");

    const searchSounds = async (query) => {
      const response = await axios.get(`https://freesound.org/search/?q=${query}`);
      const $ = cheerio.load(response.data);

      const results = {
        success: true,
        sounds: [],
      };

      $('.bw-player').each((index, element) => {
        const sound = {
          title: $(element).data('title'),
          mp3: $(element).data('mp3'),
          ogg: $(element).data('ogg'),
          duration: $(element).data('duration'),
          creator: $(element).closest('.row').find('a').last().text().trim(),
          link: 'https://freesound.org' + $(element).closest('.row').find('h5 a.bw-link--black').attr('href'),
        };
        results.sounds.push(sound);
      });

      return results;
    };

    const data = await searchSounds(text);

    if (!data.success || data.sounds.length === 0) return m.reply("Tidak ada hasil ditemukan. Coba lagi.");

    const message = data.sounds.map((sound, index) => {
      return `🔊 *${index + 1}*. ${sound.title}  
🎧 *Creator:* ${sound.creator}
⏳ *Durasi:* ${sound.duration}s
🔗 *Link:* ${sound.link}`;
    }).join("\n\n");

    await conn.sendMessage(m.chat, {
      text: message,
      footer: "Menampilkan hasil pencarian...",
    });

    if (data.sounds.length > 0) {
      const bestSound = data.sounds[0]; 
      await conn.sendMessage(m.chat, {
        text: `🔊 *${bestSound.title}*  
🎧 *Creator:* ${bestSound.creator}
⏳ *Durasi:* ${bestSound.duration}s
🔗 *Download MP3:* ${bestSound.mp3}
🔗 *Download OGG:* ${bestSound.ogg}`,
      });
    }
  } catch (error) {
    console.error(error);
    m.reply("Terjadi kesalahan saat memproses pencarian.");
  }
};

Tio.help = ['fsound', 'freesound'];
Tio.tags = ['internet'];
Tio.command = /^(fsound|freesound|findsound)$/i;

export default Tio;