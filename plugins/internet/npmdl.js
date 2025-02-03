/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import { exec } from 'child_process';
import fs from 'fs';

let Tio = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`*Contoh* : ${usedPrefix + command} yt-search,versi(opsional)`);

  const npmdownloader = async (pkg, pkgver) => {
    try {
      const filePath = await new Promise((resolve, reject) => {
        exec(`npm pack ${pkg}@${pkgver}`, (error, stdout) => {
          if (error) {
            m.reply('Error atau Package tidak ditemukan');
            console.error(`exec error: ${error}`);
            return reject(error);
          }
          resolve(stdout.trim());
        });
      });

      const fileName = filePath.split('/').pop();
      const data = await fs.promises.readFile(filePath);
      const Link = pkgver === 'latest' 
        ? `https://www.npmjs.com/package/${pkg}` 
        : `https://www.npmjs.com/package/${pkg}/v/${pkgver}`;

      await conn.sendMessage(m.chat, {
        document: data,
        mimetype: "application/zip",
        fileName: fileName,
        caption: `- \`Nama\`: ${fileName}\n- \`Versi\`: ${pkgver}\n- \`Link\`: ${Link}`
      }, { quoted: m });

      await fs.promises.unlink(filePath);
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  };

  conn.sendMessage(m.chat, {
    react: {
      text: "⏱",
      key: m.key,
    }
  });

  try {
    const [text2, ver] = text.split(",");
    await npmdownloader(text2.trim(), ver?.trim() || 'latest');
  } catch (error) {
    m.reply('Sepertinya terjadi kesalahan atau package tidak ditemukan');
  }
};

Tio.help = ["npmdownloader"];
Tio.tags = ["tools"];
Tio.command = /^(ceknpm|npmd(own)?l(oad)?)$/i;

export default Tio;