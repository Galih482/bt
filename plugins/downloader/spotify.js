/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import {
    SpotifyAPI,
    spotifyDl
} from '../../lib/scraper/Spotify.js';

let Tio = async (m, {
    conn,
    text,
    usedPrefix,
    command,
    isPrems
}) => {
    if (!text) return m.reply(await Func.exam(usedPrefix, command, 'cinta untuk starla'));
    await m.reply(msg.wait);

    if (/http(s)?:\/\/open.spotify.com\/track\/[-a-zA-Z0-9]/i.test(text)) {
        try {
            let input = text.replace('https://', '').split('/')[2];
            let spotify = await SpotifyAPI();
            let {
                popularity,
                id,
                duration_ms,
                name,
                artists,
                album
            } = await spotify.getTracks(input);

            let caption = `🎵 *${name.toUpperCase()}* 🎵

- 🎤 Artist : ${artists[0].name}
- ⏳ Duration : ${convertMsToMinSec(duration_ms)}
- 🌟 Popularity : ${popularity}
- 🆔 Id : ${id}

💿 *Album Info*:
- 📀 Name : ${album.name}
- 📅 Release : ${album.release_date}
- 🆔 Album Id : ${album.id}`;

            let buffer = await Func.fetchBuffer(API(APIs['Tixo'], '/canvas/spotify', {
                title: name,
                image: album.images[0].url
            }));
            let chat = await conn.sendFile(m.chat, buffer, false, caption, m);
            let {
                download: music
            } = await spotifyDl(text);

            await conn.sendMessage(m.chat, {
                audio: {
                    url: music
                },
                mimetype: 'audio/mpeg',
                ptt: false
            }, {
                quoted: chat
            });

        } catch (err) {
            await m.reply('Error!, mencoba Spotify v2');
            const {
                result
            } = await Func.fetchJson(API(APIs['Tixo'], '/downloader/spotify-v2', {
                url: text
            }));
            const {
                title,
                thumbnail,
                artist,
                duration,
                release_data: rilis,
                popularity,
                url
            } = result;
            let caption = `🎵 *${title.toUpperCase()}* 🎵

- 🎤 Artist : ${artist}
- ⏳ Duration : ${duration}
- 🌟 Popularity : ${popularity}
- 🗓️ Release: ${rilis}`;

            let chat = await conn.sendFile(m.chat, thumbnail, false, caption, m);

            await conn.sendMessage(m.chat, {
                audio: {
                    url: url
                },
                mimetype: 'audio/mpeg',
                ptt: false
            }, {
                quoted: chat
            });
        }
    } else {
        let spotify = await SpotifyAPI();
        let {
            tracks
        } = await spotify.trackSearch(text);
        let list = tracks.items.map(key =>
            `🎶 Judul: ${key.name}\n🎤 Artist: ${capitalize(key.artists[0].name)}\n▶️ Play music\n${usedPrefix + command} ${key.external_urls.spotify}`
        );

        await conn.sendMessage(
            m.chat, {
                image: {
                    url: tracks.items[0].album.images[0].url
                },
                caption: `🎧 DAFTAR MENU\n🔍 Hasil pencarian ditemukan: \`${tracks.items.length}\`\n\n${list.join('\n\n')}`
            }, {
                quoted: m
            }
        );

    }
};

Tio.help = ['spotify'];
Tio.tags = ['downloader'];
Tio.command = /^(spotify)$/i;
Tio.limit = true;

export default Tio;

function convertMsToMinSec(ms) {
    let seconds = Math.floor(ms / 1000);
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}