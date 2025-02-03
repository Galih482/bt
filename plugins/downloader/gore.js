/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import * as cheerio from 'cheerio';
import axios from 'axios';

const Tio = async (m, { conn, text, command, usedPrefix }) => {
    switch (command) {
        case 'goresearch':
            if (!text) return m.reply(await Func.exam(usedPrefix, command, 'man'));
            try {
                m.reply(msg.wait);
                const goreResults = await goresearch(text);
                const resultCaption = formatGoreResults(goreResults);
                conn.reply(m.chat, resultCaption, m);
            } catch (error) {
                m.reply(msg.error);
            }
            break;

        case 'goredl':
            if (!text) return m.reply(await Func.exam(usedPrefix, command, 'url'));
            try {
                m.reply(msg.wait);
                const downloadResult = await goredl(text);
                const downloadMessage = formatDownloadMessage(downloadResult);
                conn.sendFile(m.chat, downloadResult.data.link || error, '', downloadMessage, m);
            } catch (error) {
                m.reply(msg.error);
            }
            break;
    }
};

Tio.help = Tio.command = ['goredl', 'goresearch'];
Tio.tags = ['downloader'];
Tio.premium = true;

export default Tio;

function goredl(link) {
    return new Promise((resolve, reject) => {
        axios.get(link)
            .then(({ data }) => {
                const $ = cheerio.load(data);
                const result = {
                    creator: "Bot",
                    data: {
                        judul: $('div.single-main-container > div > div.bb-col.col-content > div > div > div > div > header > h1').text(),
                        views: $('div.single-main-container > div > div.bb-col.col-content > div > div > div > div > div.s-post-meta-block.bb-mb-el > div > div > div.col-r.d-table-cell.col-md-6.col-sm-6.text-right-sm > div > span > span.count').text(),
                        comment: $('div.single-main-container > div > div.bb-col.col-content > div > div > div > div > div.s-post-meta-block.bb-mb-el > div > div > div.col-r.d-table-cell.col-md-6.col-sm-6.text-right-sm > div > a > span.count').text(),
                        link: $('video > source').attr('src'),
                    },
                };
                resolve(result);
            })
            .catch(reject);
    });
}

function goresearch(query) {
    return new Promise((resolve, reject) => {
        axios.get(`https://seegore.com/?s=${query}`).then(dataResponse => {
            const $$ = cheerio.load(dataResponse.data);
            const paginationLink = 'https://seegore.com/?s=' + query;
            axios.get(paginationLink)
                .then(({ data }) => {
                    const $ = cheerio.load(data);
                    const format = extractGoreData($);
                    const result = {
                        creator: "Bot",
                        data: format,
                    };
                    resolve(result);
                })
                .catch(reject);
        });
    });
}

function extractGoreData($) {
    const results = [];
    $('#post-items > li > article').each((index, element) => {
        const link = $(element).find('header > h2 > a').attr('href');
        const title = $(element).find('header > h2 > a').text();
        const uploader = $(element).find('div.bb-cat-links > a').text();
        const thumb = $(element).find('div.post-thumbnail > a > div > img').attr('src');
        results.push({ judul: title, uploader, thumb, link });
    });
    return results;
}

function formatGoreResults(results) {
    let caption = `*Gore Search🔎*\n\n`;
    results.data.forEach((item, index) => {
        caption += `[ *${index + 1}* ] ⤵️\n *Judul*: ${item.judul}\n`;
        caption += ` *Uploader*: ${item.uploader}\n`;
        caption += ` *Link*: ${item.link}\n\n`;
    });
    return caption;
}

function formatDownloadMessage(result) {
    return `[ *WARNING* ]\nPihak Bot tidak bertanggung jawab atas video ini jadi lakukan dengan bijak !\n\n*Title*: ${result.data.judul}\n*Views*: ${result.data.views}\n*Comment*: ${result.data.comment}`;
}