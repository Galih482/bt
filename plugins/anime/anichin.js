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
    let [type, teks] = text.split('|');

    switch (type.toLowerCase()) {
        case 'latest':
            const latestResults = await Anichin.Latest();
            if (latestResults.length === 0) return m.reply('❌ *Tidak ada hasil terbaru.*');
            const latestMessage = latestResults.map(v => 
`📺 *Judul*: ${v.title}
🎬 *Episode*: ${v.episode}
📂 *Tipe*: ${v.type}
🔗 *Link*: [Klik Disini](${v.url})
🖼️ *Thumbnail*: [Lihat Gambar](${v.thumbnail})`
            ).join('\n\n');
            m.reply(latestMessage);
            break;

        case 'detail':
            if (!teks) return m.reply('⚠️ *Masukkan URL untuk detail.*');
            try {
                const details = await Anichin.Detail(teks.trim());
                const detailMessage = `
🎥 *Judul*: ${details.title}
⭐ *Rating*: ${details.rating}
👥 *Followers*: ${details.followers}
📂 *Status*: ${details.status}
📺 *Jaringan*: ${details.network}
🏢 *Studio*: ${details.studio}
🗓️ *Rilis*: ${details.released}
⏱️ *Durasi*: ${details.duration}
📆 *Musim*: ${details.season}
🌍 *Negara*: ${details.country}
🎞️ *Episode*: ${details.episodes}
🎭 *Genre*: ${details.genres.join(', ')}
📝 *Sinopsis*: ${details.synopsis}
🖼️ *Thumbnail*: [Lihat Gambar](${details.thumbnail})
                `;
                m.reply(detailMessage);
            } catch (err) {
                m.reply(`❌ *Terjadi kesalahan*: ${err.message}`);
            }
            break;

        case 'episode':
            if (!teks) return m.reply('⚠️ *Masukkan URL untuk daftar episode.*');
            const episodes = await Anichin.Episode(teks.trim());
            if (episodes.length === 0) return m.reply('❌ *Tidak ada episode ditemukan.*');
            const episodeMessage = episodes.map(e => 
`🎥 *Episode*: ${e.episodeNumber}
📜 *Judul*: ${e.title}
🎞️ *Sub*: ${e.subStatus}
📅 *Tanggal Rilis*: ${e.releaseDate}
🔗 *Link*: [Klik Disini](${e.link})`
            ).join('\n\n');
            m.reply(episodeMessage);
            break;

        case 'download':
            if (!teks) return m.reply('⚠️ *Masukkan URL untuk daftar download.*');
            const downloads = await Anichin.Download(teks.trim());
            if (downloads.length === 0) return m.reply('❌ *Tidak ada tautan unduhan ditemukan.*');
            const downloadMessage = downloads.map(d => 
`🎞️ *Resolusi*: ${d.resolution}
🔗 *Link*: 
${d.links.map(l => `🌐 ${l.host}: [Klik Disini](${l.url})`).join('\n')}`
            ).join('\n\n');
            m.reply(downloadMessage);
            break;

        case 'search':
            if (!teks) return m.reply('⚠️ *Masukkan kata kunci pencarian.*');
            const searchResults = await Anichin.Search(teks.trim());
            if (searchResults.length === 0) return m.reply('❌ *Tidak ada hasil pencarian.*');
            const searchMessage = Anichin.searchResults.map(r => 
`📺 *Judul*: ${r.title}
📂 *Tipe*: ${r.type}
📝 *Status*: ${r.status}
🔗 *Link*: [Klik Disini](${r.link})
🖼️ *Thumbnail*: [Lihat Gambar](${r.image})`
            ).join('\n\n');
            m.reply(searchMessage);
            break;

        case 'popular':
            const popularResults = await Anichin.Popular();
            if (popularResults.length === 0) return m.reply('❌ *Tidak ada hasil populer.*');
            const popularMessage = Anichin.popularResults.map(p => 
`📺 *Judul*: ${p.title}
🎬 *Episode*: ${p.episode}
📂 *Tipe*: ${p.type}
🔗 *Link*: [Klik Disini](${p.link})
🖼️ *Thumbnail*: [Lihat Gambar](${p.image})`
            ).join('\n\n');
            m.reply(popularMessage);
            break;

        default:
            m.reply('⚠️ *Tipe tidak dikenal.*\nPilih salah satu dari: `latest`, `detail`, `episode`, `download`, `search`, `popular`.');
    }
};

Tio.help = Tio.command = ['anichin'];
Tio.tags = ['anime'];
export default Tio;

const Anichin = {
Latest: async () => {
  const url = 'https://anichin.date/';
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const results = [];

    $('.listupd.normal .bs').each((_, element) => {
      const linkElement = $(element).find('a');
      const title = linkElement.attr('title');
      const url = linkElement.attr('href');
      const episode = $(element).find('.bt .epx').text().trim();
      const thumbnail = $(element).find('img').attr('src');
      const type = $(element).find('.typez').text().trim();

      results.push({ title, url, episode, thumbnail, type });
    });

    return results
  } catch (error) {
    console.error('Error fetching latest:', error.message);
  }
},

Episode: async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const episodes = [];

    $('.eplister ul li').each((_, element) => {
      const episodeNumber = $(element).find('.epl-num').text().trim();
      const title = $(element).find('.epl-title').text().trim();
      const subStatus = $(element).find('.epl-sub .status').text().trim();
      const releaseDate = $(element).find('.epl-date').text().trim();
      const link = $(element).find('a').attr('href');

      episodes.push({
        episodeNumber,
        title,
        subStatus,
        releaseDate,
        link
      });
    });

    return episodes;
  } catch (error) {
    console.error('Error:', error.message);
    return [];
  }
},

Download: async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const downloads = [];

    $('.mctnx .soraddlx').each((_, element) => {
      const resolution = $(element).find('.soraurlx strong').first().text().trim();
      const links = [];

      $(element).find('.soraurlx a').each((_, linkElement) => {
        const host = $(linkElement).text().trim();
        const url = $(linkElement).attr('href');
        links.push({ host, url });
      });

      downloads.push({ resolution, links });
    });

    return downloads;
  } catch (error) {
    console.error('Error:', error.message);
    return [];
  }
},

Detail: async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const title = $('.entry-title').text().trim();
    const thumbnail = $('.thumb img').attr('src');
    const rating = $('.rating strong').text().replace('Rating ', '').trim();
    const followers = $('.bmc').text().replace('Followed ', '').replace(' people', '').trim();
    const synopsis = $('.synp .entry-content').text().trim();
    const alternativeTitles = $('.alter').text().trim();
    const status = $('.info-content .spe span:contains("Status")').text().replace('Status:', '').trim();
    const network = $('.info-content .spe span:contains("Network") a').text().trim();
    const studio = $('.info-content .spe span:contains("Studio") a').text().trim();
    const released = $('.info-content .spe span:contains("Released")').text().replace('Released:', '').trim();
    const duration = $('.info-content .spe span:contains("Duration")').text().replace('Duration:', '').trim();
    const season = $('.info-content .spe span:contains("Season") a').text().trim();
    const country = $('.info-content .spe span:contains("Country") a').text().trim();
    const type = $('.info-content .spe span:contains("Type")').text().replace('Type:', '').trim();
    const episodes = $('.info-content .spe span:contains("Episodes")').text().replace('Episodes:', '').trim();
    const genres = $('.genxed a').map((_, el) => $(el).text().trim()).get();

    return {
      title,
      thumbnail,
      rating,
      followers,
      synopsis,
      alternativeTitles,
      status,
      network,
      studio,
      released,
      duration,
      season,
      country,
      type,
      episodes,
      genres
    };
  } catch (error) {
    throw new Error(`Error scraping detail: ${error.message}`);
  }
},

Search: async (query) => {
  const url = `https://anichin.date/?s=${encodeURIComponent(query)}`;
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const results = [];

    $('.listupd article').each((_, el) => {
      const title = $(el).find('.tt h2').text().trim();
      const type = $(el).find('.typez').text().trim();
      const status = $(el).find('.bt .epx').text().trim();
      const link = $(el).find('a').attr('href');
      const image = $(el).find('img').attr('src');

      results.push({ title, type, status, link, image });
    });

    return results;
  } catch (error) {
    throw new Error(`Error scraping search results: ${error.message}`);
  }
},

 Popular: async () => {
  const url = 'https://anichin.date/';
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const popularToday = [];

    $('.bixbox .listupd .bsx').each((_, element) => {
      const title = $(element).find('.tt').text().trim();
      const episode = $(element).find('.bt .epx').text().trim();
      const type = $(element).find('.typez').text().trim();
      const link = $(element).find('a').attr('href');
      const image = $(element).find('img').attr('src');

      popularToday.push({ title, episode, type, link, image });
    });

    return popularToday
  } catch (error) {
    console.error('Error fetching popular today:', error.message);
  }
}
}