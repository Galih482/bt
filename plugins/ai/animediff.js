let Tio = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Perintah ini menghasilkan gambar Anime berdasarkan teks yang diberikan\n\nContoh penggunaan:\n${usedPrefix + command} anime character with a plate of food in a restaurant, anime girl in a maid costume, gorgeous maid, anime moe artstyle, anime cat girl in a maid costume, loli in dress, loli, white haired deity, maid outfit, white haired, maid, small curvy loli, cute anime waifu in a nice dress, gray haired, white-haired`;
    await m.react('🕒');

    try {
         await conn.sendFile(m.chat, `https://ai.xterm.codes/api/text2img/animediff?prompt=${encodeURIComponent(text)}&negativePrompt=negativePrompt&key=AIzaaIQ1kEueoBkB2ZCM`, 'image.jpg', '`'+command+' Sukses`\n\nprompt: '+text, m);
          m.react('✅')
  } catch (e) {
        console.error(e);
        conn.reply(m.chat, "Terjadi kesalahan saat mengambil gambar: " + e.message, m);
    }
}

Tio.help = ['animediff'];
Tio.tags = ['ai'];
Tio.command = /^(aidif|animdiff|animediff|aidiff)$/i;

export default Tio;