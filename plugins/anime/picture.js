/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

let Tio = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    if (!text) return m.reply(await Func.exam(usedPrefix, command, 'nahida'))

    await m.reply(msg.wait);
    const result = await getAnimePicture(text);

    if (result) {
        await conn.sendMessage(m.chat, {image: { url: result }, caption: `*Search: ${text}*`}, { quoted: m });
    } else {
        await conn.reply(m.chat, 'Gagal mendapatkan gambar anime.', m);
    }
};

Tio.help = ['pictureanime'];
Tio.tags = ['anime'];
Tio.limit = true;
Tio.command = /^(pic(ture)?anime)$/i;
export default Tio;

async function anime(q) {
    const url = `https://api.anime-pictures.net/api/v3/posts?search_tag=${encodeURIComponent(q)}&lang=en&page=0`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

async function HTML(id, tag) {
    try {
        const response = await fetch(`https://anime-pictures.net/posts/${id}?by_tag=${tag}&lang=en`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        const imgSrc = $('#big_preview').attr('src');
        return imgSrc ? `https:${imgSrc}` : null;
    } catch (error) {
        console.error('Error fetching HTML:', error);
        return null;
    }
}

async function getAnimePicture(searchQuery) {
    try {
        const data = await anime(searchQuery);
        if (!data) {
            console.log('Failed to fetch anime data.');
            return null;
        }

        const { exclusive_tag: tag, posts } = data;

        const random = posts[Math.floor(Math.random() * posts.length)];
        const result = await HTML(random.id, tag.id);

        return result || null;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}