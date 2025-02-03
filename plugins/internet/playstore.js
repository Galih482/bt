/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import axios from 'axios';
import * as cheerio from 'cheerio';

let Tio = async (m, { conn, text }) => {
    if (!text) {
        return m.reply('❌ Masukkan kata kunci untuk pencarian aplikasi di Play Store.');
    }

    const searchQuery = text.trim();
    
    try {
        const results = await PlayStore.search(searchQuery);

        if (results.error) {
            return m.reply(results.error);
        }

        if (results.mess) {
            return m.reply(results.mess);
        }

        let caption = `🔍 *Hasil Pencarian Play Store* untuk: *${searchQuery}*\n\n`;

        results.forEach((result, index) => {
            caption += `*${index + 1}. ${result.nama}*\n`;
            caption += `🔹 *Developer*: ${result.developer}\n`;
            caption += `⭐ *Rating*: ${result.rate} (${result.rate2})\n`;
            caption += `🔗 *Link*: ${result.link}\n\n`;
        });

        // Mengirim pesan hasil pencarian
        m.reply(caption);
    } catch (error) {
        console.error(error);
        m.reply('❌ Terjadi kesalahan saat melakukan pencarian.');
    }
};

Tio.help = ['playstore', 'searchplaystore'];
Tio.command = /^(playstore|searchplaystore)$/i;
Tio.tags = ['main'];

export default Tio;

class PlayStore {
        static async search(query) {
            try {
                const { data } = await axios.get(`https://play.google.com/store/search?q=${query}&c=apps`);
                const results = [];
                const $ = cheerio.load(data);

                $(".ULeU3b > .VfPpkd-WsjYwc").each((_, element) => {
                    const linkk = $(element).find("a").attr("href");
                    const nama = $(element).find(".DdYX5").text();
                    const developer = $(element).find(".wMUdtb").text();
                    const img = $(element).find("img").attr("src");
                    const rate = $(element).find(".ubGTjb > div").attr("aria-label");
                    const rate2 = $(element).find(".w2kbF").text();
                    const link = `https://play.google.com${linkk}`;

                    results.push({
                        link: link,
                        nama: nama || "No Name",
                        developer: developer || "No Developer",
                        img: img || "https://i.ibb.co/G7CrCwN/404.png",
                        rate: rate || "No Rate",
                        rate2: rate2 || "No Rate",
                        link_dev: `https://play.google.com/store/apps/developer?id=${developer.split(" ").join("+")}`,
                    });
                });

                if (!results.length) {
                    return { developer: "@Fruatre Maou", mess: "No result found" };
                }

                return results;
            } catch (error) {
                console.error(error);
                return { error: "Failed to fetch data from Play Store" };
            }
        }
    }