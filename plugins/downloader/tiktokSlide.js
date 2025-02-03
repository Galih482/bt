/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import * as cheerio from 'cheerio';
import axios from 'axios';

let Tio = async (m, { conn, text, args, command, usedPrefix }) => {

    if (!text) return m.reply(await Func.exam(usedPrefix, command, 'https://vt.tiktok.com/ZS2KAumyp/'));

    if (!(text.includes('http://') || text.includes('https://'))) {
        return m.reply('URL tidak valid, harap masukkan URL yang benar dengan http:// atau https://');
    }

    if (!text.includes('tiktok.com')) {
        return m.reply('URL Tiktok tidak valid.');
    }

    try {
        await m.reply(msg.wait);
        const { download, stats, uniqueId, username } = await slide(text);
        const hasil = Object.values(download).filter(v => v.type === "slide");

        for (let i of hasil) {
            await conn.sendFile(
                m.chat,
                i.link,
                '',
                `👤 Username: \`${username}\`\n👁️ Views: \`${stats.views}\`\n❤️ Likes: \`${stats.likes}\`\n💬 Komentar: \`${stats.comments}\`\n🔄 Shares: \`${stats.shares}\`\n📥 Downloads: \`${stats.downloads}\``,
                m
            );
            await conn.delay(500); 
        }
    } catch (e) {
        m.reply(msg.error);
    }
};

// Informasi Tio
Tio.help = ['tiktokslide'];
Tio.tags = ['downloader'];
Tio.command = /^(ttimg|tiktokimg|ttslide|tiktokslide)$/i;
Tio.register = false;
Tio.limit = true;

export default Tio;

async function slide(url) {
    try {
        const response = await axios.post(
            'https://ttsave.app/download',
            { query: url, language_id: '2' },
            {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
            }
        );

        const html = response.data;
        const $ = cheerio.load(html);

        const uniqueId = $('#unique-id').val();
        const username = $('h2.font-extrabold.text-xl.text-center').text();
        const thumbnail = $('a[target="_blank"]').attr('href');
        const profile = $('img.h-24.w-34.rounded-full').attr('src');
        const description = $('p.text-gray-600.px-2.text-center.break-all.w-3/4.oneliner').text();

        const stats = {
            views: $('svg.h-5.w-5.text-gray-500 + span').text(),
            likes: $('svg.h-5.w-5.text-red-500 + span').text(),
            comments: $('svg.h-5.w-5.text-green-500 + span').text(),
            shares: $('svg.h-5.w-5.text-yellow-500 + span').text(),
            downloads: $('svg.h-5.w-5.text-blue-500 + span').text(),
        };

        const download = [];
        $('a[onclick="bdl(this, event)"]').each((i, elem) => {
            const link = $(elem).attr('href');
            const type = $(elem).attr('type');
            const title = $(elem).text().trim();
            download.push({ link, type, title });
        });

        return { uniqueId, username, thumbnail, profile, description, stats, download };
    } catch (error) {
        console.error(error);
        throw error;
    }
}