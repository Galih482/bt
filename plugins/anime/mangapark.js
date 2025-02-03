/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import axios from "axios";
import * as cheerio from "cheerio";
import cron from 'node-cron';

let jadwal = null;

let Tio = async (m, {
    conn,
    text,
    command,
    dbChat
}) => {

    text = text.split('|');
    let manga = new Manga();

    switch (text[0]) {
        case 'update':
            if (text[1] === 'on') {
                if (jadwal !== null) {
                    jadwal.stop();
                }
                jadwal = cron.schedule('0 * * * *', async function() {
                    try {
                        const results = await manga.update()

                        if (results.length > 0) {
                            conn.sendFile(
                                m.chat,
                                results[0].thumbnail,
                                '',
                                `*MANGAPARK UPDATE*\n\nJudul : ${results[0].title}\nRilis : ${results[0].rilis}\nDescription : ${results[0].description}\nUrl: ${results[0].url}`, m
                            );
                        }
                    } catch (error) {
                        console.error('Error during scheduled update:', error);
                    }
                });
                conn.reply(m.chat, 'Mangapark update sudah diaktifkan', m);
                dbChat[m.chat].mangapark = true;
            } else if (text[1] === 'off') {
                if (jadwal !== null) {
                    jadwal.stop();
                    jadwal = null;
                }
                conn.reply(m.chat, 'Mangapark update sudah dimatikan', m);
                dbChat[m.chat].mangapark = false;
            } else {
                conn.reply(m.chat, 'Pilihan tidak valid. Harap masukkan \'on\' atau \'off\'', m);
            }
            break
        case 'detail':
            if (!text[1]) return m.reply("masukan url mangapark.io")
            try {
                const {
                    thumbnail,
                    title,
                    genre,
                    description,
                    rating
                } = await manga.details(text[1]);
                let caption = `Title: ${title}
Genre: ${genre}
Rating: ${rating}
Description: ${description}`
                await conn.sendFile(m.chat, thumbnail, '', caption, m)
            } catch (e) {
                m.reply(msg.error)
            }
            break
        default:
            if (!text[0]) return m.reply('masukan judul manga')

            try {
                const data = await manga.search(text[0])
                let cpp = `Mangapark Search\n\n`,
                    no = 1
                    cpp += `- detail (mendapatkan detail)\n\n`
                for (let a of data) {
                    cpp += `${no++}\nTitle: ${a.data.name}\n`
                    cpp += `Url: https://mangapark.io${a.data.urlPath}\n`
                    cpp += `Genre: ${a.data.genres.join(', ')}\n`
                    cpp += `Authors: ${a.data.authors}\n`
                    cpp += `Artists: ${a.data.artists}\n`
                    cpp += `altNames: ${a.data.altNames}\n`
                    cpp += `Score: ${a.data.score_val}\n`
                    cpp += `Follows: ${a.data.follows}\n`
                    cpp += `Reviews: ${a.data.reviews}\n`
                    cpp += `Comments Total: ${a.data.comments_total}\n`
                    cpp += `Chapter: \n- ${a.data.max_chapterNode.data.dname}\n- https://mangapark.io${a.data.max_chapterNode.data.urlPath}\n\n`
                }
                await m.reply(cpp)
            } catch (e) {
                m.reply(msg.error)
            }
    }

}
Tio.help = Tio.command = ["mangapark"]
Tio.tags = ["anime", "internet"]

export default Tio


class Manga {
    constructor() {
        this.base = "https://mangapark.io"
    }

    async update() {
        try {
            let {
                data: html
            } = await axios.get(`${this.base}/latest`);
            let $ = cheerio.load(html);
            const data = [];
            $('.flex.border-b.border-b-base-200.pb-3').each((i, element) => {
                const url = $(element).find('a').attr('href');
                const thumbnail = $(element).find('img').attr('src');
                const title = $(element).find('h3 a span').text();
                const description = $(element).find('.flex.flex-wrap.text-xs.opacity-70 span').map((i, el) => $(el).text()).get().join(', ');
                const rilis = $(element).find('time span').text();

                data.push({
                    url: `${this.base}${url}`,
                    thumbnail,
                    title,
                    description,
                    rilis
                });
            });
            return data
        } catch (e) {
            return e
        }
    }

    async details(url) {
        try {
            const {
                data
            } = await axios.get(url);
            const $ = cheerio.load(data);
            let details = {};

            const element = $('div[q\\:key="g0_12"]');
            const title = element.find('h3 a').text().trim();
            const thumbnail = element.find('img').attr('src')
            const genre = [];
            element.find('div.flex.items-center.flex-wrap span').each((i, el) => {
                genre.push($(el).text().trim());
            });
            const description = $('.limit-html .limit-html-p').text().trim();
            const rating = element.find('div.leading-\\[2\\.0rem\\] span.font-black').text().trim();

            details = {
                title,
                genre: genre.join(', '),
                description,
                thumbnail,
                rating
            };
            return details
        } catch (e) {
            return {
                msg: e
            }
        }
    }


    async search(text) {

        const requestData = {
            query: `
 query get_searchComic($select: SearchComic_Select) {
 get_searchComic(select: $select) {
 reqPage
 reqSize
 reqSort
 reqWord
 newPage
 paging {
 total
 pages
 page
 init
 size
 skip
 limit
 prev
 next
 }
 items {
 id
 data {
 id
 dbStatus
 name
 origLang
 tranLang
 urlPath
 urlCover600
 urlCoverOri
 genres
 altNames
 authors
 artists
 is_hot
 is_new
 sfw_result
 score_val
 follows
 reviews
 comments_total
 max_chapterNode {
 id
 data {
 id
 dateCreate
 dbStatus
 isFinal
 sfw_result
 dname
 urlPath
 is_new
 userId
 userNode {
 id
 data {
 id
 name
 uniq
 avatarUrl
 urlPath
 }
 }
 }
 }
 }
 sser_follow
 sser_lastReadChap {
 date
 chapterNode {
 id
 data {
 id
 dbStatus
 isFinal
 sfw_result
 dname
 urlPath
 is_new
 userId
 userNode {
 id
 data {
 id
 name
 uniq
 avatarUrl
 urlPath
 }
 }
 }
 }
 }
 }
 }
 }
 `,
            variables: {
                select: {
                    word: text,
                    size: 10,
                    page: 1,
                    sortby: "field_score"
                }
            }
        };

        try {
            const response = await axios.post(`${this.base}/apo/`, requestData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data.data.get_searchComic.items
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

}