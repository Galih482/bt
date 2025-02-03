/* PLUGINS CREATE PASTEBIN */

import axios from "axios"
//const axios = require("axios")
let Tio = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw(`Contoh:\n${usedPrefix}${command} Galih|Isimu`);
async function createPaste(title, content) {
 const data = new URLSearchParams({
 api_dev_key: "DykfEplhVPUNQkJa7GZ8gAXsakNBB3XT", // get in https://pastebin.com/doc_ap and dont forget for login
 api_paste_name: title,
 api_paste_code: content,
 api_paste_format: "text",
 api_paste_expire_date: "N",
 api_option: "paste"
 });
 
 try {
 const response = await axios.post("https://pastebin.com/api/api_post.php", data, {
 headers: {
 "Content-Type": "application/x-www-form-urlencoded"
 }
 });
 
 const result = response.data;
 const rawUrl = result.replace(/^(https:\/\/pastebin\.com\/)([a-zA-Z0-9]+)$/, "$1raw/$2");
 if (result) {
 return {
 status: 0,
 original: result,
 raw: rawUrl
 };
 } else {
 return {
 status: 1,
 original: null,
 raw: null
 };
 }
 } catch (error) {
 console.error("Error:", error);
 }
 }
 const [title, context] = text.trim().split('|');
 if (!title && !context) {
 return m.reply(`🚩 Format salah! Gunakan: ${usedPrefix + command} judul | context`);
 }
 let results = await createPaste(title, context)
 let hasilUrl = `*- Result:* ${results.original}\n*- Raw version:* ${results.raw}`
 m.reply(hasilUrl);
}
Tio.help = ['cpastebin']
Tio.tags = ['tools']
Tio.command = /^(createpastebin|cpastebin|pastebin)$/i
Tio.limit = true
export default Tio
//module.exports = Tio