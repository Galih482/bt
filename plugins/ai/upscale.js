/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import axios from "axios";

const Tio = async (m, { conn, args }) => {
    const scale = parseInt(args[0]) || 8; // Skala default
    const enhance = args[1] === "true";  // Default false jika tidak diatur

    if (![2, 4, 6, 8, 16].includes(scale)) {
        return m.reply(`Upscale harus 2, 4, 6, 8, atau 16.`);
    }

    if (args[1] && args[1] !== "true" && args[1] !== "false") {
        return m.reply(`Gunakan "true" untuk kartun atau "false" untuk real.`);
    }

    const q = m.quoted || m;
    const mime = (q.msg || q).mimetype || q.mediaType || "";
    if (!/image\/(jpe?g|png)/.test(mime)) {
        return m.reply(`Harap lampirkan atau balas foto dengan format JPEG/PNG.`);
    }

    await m.reply(global.msg.wait);

    let img = await q.download();
    let base64 = img.toString("base64")
    try {
        const response = await axios.post(
            `${global.APIs["Tixo"]}/ai/upscale`,
            { base64, scale, anime: enhance },
            { responseType: "arraybuffer" }
        );
        await conn.sendFile(m.chat, response.data, "upscaled.jpg", "Gambar berhasil ditingkatkan.", m);
    } catch {
        return m.reply(global.msg.eror);
    }
};

Tio.help = ["upscale"];
Tio.tags = ["ai"];
Tio.command = /^upscale$/i;
Tio.register = true;
Tio.premium = true;

export default Tio;