/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

let Tio = async (m, { text, command, conn }) => {
    if (!text) throw 'Harap masukkan query untuk mencari gambar.';

    try {
        await m.reply(msg.wait);

        let result = await Func.fetchJson(API(APIs["Tixo"], "/internet/pinterest", { query: text }));

        const results = result.splice(0, 10).map(({ id, created_at, images_url, grid_title }) => ({
            header: "Hasil Pencarian Pinterest",
            text: `*ID*: ${id}\n*Title*: ${grid_title || 'Tidak ada judul'}\n*Created*: ${created_at}`,
            footer: info.wm,
            url: images_url,
            web: [{ text: "Buka URL", url: images_url }]
        }));

        await conn.sendButtonSlide(m.chat, results, m, {
            text: "Berikut adalah hasil pencarian gambar dari Pinterest.",
            footer: info.wm
        });

    } catch (e) {
        console.error(e);
        m.reply(msg.error || "Terjadi kesalahan saat memproses permintaan.");
    }
};

Tio.help = ['pinterest'];
Tio.tags = ['internet'];
Tio.command = /^(pin(terest)?)$/i;

export default Tio;