/* *PLUGIN* Brat Video
 * By *XyrooRynzz*
 * Aing ubah dikit + rapihin
 */

import {
    Sticker
} from 'wa-sticker-formatter';
import fs from 'fs'
import path from 'path'
import axios from 'axios'
import { sticker } from '../../lib/sticker.js'
import { execSync } from 'child_process'

let Tio = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
  if (!text) return m.reply(`Contoh: ${usedPrefix}Halo Kak`)
  if (text.length > 250) return m.reply(`Karakter terbatas, max 250!`)
  await m.react('🕒')
  
  const words = text.split(" ")
  const tempDir = path.resolve('lib')
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir)
  const framePaths = []

  try {
    for (let i = 0; i < words.length; i++) {
      const currentText = words.slice(0, i + 1).join(" ")

const frameResponse = await axios.get(
                    `https://brat.caliphdev.com/api/brat?text=${encodeURIComponent(currentText)}`, {
                        responseType: 'arraybuffer'
                    }
                );

                const framePath = path.join(tempDir, `frame${i}.mp4`);
                fs.writeFileSync(framePath, frameResponse.data);
                framePaths.push(framePath);
            }

            const fileListPath = path.join(tempDir, 'filelist.txt');
            let fileListContent = '';

            for (let i = 0; i < framePaths.length; i++) {
                fileListContent += `file '${framePaths[i]}'\n`;
                fileListContent += `duration 1\n`;
            }

            fileListContent += `file '${framePaths[framePaths.length - 1]}'\n`;
            fileListContent += `duration 3\n`;

            fs.writeFileSync(fileListPath, fileListContent);

            const outputVideoPath = path.join(tempDir, 'output.mp4');
            // Use ffmpeg to create the animation
            execSync(`ffmpeg -y -f concat -safe 0 -i ${fileListPath} -vf "fps=5" -c:v libx264 -preset veryfast -pix_fmt yuv420p -t 10 ${outputVideoPath}`);

            const outputStickerPath = path.join(tempDir, 'output.webp');
            execSync(`ffmpeg -i ${outputVideoPath} -vf "scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease" -c:v libwebp -lossless 1 -qscale 90 -preset default -loop 0 -an -vsync 0 -s 512x512 ${outputStickerPath}`);

            const stickerBuffer = fs.readFileSync(outputStickerPath);
            await conn.sendMessage(m.chat, {
                sticker: stickerBuffer,
            });

            framePaths.forEach((filePath) => fs.unlinkSync(filePath));
            fs.unlinkSync(fileListPath);
            fs.unlinkSync(outputVideoPath);
            fs.unlinkSync(outputStickerPath);
  } catch (e) {
    console.error(e)
    m.reply('Terjadi kesalahan')
  }
}

Tio.command = /^(bratvid|bratvideo|bratgif)$/i
Tio.help = ['bratvideo <teks>']
Tio.tags = ['sticker']
Tio.limit = true

export default Tio