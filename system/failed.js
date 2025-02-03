import fs from "fs";
const jsonMessage = JSON.parse(fs.readFileSync("./system/json/message.json", "utf-8"));

export async function failed(type, m, conn) {

let msg = jsonMessage.message[type]
        
  if (msg) return conn.sendMessage(m.chat, {
      text: `${msg}`,
      contextInfo: {
      externalAdReply: {
      title: '☠ N O T  A C C E S S',
      body: '',
      thumbnail: await fs.readFileSync(global.media.sistem["akses"]),
      sourceUrl: global.url.sgc,
      mediaType: 1,
      renderLargerThumbnail: true
      }}}, { quoted: m})
        
    let daftar = {
  unreg: `🐱 ⌑Terdeteksi Kamu Belum Terdaftar di Database. Ketik Perintah Dibawah Untuk Mendaftar atau Juga Bisa Dengan Cara Klik Tombol Di Bawah.⌑

➠ /daftar`}[type]
  
  if (daftar) return conn.sendMessage(m.chat, {
      text: `${daftar}`,
      contextInfo: {
      externalAdReply: {
      title: '☠ N O T  A C C E S S',
      body: 'registrasi sekarang',
      thumbnail: await fs.readFileSync(global.media.sistem["register"]),
      sourceUrl: global.url.sgc,
      mediaType: 1,
      renderLargerThumbnail: true
      }}}, { quoted: m})
        }