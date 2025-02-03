/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import axios from "axios"
import * as cheerio  from "cheerio";

let handler = async (m, { conn, text, command, usedPrefix }) => {
    const args = text.split(' ');
    const subCommand = args[0] || '';
    const query = args.slice(1).join(' ');

    switch (subCommand) {
        case 'update':
            const updates = await animexinUpdate();
            conn.reply(m.chat, formatUpdate(updates), m);
            break;
            
        case 'search':
            if (!query) return conn.reply(m.chat, `Gunakan format: ${usedPrefix + command} search <keyword>`, m);
            const searchResults = await animexinSearch(query);
            conn.reply(m.chat, formatSearch(searchResults), m);
            break;
            
        case 'detail':
            if (!query) return conn.reply(m.chat, `Gunakan format: ${usedPrefix + command} detail <url>`, m);
            const detailResult = await animexinDetail(query);
            conn.sendMessage(m.chat, { image: { url: detailResult.image }, caption: formatDetail(detailResult)}, {quoted: m});
            break;
            
        default:
            conn.reply(m.chat, `Gunakan perintah:\n${usedPrefix + command} update\n${usedPrefix + command} search <keyword>\n${usedPrefix + command} detail <url>`, m);
            break;
    }
};

handler.help = handler.command = ['animexin'];
handler.tags = ['main'];
export default handler;

// Function Scraper
async function animexinUpdate() {
    try {
        const { data } = await axios.get('https://animexin.dev/');
        const $ = cheerio.load(data);
        const animeList = [];

        $('.listupd .bsx').each((index, element) => {
            const title = $(element).find('h2[itemprop="headline"]').text();
            const url = $(element).find('a[itemprop="url"]').attr('href');
            const image = $(element).find('img[itemprop="image"]').attr('src');
            const episode = $(element).find('.eggepisode').text();
            const type = $(element).find('.eggtype').text();

            animeList.push({ title, url, image, episode, type });
        });

        return animeList;
    } catch (error) {
        return `Terjadi kesalahan: ${error.message}`;
    }
}

async function animexinDetail(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const episodeData = {
            title: $('h2[itemprop="partOfSeries"]').text(),
            episodeTitle: $('h2[itemprop="headline"]').text(),
            image: $('.thumb img[itemprop="image"]').attr('src'),
            rating: $('.rating strong').text(),
            status: $('.spe span:contains("Status:")').text().replace('Status: ', ''),
            network: $('.spe span:contains("Network:") a').text(),
            studio: $('.spe span:contains("Studio:") a').text(),
            released: $('.spe span:contains("Released:")').text().replace('Released: ', ''),
            duration: $('.spe span:contains("Duration:")').text().replace('Duration: ', ''),
            country: $('.spe span:contains("Country:") a').text(),
            type: $('.spe span:contains("Type:")').text().replace('Type: ', ''),
            episodes: $('.spe span:contains("Episodes:")').text().replace('Episodes: ', ''),
            fansub: $('.spe span:contains("Fansub:")').text().replace('Fansub: ', ''),
            genres: $('.genxed a').map((i, el) => $(el).text()).get(),
            description: $('.desc.mindes').text().trim(),
            downloadLinks: []
        };

        $('.mctnx .soraddlx').each((index, element) => {
            const subtitleType = $(element).find('.sorattlx h3').text();
            const links = $(element).find('.soraurlx a').map((i, el) => ({
                url: $(el).attr('href')
            })).get();

            episodeData.downloadLinks.push({ subtitleType, links });
        });

        return episodeData;
    } catch (error) {
        return `Terjadi kesalahan: ${error.message}`;
    }
}

async function animexinSearch(keyword) {
    try {
        const { data } = await axios.get('https://animexin.dev/?s=' + encodeURIComponent(keyword));
        const $ = cheerio.load(data);
        const animeList = [];

        $('.listupd article.bs').each((index, element) => {
            const title = $(element).find('h2[itemprop="headline"]').text();
            const url = $(element).find('a[itemprop="url"]').attr('href');
            const image = $(element).find('img[itemprop="image"]').attr('src');
            const status = $(element).find('.epx').text();
            const subtitle = $(element).find('.sb').text();
            const type = $(element).find('.typez').text();

            animeList.push({ title, url, image, status, subtitle, type });
        });

        return animeList;
    } catch (error) {
        return `Terjadi kesalahan: ${error.message}`;
    }
}

// Formatter Functions
function formatUpdate(animeList) {
    return animeList.map((anime, i) => `${i + 1}. *${anime.title}*\nType: ${anime.type}\nEpisode: ${anime.episode}\nLink: ${anime.url}\n`).join('\n');
}

function formatSearch(searchResults) {
    return searchResults.map((anime, i) => `${i + 1}. *${anime.title}*\nType: ${anime.type}\nStatus: ${anime.status}\nLink: ${anime.url}\n`).join('\n');
}

function formatDetail(detail) {
    return `*${detail.title}*\nEpisode: ${detail.episodeTitle}\nRating: ${detail.rating}\nStatus: ${detail.status}\nStudio: ${detail.studio}\nReleased: ${detail.released}\nGenres: ${detail.genres.join(', ')}\n\nDescription:\n${detail.description}\n\nDownload Links:\n${detail.downloadLinks.map(dl => `*${dl.subtitleType}*\n${dl.links.map(l => `- [${l.url}]`).join('\n')}`).join('\n\n')}`;
}