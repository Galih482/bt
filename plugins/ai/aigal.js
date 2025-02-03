let Tio = async (m, { conn, text, usedPrefix, command }) => {
    const styles = {
        none: "Tidak ada gaya atau efek yang diterapkan, gambar terlihat natural atau biasa saja.",
        cinematic: "Tampilan seperti film, pencahayaan dramatis, kontras tinggi, fokus pada komposisi yang kuat dan efek visual sinematik.",
        photographic: "Gaya seperti foto nyata dengan ketajaman dan detil tinggi, pencahayaan alami atau studio, suasana realistis.",
        anime: "Gaya gambar seperti animasi Jepang, dengan karakter yang memiliki mata besar, warna-warna cerah, dan gaya garis halus.",
        manga: "Gaya komik Jepang, lebih berfokus pada panel dan ekspresi dramatis dengan penggunaan efek garis untuk menggambarkan emosi.",
        digital_art: "Gambar yang dihasilkan dengan teknik digital, menggunakan alat seperti tablet atau software untuk menciptakan tekstur, warna, dan elemen futuristik.",
        fantasy_art: "Lukisan atau ilustrasi yang menggambarkan dunia fantasi dengan makhluk magis, lanskap ajaib, dan elemen mitologi.",
        neonpunk: "Gaya cyberpunk dengan sorotan neon yang mencolok, atmosfer gelap, futuristik, dan penuh cahaya neon berwarna cerah.",
        "3d_model": "Desain yang tampak seperti model 3D, dengan kedalaman dan dimensi jelas, serta detail yang sangat halus.",
        watercolor: "Lukisan dengan teknik cat air yang memberi kesan lembut, warna-warna yang mengalir, dan tampilan agak kabur.",
        art_nouveau: "Gaya yang menekankan pada desain organik dan bentuk melengkung dengan elemen alam, seperti bunga dan tanaman, sering dengan dekorasi halus.",
        steampunk: "Dunia alternatif dengan teknologi berbasis uap, mesin rumit, pakaian zaman Victoria, dan estetika industri kuno.",
        surrealism: "Gaya yang melibatkan elemen-elemen aneh dan tidak masuk akal, menciptakan pemandangan mimpi dengan objek-objek yang tampaknya tidak berhubungan.",
        minimalist: "Gaya yang mengutamakan kesederhanaan, dengan sedikit elemen dan penggunaan ruang kosong yang luas.",
        pop_art: "Menggunakan warna terang dan kontras yang mencolok, terinspirasi oleh budaya populer dan iklan, dengan sentuhan humor.",
        art_deco: "Desain yang elegan dan simetris dengan elemen dekoratif, menggunakan material mewah dan garis geometris tajam.",
        impressionist: "Lukisan yang menangkap kesan atau perasaan dari pemandangan atau objek dengan sapuan kuas yang longgar dan warna yang cerah.",
        gothic: "Gaya yang gelap dan dramatis, dengan elemen arsitektur seperti lengkungan tinggi, cahaya redup, dan tema mistis.",
        retro_sci_fi: "Desain futuristik dengan nuansa klasik tahun 50-an dan 60-an, seringkali dipengaruhi oleh film dan komik sci-fi lama.",
        woodblock_print: "Gaya seni cetakan kayu tradisional, dengan garis-garis tebal dan blok warna yang sederhana namun kuat.",
        brutalist: "Desain yang kasar dan minimalis dengan elemen beton yang besar dan struktur yang tidak dimanipulasi dengan indah.",
        art_brut: "Gaya seni yang menonjolkan ekspresi spontan dan tak teratur, seringkali dengan teknik yang kasar dan raw.",
        synthwave: "Gaya yang terinspirasi oleh musik dan estetika tahun 80-an, dengan warna neon cerah, grid digital, dan elemen futuristik retro.",
        ukiyo_e: "Seni Jepang klasik dengan garis hitam yang jelas, warna-warna lembut, dan pemandangan atau karakter dalam kehidupan sehari-hari.",
        crystal_punk: "Gaya futuristik dengan penggunaan elemen kristal atau permata, menciptakan suasana misterius dan berkilau.",
        solarpunk: "Gaya desain yang menekankan pada keberlanjutan, dengan elemen alam yang berkembang dan teknologi hijau.",
        liquid_metal: "Desain dengan elemen logam cair yang mengalir dan berkilau, sering digunakan dalam visual futuristik.",
        cosmic_horror: "Gaya yang menciptakan ketakutan dan kekaguman terhadap alam semesta yang tidak bisa dipahami, dengan entitas luar angkasa yang aneh.",
        bio_mechanical: "Menggabungkan unsur-unsur biologis dengan teknologi mekanis, menciptakan bentuk yang organik dan robotik dalam satu kesatuan.",
        quantum_punk: "Futuristik dengan pengaruh teori kuantum, sering menggabungkan elemen mistis dan teknologi canggih.",
        low_poly: "Gaya desain 3D dengan jumlah poligon rendah, memberikan tampilan geometris dan kasar.",
        vaporwave: "Estetika retro dengan nuansa pastel, simbol 80-an dan 90-an, serta pengaruh budaya internet.",
        risograph: "Desain dengan efek seperti cetakan risograph, dengan warna terbatas dan tekstur yang kasar.",
        constructivist: "Gaya yang mengutamakan bentuk geometris dan komposisi dinamis, sering kali digunakan untuk tujuan politik atau sosial.",
        naive_art: "Seni dengan tampilan sederhana dan spontan, sering kali dengan perspektif yang tidak realistis dan warna-warna cerah.",
        glitch_art: "Seni yang menggunakan gangguan digital dan cacat teknis untuk menciptakan gambar yang tampak terdistorsi.",
        bauhaus: "Desain yang menggabungkan seni dan industri dengan estetika fungsional, garis bersih, dan bentuk geometris sederhana.",
        afrofuturism: "Gaya yang menggabungkan teknologi masa depan dengan budaya Afrika, menciptakan narasi futuristik yang terinspirasi oleh tradisi dan mitologi.",
        cyberpunk: "Dunia futuristik dengan teknologi tinggi dan masyarakat distopia, menampilkan kota gelap, neon, dan elemen teknologi canggih.",
        high_fantasy: "Dunia fiksi dengan elemen magis dan makhluk mitologis, seperti naga, penyihir, dan kerajaan yang agung.",
        gothic_cyberpunk: "Kombinasi antara estetika gelap ala gothic dan futuristik cyberpunk, dengan atmosfer yang suram dan penuh teknologi.",
        dreamcore: "Gaya yang menciptakan suasana mimpi dan aneh dengan elemen-elemen visual yang tidak logis dan surreal.",
        bioluminescent: "Dunia yang penuh dengan cahaya alami dari makhluk atau tanaman bioluminescent, memberi kesan magis dan misterius.",
        glitchcore: "Estetika visual yang menggunakan efek cacat digital untuk menciptakan gambar yang terdistorsi dan tidak sempurna.",
        cyber_goth: "Gaya goth yang menggabungkan elemen cyberpunk, dengan pakaian gelap, aksen neon, dan atmosfer futuristik yang kelam.",
        celestial_dream: "Lanskap yang melibatkan elemen langit dan bintang, dengan suasana impian yang misterius dan luar biasa.",
        fluid_abstraction: "Gaya abstrak dengan bentuk cairan yang mengalir, menciptakan gerakan dan kelembutan yang elegan.",
        hyper_realistic: "Desain dengan tingkat detail yang sangat tinggi, menciptakan tampilan yang sangat mendekati kenyataan.",
        neo_tribal: "Gabungan antara bentuk tradisional suku dengan elemen-elemen futuristik, menciptakan desain yang unik dan kontemporer.",
        dark_fantasy: "Dunia fantasi dengan nuansa gelap, melibatkan makhluk jahat dan elemen-elemen menakutkan.",
        pixel_vision: "Gaya yang menggunakan tampilan pixelated, sering kali terinspirasi oleh video game retro.",
        space_opera: "Gaya yang terinspirasi oleh opera luar angkasa, dengan pertempuran epik di ruang angkasa dan makhluk luar angkasa yang fantastis.",
        liquid_sculpture: "Gaya seni yang menggambarkan bentuk cairan yang padat atau mencair, memberikan kesan gerakan dan transisi yang indah.",
        post_apocalyptic: "Dunia pasca-apokaliptik dengan lanskap yang hancur, makhluk mutan, dan teknologi yang terlupakan.",
        neo_futurism: "Gaya futuristik dengan elemen teknologi canggih dan desain yang lebih elegan dan inovatif.",
        arcade_retro: "Estetika retro dari era permainan video tahun 80-an, dengan grafik pixelated dan nuansa nostalgia.",
        psychedelic: "Gaya visual yang berwarna-warni dengan pola yang mengalir, memanipulasi persepsi dan menciptakan dunia yang penuh dengan ilusi.",
        biopunk: "Dunia futuristik dengan kombinasi bioteknologi dan perubahan biologis manusia, sering dengan tema distopia.",
        fantasy_illustration: "Ilustrasi dunia fantasi dengan karakter, makhluk, dan tempat yang luar biasa, penuh imajinasi dan kreativitas.",
        digital_glitch: "Desain yang menggabungkan gangguan digital untuk menciptakan gambar yang terdistorsi dan penuh cacat visual.",
        postmodern: "Gaya desain yang menggabungkan unsur-unsur klasik dan modern, sering dengan sedikit humor atau kritik sosial.",
        mecha_design: "Desain robot atau mesin besar yang sering digunakan dalam fiksi ilmiah, dengan fokus pada teknologi dan mekanik.",
        dreamscape: "Lanskap mimpi yang penuh dengan elemen aneh, imajinatif, dan tidak realistis.",
        retro_futurism: "Gaya yang mencampur pandangan futuristik dengan elemen dan estetika dari masa lalu, sering kali dari abad ke-20.",
        dark_surrealism: "Gaya surreal yang gelap, menggabungkan elemen mimpi dengan suasana yang misterius dan seringkali menakutkan.",
        ancient_mysticism: "Desain yang terinspirasi oleh tradisi mistik kuno, dengan simbol-simbol rahasia dan pemandangan yang misterius.",
        baroque_neo: "Kombinasi antara gaya Baroque yang megah dan estetika modern, dengan ornamen dan detil yang sangat rumit.",
        neon_sculpture: "Seni patung dengan elemen neon yang menyala, memberikan kesan futuristik dan berwarna-warni.",
        digital_fantasy: "Dunia fantasi yang diciptakan menggunakan teknik digital, dengan makhluk ajaib dan pemandangan imajinatif.",
        cosmic_dystopia: "Dunia distopia di luar angkasa, dengan lanskap asing dan peradaban yang hancur.",
        hyper_color: "Penggunaan warna yang sangat cerah dan kontras tinggi untuk menciptakan visual yang mencolok dan dinamis.",
        organic_minimalism: "Desain yang menggabungkan bentuk organik alami dengan prinsip minimalis, menekankan kesederhanaan dan elegansi.",
        tribal_futurism: "Gabungan antara seni tribal dan teknologi futuristik, menciptakan desain yang sangat unik dan berbudaya.",
        sci_fi_art_deco: "Gaya art deco dengan sentuhan futuristik, menggunakan bentuk geometris dan desain mewah.",
        mystical_wilderness: "Alam liar yang penuh dengan elemen mistis, seperti hutan yang bercahaya atau fauna yang aneh dan magis.",
        cyberpunk_noir: "Dunia cyberpunk dengan nuansa noir, gelap dan penuh dengan kontras dan misteri.",
        space_fantasy: "Dunia fantasi di luar angkasa, dengan makhluk asing dan petualangan epik.",
        arcane_tech: "Teknologi yang digabungkan dengan unsur magis, seperti mesin yang diisi dengan kekuatan mistik.",
        digital_illusion: "Penggunaan efek digital untuk menciptakan ilusi visual yang membingungkan dan memukau.",
        stealth_tech: "Desain teknologi yang dirancang untuk tidak terlihat, dengan bentuk tersembunyi dan pencahayaan redup.",
        psychedelic_fantasy: "Dunia fantasi dengan elemen psychedelic, penuh dengan warna-warna neon, pola surreal, dan imajinasi liar.",
        techno_vintage: "Gabungan antara teknologi futuristik dengan elemen vintage, menciptakan dunia yang terlihat klasik namun maju.",
        ancient_tech: "Teknologi kuno yang sangat maju, dengan mesin dan artefak yang terbuat dari bahan alami namun memiliki kekuatan luar biasa."
    };

    if (!text) throw `Perintah ini menghasilkan gambar berdasarkan teks yang diberikan\n\n*Contoh penggunaan:*\n*${usedPrefix + command} <prompt/text> | <style> | <resolution>*\n*⚠️ Gunakan | Sebagai Pemisah*\n*Abaikan Tanda <>*\n\n*List Resolution:*\n- Square\n- Wide\n- Portrait\n\n*List Style:*\n${Object.entries(styles).map(([key, value]) => `- *${key}*: ${value}`).join('\n')}`
    
    const args = text.split('|');
    const prompt = args[0].trim();
    const model = args[1] ? args[1].trim() : 'anime';
    const resolution = args[2] ? args[2].trim() : 'Wide';

    if (!prompt) throw `Perintah ini menghasilkan gambar berdasarkan teks yang diberikan\n\n*Contoh penggunaan:*\n*${usedPrefix + command} <prompt/text> | <style> | <resolution>*\n*⚠️ Gunakan | Sebagai Pemisah*\n*Abaikan Tanda <>*\n\n*List Resolution:*\n- Square\n- Wide\n- Portrait\n\n*List Style:*\n${Object.entries(styles).map(([key, value]) => `- *${key}*: ${value}`).join('\n')}`;
    
    await m.react('🕒');

    try {
        const res = await fetch(`https://api.maelyn.tech/api/maelyn/imagine?prompt=${encodeURIComponent(prompt)}&style=${encodeURIComponent(model)}&resolution=${encodeURIComponent(resolution)}&apikey=galih`);
        
        // Pastikan untuk memeriksa apakah respons dari API berhasil
        if (!res.ok) throw new Error('Gagal mendapatkan gambar dari API');

        const data = await res.json();
        conn.sendMessage(m.chat, {
            image: { url: data.result.url },
            caption: `*Sukses! Gambar telah dihasilkan dengan:*\n\n- *Prompt*: ${data.result.prompt}\n- *Style*: ${data.result.style}\n- *Deskripsi Style*: ${styles[data.result.style] || 'Deskripsi tidak tersedia.'}`
        }, { quoted: m });
        m.react('✅');
    } catch (e) {
        console.error(e);
        conn.reply(m.chat, "Terjadi kesalahan saat mengambil gambar: " + e.message, m);
    }
}

Tio.help = ['createimage', 'buatgambar'];
Tio.tags = ['ai'];
Tio.register = Tio.limit = true;
Tio.command = /^(createimage|buatgambar|cimg)$/i;

export default Tio;