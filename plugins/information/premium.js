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
    const packages = produk['premium'].map(v => ({
        type: v.type,
        price: v.price,
        urlTag: v.urlTag,
        bonus: v.bonus
    }));

    let button = packages.map(pkg => ({
        header: `*PREMIUM ${pkg.type}*`,
        text: `- Harga: ${pkg.price}\n- Deskripsi: Nikmati pengalaman premium bersama bot kami. Dapatkan akses cepat, fitur eksklusif, dan dukungan penuh 24 jam.${pkg.bonus ? `\n\n${pkg.bonus}` : ''}`,
        footer: 'Klik dibawah untuk beli premium.',
        url: 'https://files.catbox.moe/469fvm.webp',
        web: [{
            text: 'Owner',
            url: `https://wa.me/6282137800396?bang+beli+premium+${pkg.urlTag}`
        }]
    }));

    await conn.sendButtonSlide(m.chat, button, m, {
        footer: 'Hubungi Owner untuk info lebih lanjut',
        text: 'Owner Galihz'
    });
}

Tio.help = ['premium'];
Tio.tags = ['main'];
Tio.command = /^(prem(ium)?)$/i;

export default Tio;