/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import axios from "axios";
import * as cheerio from "cheerio";

let Tio = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    let id = m.sender;
    conn.film = conn.film || {};
    conn.film[id] = conn.film[id] || {
        film: []
    };

    if (!text) return m.reply('Masukan pencarian!');

    try {
        const result = await layarkaca.search(text);
        if (!result || result.length === 0) return m.reply('Hasil pencarian tidak ditemukan.');

        const cap = result.map(({
            title,
            link
        }, i) => ({
            text: `${i + 1}. ${title}\n${link}`
        }));

        await m.reply(`*Pencarian ${text}*\n\n${cap.map(item => item.text).join('\n\n')}`);
        conn.film[id].film = result;

        setTimeout(() => {
            delete conn.film[id]
        }, 10000);
    } catch (err) {
        console.error(err);
        m.reply('Terjadi kesalahan saat melakukan pencarian.');
    }
};

Tio.before = async (m) => {
    let id = m.sender;
    conn.film = conn.film || {};
    conn.film[id] = conn.film[id] || {
        film: []
    };
    if (!(id in conn.film) || !m.quoted) return;
    if (!conn.film[id].film || conn.film[id].film.length < 1) return;

    try {
        const index = parseInt(m.text) - 1;
        if (isNaN(index) || index < 0 || index >= conn.film[id].film.length) {
            return m.reply('Nomor yang Anda masukkan tidak valid atau tidak ada dalam daftar.');
        }

        await m.reply('Mengambil informasi...');

        const input = conn.film[id].film[index];
        const GET = await layarkaca.details(input.link);
        const details = Object.keys(GET)
            .filter(v => GET[v])
            .map(v => `- *${v.charAt(0).toUpperCase() + v.slice(1)}*: ${GET[v]}`)
            .join('\n');

        if (details) {
            await conn.sendMessage(m.chat, {
                image: {
                    url: GET.thumbnail
                },
                caption: details
            }, {
                quoted: m
            });
        }
        delete conn.film[id]
    } catch (err) {
        console.error(err);
        m.reply('Terjadi kesalahan saat mengambil informasi.');
    }
};

Tio.help = ['layarkaca'];
Tio.command = ['layarkaca'];
Tio.tags = ['internet'];

export default Tio;

const layarkaca = {
    search: async (q) => {
        const searchUrl = `https://tv9.lk21official.pics/search.php?s=${encodeURIComponent(q)}`;
        try {
            const {
                data
            } = await axios.get(searchUrl);
            const $ = cheerio.load(data);
            const movies = [];

            $('.search-item').each((index, element) => {
                const title = $(element).find('h3 a').attr('title');
                const thumbnail = $(element).find('img').attr('src');
                const link = $(element).find('h3 a').attr('href');

                movies.push({
                    title,
                    thumbnail: `https://tv9.lk21official.pics${thumbnail}`,
                    link: `https://tv9.lk21official.pics${link}`
                });
            });

            return movies;
        } catch (error) {
            console.error('Error fetching search results:', error);
            return [];
        }
    },

    details: async (link) => {
        try {
            const {
                data
            } = await axios.get(link);
            const $ = cheerio.load(data);

            const title = $('article.post header.post-header h2').text().trim();
            const thumbnail = $('article.post .content-poster img').attr('src');
            const description = $('article.post blockquote').text().trim();
            const uploadDate = $('article.post div:contains("Diunggah")').next('h3').text().trim();
            const releaseDate = $('article.post div:contains("Diterbitkan")').next('h3').text().trim();
            const duration = $('article.post div:contains("Durasi")').next('h3').text().trim();
            const quality = $('article.post div:contains("Kualitas")').next('h3').text().trim();
            const country = $('article.post div:contains("Negara")').next('h3').text().trim();
            const director = $('article.post div:contains("Sutradara")').next('h3').text().trim();
            const genre = $('article.post div:contains("Genre")').next('h3').text().trim();
            const imdbRating = $('article.post div:contains("IMDb")').next('h3').text().trim();

            const videoUrl = $('#loadPlayer iframe').attr('src');

            return {
                title,
                thumbnail: `https://tv9.lk21official.pics${thumbnail}`,
                description,
                uploadDate,
                releaseDate,
                duration,
                quality,
                country,
                director,
                genre,
                imdbRating,
                videoUrl
            };
        } catch (error) {
            console.error('Error fetching movie details:', error);
            return null;
        }
    }
};