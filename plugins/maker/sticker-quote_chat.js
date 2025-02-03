/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import { sticker } from '../../lib/sticker.js';
import axios from 'axios';
import { webp2png } from '../../lib/webp2mp4.js';
import fetch from 'node-fetch';
import { uploadFile } from '../../lib/uploader.js';

let Tio = async (m, { conn, text, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  const { mtype } = m;
  
if (!text) {
  return m.reply(`Teksnya Mana. Gunakan format: .qc [teks kutipan] -- [warna]\n\nWarna yang tersedia:\n- merah\n- hijau\n- biru\n- kuning\n- putih\n- hitam\n- orange\n- pink\n- biru_muda\n- ungu\n- coklat\n- abu_abu\n- coklat_muda`);
};
  if (text.length > 30) return m.reply('Maksimal 30 Teks!');
  
  let args = text.split('--');
  let quoteText = args[0].trim();
  let bgColor = args[1] ? args[1].trim().toLowerCase() : '#ffffff';
  let typ = text.split('#')[1];
  let select = {
  "qc": "quote",
  "img": "image"
  }, types = select[typ] || select["qc"];
  quoteText = quoteText?.split('#')[0];
  
  // Validate color input
  const colors = {
  "merah": "#FF0000",
    "hijau": "#008000",
    "biru": "#0000FF",
    "kuning": "#FFFF00",
    "putih": "#FFFFFF",
    "hitam": "#000000",
    "orange": "#FFA500",
    "pink": "#FFC0CB",
    "biru_muda": "#ADD8E6",
    "ungu": "#800080",
    "coklat": "#964B00",
    "abu_abu": "#808080",
    "coklat_muda": "#F5DEB3",
    'default': '#ffffff'
  }, scale = 3
  bgColor = colors[bgColor] || colors['default'];

  let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => media.avatar);

  if (m.quoted) {
    if (q.mtype == 'extendedTextMessage') {
      conn.sendMessage(m.chat, {
        react: {
          text: "🕛",
          key: m.key,
        },
      });
      let objj = {
        "type": types,
        "format": "png",
        "backgroundColor": bgColor,
        "width": 512,
        "height": 768,
        scale,
        "messages": [{
          "entities": [],
          "avatar": true,
          "from": {
            "id": 2,
            "name": m.name,
            "photo": { "url": pp }
          },
          "text": quoteText,
          "replyMessage": {
            "name": await conn.getName(m.quoted.sender),
            "text": m.quoted.text || '',
            "chatId": m.chat.split('@')[0],
          }
        }]
      };

      const bufferr = await Quotly(objj);

      let stikerr = await sticker(bufferr, false, info.packname, info.author);
      if (stikerr) return conn.sendFile(m.chat, stikerr, 'Quotly.webp', '', m);
      conn.sendMessage(m.chat, {
        react: {
          text: "✅",
          key: m.key,
        },
      });
    } else if (q.mtype == 'stickerMessage' || q.mtype == 'imageMessage') {
      let img = await q.download();

      conn.sendMessage(m.chat, {
        react: {
          text: "🕛",
          key: m.key,
        },
      });
      let up;
      if (/webp/g.test(mime)) {
        up = await webp2png(img);
      } else if (/image/g.test(mime)) {
        up = await uploadFile(img);
      } else ''

      let obj = {
        "type": types,
        "format": "png",
        "backgroundColor": bgColor,
        "width": 512,
        "height": 768,
        scale,
        "messages": [{
          "entities": [],
          "media": { "url": up },
          "avatar": true,
          "from": {
            "id": 2,
            "name": m.name,
            "photo": { "url": pp }
          },
          "text": quoteText,
          "replyMessage": {}
        }]
      };

      const buffer = await Quotly(obj);

      let stiker = await sticker(buffer, false, info.packname, info.author);
      if (stiker) return conn.sendFile(m.chat, stiker, 'Quotly.webp', '', m);
      conn.sendMessage(m.chat, {
        react: {
          text: "✅",
          key: m.key,
        },
      });
    }
  } else {
    conn.sendMessage(m.chat, {
      react: {
        text: "🕛",
        key: m.key,
      },
    });
    let obj2 = {
      "type": types,
      "format": "png",
      "backgroundColor": bgColor,
      "width": 512,
      "height": 768,
      scale,
      "messages": [{
        "entities": [],
        "avatar": true,
        "from": {
          "id": 2,
          "name": m.name,
          "photo": { "url": pp }
        },
        "text": quoteText,
        "replyMessage": {}
      }]
    };

    const buffer = await Quotly(obj2);

    let Sstiker = await sticker(buffer, false, info.packname, info.author);
    if (Sstiker) return conn.sendFile(m.chat, Sstiker, 'Quotly.webp', '', m);
    conn.sendMessage(m.chat, {
      react: {
        text: "✅",
        key: m.key,
      },
    });
  }
};

Tio.help = ['qc'];
Tio.tags = ['sticker'];
Tio.command = /^(qc|quoted|quotly)$/i;
Tio.limit = true;

export default Tio;

async function Quotly(obj) {
  let json;

  try {
    json = await axios.post(
      "https://qc.tioxy.xyz/generate",
      obj,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (e) {
    return e;
  }

  const results = json.data.result.image;
  const buffer = Buffer.from(results, "base64");
  return buffer;
}