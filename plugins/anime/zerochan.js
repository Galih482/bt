/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import axios from "axios";
import * as cheerio from "cheerio";

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply('Please provide a search query.');

    try {
        await m.reply(msg.wait);
        const result = await zerochan(text);
        const images = result.slice(0, 10).map((v, i) => createSlide(`Search Result ${i + 1}`, '', global.info.wm, v.preview, v.url));

        conn.sendButtonSlide(m.chat, images, m, {
            text: 'Zerochan search',
            footer: 'Select below',
        });
    } catch (err) {
        console.error(err);
        m.reply('An error occurred while fetching the images.');
    }
};

handler.help = handler.command = ['zerochan'];
handler.tags = ['anime'];
handler.limit = true;

export default handler;

const createSlide = (title, details, footer, preview, url) => ({
    header: title,
    text: details,
    footer: footer,
    url: preview,
    web: [{ text: 'View', url }],
    copy: [{ text: 'URL HD', url }],
});

async function zerochan(query) {
    try {
        let form = new URLSearchParams();
        form.append('q', query);

        const response = await axios.post('https://www.zerochan.net/search', form, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const $ = cheerio.load(response.data);

        const images = [];
        $('#thumbs2 li').each((index, element) => {
            const url = $(element).find('a[href*=".jpg"]').attr('href'); 
            const preview = $(element).find('img').attr('data-src');
            
            if (url || preview) {
                images.push({ preview, url });
            }
        });

        return images;
    } catch (error) {
        console.error('Error scraping images:', error);
    }
}