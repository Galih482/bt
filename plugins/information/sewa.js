/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import fs from 'fs';

let Tio = async (m, {
    conn
}) => {

    const produk = JSON.parse(await fs.readFileSync('./system/json/product.json', 'utf-8'));
    const packages = produk['sewa'].map(v => ({
        type: v.type,
        price: v.price,
        urlTag: v.urlTag,
        bonus: v.bonus
    }));

    let button = packages.map(pkg => ({
        header: `*SEWA ${pkg.type}*`,
        text: `- Harga: ${pkg.price}\n- Deskripsi: Nikmati pengalaman sewa dengan bot kami. Dapatkan akses cepat, fitur eksklusif, dan dukungan penuh 24 jam.`,
        footer: `Bonus: ${pkg.bonus || 'Tidak ada bonus'}\nKlik di bawah untuk sewa.`,
        url: 'https://files.catbox.moe/zzjpi5.webp',
        web: [{
            text: 'Owner',
            url: `https://wa.me/6282137800396?bang+beli+sewa+${pkg.urlTag}`
        }]
    }));

    await conn.sendButtonSlide(m.chat, button, m, {
        footer: 'Hubungi Owner untuk info lebih lanjut',
        text: 'Owner Galihz'
    });
}

Tio.help = ['sewa'];
Tio.tags = ['main'];
Tio.command = /^(sewa)$/i;

export default Tio;