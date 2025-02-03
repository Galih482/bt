import axios from 'axios'
import fs from 'fs'
import os from 'os'
import { exec } from 'child_process'

let Tio = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `Usage: ${usedPrefix}${command} <YouTube Video URL> <resolution>`;
  await m.react('🔍')

  const args = text.split(' ');
  const videoUrl = args[0];
  const resolution = args[1] || '480p';

  const apiUrl = `https://api.ryzendesu.vip/api/downloader/ytmp4?url=${encodeURIComponent(videoUrl)}&quality=${resolution}`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (!data.url) throw 'Download URL not found in API response.';

    const { title, author, authorUrl, lengthSeconds, views, uploadDate, description, videoUrl, thumbnail, filename } = data;

    const tmpDir = os.tmpdir();
    const filePath = `${tmpDir}/${filename}`;

    const writer = fs.createWriteStream(filePath);
    const downloadResponse = await axios({
      url: data.url,
      method: 'GET',
      responseType: 'stream',
    });

    downloadResponse.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    // Fix the video duration using ffmpeg
    const outputFilePath = `${tmpDir}/fixed_${filename}`;
    await new Promise((resolve, reject) => {
      exec(`ffmpeg -i "${filePath}" -c copy "${outputFilePath}"`, (error) => {
        if (error) reject(error);
        else resolve();
      });
    });

    const caption = `> Succes kak videonya @${m.sender.split('@')[0]}

*Title*: ${title}
*Author*: ${author} (${authorUrl})
*Duration*: ${lengthSeconds}
*Views*: ${views}
*Uploaded*: ${uploadDate}
*URL*: ${videoUrl}

*Description*: ${description}`;

    await conn.sendMessage(m.chat, {
      video: { url: outputFilePath },
      mimetype: 'video/mp4',
      fileName: filename,
      caption,
      mentions: [m.sender],
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          mediaType: 2,
          mediaUrl: videoUrl,
          title: title,
          body: 'Video Download',
          sourceUrl: videoUrl,
          thumbnail: await (await conn.getFile(thumbnail)).data,
        },
      },
    }, { quoted: m });
    m.react('✅')

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Failed to delete original video file: ${err}`);
      } else {
        console.log(`Deleted original video file: ${filePath}`);
      }
    });

    fs.unlink(outputFilePath, (err) => {
      if (err) {
        console.error(`Failed to delete fixed video file: ${err}`);
      } else {
        console.log(`Deleted fixed video file: ${outputFilePath}`);
      }
    });

  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw `Failed to process request: ${error.message || error}`;
  }
};

Tio.help = ['ytmp4'];
Tio.tags = ['downloader'];
Tio.command = /^(y(ou)?t(ube)?(v|mp4)?(ideo)?)$/i;
Tio.limit = true;

export default Tio;