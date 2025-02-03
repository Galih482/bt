import fetch from 'node-fetch';

const allowedSources = [
    'AnimeUKNews', 'Lifehacker', 'Variety', 'MovieWeb', 'CNN', 'BBC', 
    'AlJazeera', 'NYTimes', 'TheGuardian', 'Detik', 'CNBC', 'Kumpara', 
    'Tempo', 'Antara', 'Tribunnews', 'Okezone', 'Republika', 'BBCIndonesia', 
    'Metrotvnews', 'CoconutsJakarta', 'DWNews', 'FoxNews', 'SkyNews', 
    'TheIndependent', 'USAToday', 'Billboard', 'RollingStone', 'NME', 
    'Pitchfork', 'Spin', 'ConsequenceOfSound', 'AllMusic', 'IndieShuffle', 
    'Stereogum', 'Kotaku', 'Polygon', 'IGN', 'GameSpot', 'RockPaperShotgun', 
    'VG247', 'Joystiq', 'Eurogamer', 'Decrypt', 'FilmSchoolRejects', 
    'AnimeNewsNetwork', 'KotakuAnime', 'OtakuNews'
];

const sourceMapping = {
    'hacker': 'Lifehacker',
    'anime': 'AnimeUKNews',
    'variety': 'Variety',
    'movie': 'MovieWeb',
    'cnn': 'CNN',
    'bbc': 'BBC',
    'aljazeera': 'AlJazeera',
    'nytimes': 'NYTimes',
    'theguardian': 'TheGuardian',
    'detik': 'Detik',
    'cnbc': 'CNBC',
    'kumpara': 'Kumpara',
    'tempo': 'Tempo',
    'antara': 'Antara',
    'tribunnews': 'Tribunnews',
    'okezone': 'Okezone',
    'republika': 'Republika',
    'bbcindonesia': 'BBCIndonesia',
    'metrotv': 'Metrotvnews',
    'coconuts': 'CoconutsJakarta',
    'dw': 'DWNews',
    'fox': 'FoxNews',
    'sky': 'SkyNews',
    'independent': 'TheIndependent',
    'usa': 'USAToday',
    'billboard': 'Billboard',
    'rollingstone': 'RollingStone',
    'nme': 'NME',
    'pitchfork': 'Pitchfork',
    'spin': 'Spin',
    'consequence': 'ConsequenceOfSound',
    'allmusic': 'AllMusic',
    'indieshuffle': 'IndieShuffle',
    'stereogum': 'Stereogum',
    'kotaku': 'Kotaku',
    'polygon': 'Polygon',
    'ign': 'IGN',
    'gamespot': 'GameSpot',
    'rockpapershotgun': 'RockPaperShotgun',
    'vg247': 'VG247',
    'joystiq': 'Joystiq',
    'eurogamer': 'Eurogamer',
    'decrypt': 'Decrypt',
    'filmschool': 'FilmSchoolRejects',
    'anews': 'AnimeNewsNetwork',
    'kotakuanime': 'KotakuAnime',
    'otakunews': 'OtakuNews'
};

const Tio = async (m, { conn, args, usedPrefix, command }) => {
    let text;
    if (args.length >= 1) {
        text = args.slice(0).join(" ");
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text;
    } else {
        throw '*Contoh : .news CNN*\n\nHarap pilih dari: AnimeUKNews, Lifehacker, Variety, MovieWeb, CNN, BBC, AlJazeera, NYTimes, TheGuardian, Detik, CNBC, Kumpara, Tempo, Antara, Tribunnews, Okezone, Republika, BBCIndonesia, Metrotvnews, CoconutsJakarta, DWNews, FoxNews, SkyNews, TheIndependent, USAToday, Billboard, RollingStone, NME, Pitchfork, Spin, ConsequenceOfSound, AllMusic, IndieShuffle, Stereogum, Kotaku, Polygon, IGN, GameSpot, RockPaperShotgun, VG247, Joystiq, Eurogamer, Decrypt, FilmSchoolRejects, AnimeNewsNetwork, KotakuAnime, OtakuNews';
    }

    // Mengatur text berdasarkan kata kunci
    const lowerText = text.toLowerCase();
    if (sourceMapping[lowerText]) {
        text = sourceMapping[lowerText];
    }

    // Validasi sumber
    if (!allowedSources.includes(text)) {
        throw `Sumber tidak valid. Harap pilih dari: ${allowedSources.join(', ')}`;
    }

    try {
        await m.react('🔍');

        const res = await fetch(
            `https://api.maelyn.tech/api/maelyn/news/aggregator?source=${encodeURIComponent(text)}&apikey=galih`
        );
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        console.log('res= ', res);

 const data = await res.json();
        console.log('data=', data);

        if (data.status === "Success" && Array.isArray(data.result) && data.result.length > 0) {
            let replyText = `🔎 Hasil pencarian untuk *"${text}"*:\n\n`;
            for (let item of data.result) {
                replyText += `𝓼 *${item.title}*\n`;
                replyText += `*🔗 URL:* ${item.link}\n`;
                replyText += `*📰 Konten:* ${item.content || "Tidak Ditemukan"}\n`; // Menampilkan "Tidak Ditemukan" jika konten tidak ada
                replyText += `*⏰ Waktu:* ${item.pubDate || "Tidak Diketahui"}\n\n`;
            }
            m.reply(replyText);
        } else {
            await m.react("❌");
            m.reply("❗ Tidak ada hasil pencarian yang ditemukan.");
        }
    } catch (error) {
        console.error(error);
        await m.react("❌");
        m.reply("⚠️ Terjadi kesalahan saat mengambil data. Silakan coba lagi nanti.");
    }
};

Tio.tags = ["internet"];
Tio.help = ["news"];
Tio.command = ["news"];
Tio.premium = false;
Tio.register = true;

export default Tio;