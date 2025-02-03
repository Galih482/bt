/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import axios from "axios";
import * as cheerio from "cheerio"

const handler = async (m, { conn, command, text, usedPrefix }) => {
    if (!text) {
      return m.reply(await Func.exam(usedPrefix, command, '[judul]'))
    }

    try {
    await m.reply(msg.wait)
    const appleMusic = new AppleMusic();
    const searchResults = await appleMusic.search(text);

    if (!searchResults.length) {
      throw new Error("Tidak ditemukan hasil untuk pencarian ini.");
    }

    const songInfo = searchResults[0];
    const downloadInfo = await appleMusic.download(songInfo.song);

    if (!downloadInfo.download) {
      throw new Error("Gagal mendownload lagu.");
    }

    await conn.sendMessage(m.chat, {
      audio: { url: downloadInfo.download },
      mimetype: 'audio/mpeg',
      fileName: `${songInfo.title}.mp3`
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    await m.reply(msg.wait)
  }
};

handler.help = ["applemusic"].map(v => v + " *query*");
handler.tags = ["music"];
handler.command = /^(applemusic)$/i;

export default handler;

class AppleMusic {
    search = async function search(q) {
        return new Promise(async (resolve, reject) => {
            await axios
                .get("https://music.apple.com/id/search?term=" + encodeURIComponent(q))
                .then((a) => {
                    let $ = cheerio.load(a.data);
                    let array = [];
                    $(".shelf-grid__body ul li .track-lockup").each((a, i) => {
                        let title = $(i)
                            .find(".track-lockup__content li")
                            .eq(0)
                            .find("a")
                            .text()
                            .trim();
                        let album = $(i)
                            .find(".track-lockup__content li")
                            .eq(0)
                            .find("a")
                            .attr("href");
                        let crop = $(i)
                            .find(".track-lockup__content li")
                            .eq(0)
                            .find("a")
                            .attr("href")
                            .split("/")
                            .pop();
                        let song =
                            album
                            .replace(crop, "")
                            .trim()
                            .replace("/album/", "/song/")
                            .trim() + album.split("i=")[1];
                        let image = $(i)
                            .find(".svelte-3e3mdo source")
                            .eq(1)
                            .attr("srcset")
                            .split(",")[1]
                            .split(" ")[0]
                            .trim();
                        let artist = {
                            name: $(i)
                                .find(".track-lockup__content li")
                                .eq(1)
                                .find("a")
                                .text()
                                .trim(),
                            url: $(i)
                                .find(".track-lockup__content li")
                                .eq(1)
                                .find("a")
                                .attr("href"),
                        };
                        array.push({
                            title,
                            image,
                            song,
                            artist,
                        });
                    });
                    resolve(array);
                });
        });
    };

    download = async function download(url) {
        return new Promise(async (resolve, reject) => {
            axios.get(url).then(async (a) => {
                let $ = cheerio.load(a.data);
                let json = JSON.parse($("script").eq(0).text());
                let info = {
                    metadata: {},
                    download: {}
                }
                delete json.audio["@type"]
                delete json.audio.audio
                delete json.audio.inAlbum["@type"]
                delete json.audio.inAlbum.byArtist
                json.audio.artist = json.audio.byArtist[0]
                delete json.audio.artist["@type"]
                delete json.audio.byArtist
                info.metadata = json.audio
                let {
                    data
                } = await axios.get("https://aaplmusicdownloader.com/api/composer/ytsearch/mytsearch.php", {
                    params: {
                        name: info.metadata.name,
                        artist: info.metadata.artist.name,
                        album: info.metadata.inAlbum.name,
                        link: info.metadata.url,
                    }
                }).catch(e => e.response);
                if (!data.videoid) return reject(data);
                let download = await axios.get("https://aaplmusicdownloader.com/api/ytdl.php?q=" + data.videoid).catch(e => e.response);
                info.download = download.data.dlink
                resolve(info);
            })
        })
    }
}