/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import axios from "axios";
import * as cheerio from "cheerio";

let Tio = async (m, {
    conn,
    command,
    text
}) => {
    let no = 1
    const [cmd, teks] = text.split('|')
    switch (cmd) {
        case 'search':
            if (!teks) return m.reply('masukan judul');
            await m.reply('Tunggu...');
            let cari = await search(teks);
            if (!cari.status) return m.reply('ada kesalahan dalam scraping');
            let cr = 'List searching\n\n';
            for (let i of cari.results) {
                cr += `${no++}. ${i.title}\n`
                cr += `${i.link}\n\n`
            }
            await m.reply(cr);
            break;
        case 'episode':
            if (!teks) return m.reply('masukan url dari website https://donghuastream.org');
            await m.reply('Tunggu...');
            let eps = await episode(teks);
            if (!eps.status) return m.reply('ada kesalahan dalam scraping');
            let ep = 'List searching\n\n';
            for (let i of eps.results) {
                ep += `${no++}. ${i.title}\n`
                ep += `${i.url}\n\n`
            }
            await m.reply(ep);
            break;
        case 'video':
            if (!teks) return m.reply('masukan url episode dari website https://donghuastream.org');
            await m.reply('Tunggu...');
            let vid = await video(teks);
            if (!vid.status) return m.reply('ada kesalahan dalam scraping');
            await m.reply(`Link tonton: ${vid.results}`);
            break;
        default:
            m.reply('Opsi:\n- search\n- episode\n- video')
    }
}
Tio.help = Tio.command = ['donghua']
Tio.tags = ['anime']

export default Tio;

async function search(q) {
    try {
        const {
            data
        } = await axios.get(`https://donghuastream.org/?s=${q}`);

        const $ = cheerio.load(data);
        const results = [];
        $('.listupd article .bsx a').each((i, element) => {
            const title = $(element).attr('title');
            const link = $(element).attr('href');

            results.push({
                title,
                link
            });
        });

        return {
            status: true,
            results
        }
    } catch (error) {
        console.error('Error fetching the page:', error);
        return {
            status: false,
            error
        }
    }
}

async function episode(url) {
    try {
        const {
            data
        } = await axios.get(url);

        const $ = cheerio.load(data);

        const episodes = [];

        $('.eplister ul li a').each((i, element) => {
            const episodeTitle = $(element).find('.epl-title').text().trim();
            const episodeUrl = $(element).attr('href').trim();

            episodes.push({
                title: episodeTitle,
                url: episodeUrl
            });
        });

        return {
            status: true,
            results: episodes
        }
    } catch (error) {
        console.error('Error fetching the page:', error);
        return {
            status: false,
            error
        }
    }
}


async function video(url) {
    try {
        const {
            data
        } = await axios.get(url);

        const $ = cheerio.load(data);

        const videoUrl = $('meta[itemprop="embedUrl"]').attr('content');

        return {
            status: true,
            results: videoUrl
        }
    } catch (error) {
        console.error('Error fetching the page:', error);
        return {
            status: false,
            error
        }
    }
}