/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import axios from 'axios';

let Tio = async (m, { conn, text }) => {
    conn.terabox = conn.terabox || {};
    if (!text) return m.reply("Silakan masukkan URL Terabox.");
    try {
        const { uk, shareid, timestamp, sign, list } = await Terabox.get_link(text);
        if (!list || !list[0]?.children) {
            return m.reply("Tidak ada file yang tersedia.");
        }

        conn.terabox[m.sender] = { uk, shareid, timestamp, sign, list: list[0].children };

        let message = "Pilih nomor file di bawah ini:\n\n";
        list[0].children.forEach((file, index) => {
            const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
            message += `${index + 1}. ${file.filename}\n   Ukuran: ${sizeInMB} MB\n\n`;
        });

        await m.reply(message);
    } catch (err) {
        console.error(err);
        throw "Terjadi kesalahan saat mengambil data. Pastikan URL valid dan coba lagi.";
    }
};

Tio.before = async (m) => {
    conn.terabox = conn.terabox || {};
    if (!(m.sender in conn.terabox)) return;

    try {
        const { uk, shareid, timestamp, sign, list } = conn.terabox[m.sender];

        if (!list || isNaN(m.text - 1) || m.text - 1 < 0 || m.text - 1 >= list.length) {
            return m.reply('Nomor yang kamu pilih salah.');
        }
        await m.reply(msg.wait);
        const url = list[m.text - 1];
        const datas = {
            id: url.fs_id,
            uk: uk,
            shareid: shareid,
            timestamp: timestamp,
            sign: sign,
            size: url.size,
            filename: url.filename
        };

        const { title, link } = await Terabox.get_file(datas);
        const video = await conn.sendFile(m.chat, link, '', title, m);
        setTimeout(() => {
        conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: true, id: video.id, participant: m.sender } })
        }, 60 * 1000);
    } finally {
        delete conn.terabox[m.sender];
    }
};

Tio.help = ['terabox'];
Tio.tags = ['tools'];
Tio.command = ['terabox'];
export default Tio;

const Terabox = {
    fetchJson: async (url, options = {}) => {
        try {
            const res = await axios({
                method: 'GET',
                url: url,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
                    ...options.headers
                },
                ...options
            });
            return res.data;
        } catch (err) {
            throw new Error(`fetchJson error: ${err.message}`);
        }
    },

    get_link: async function (url) {
    const regex = /https?:\/\/terabox\.com\/s\/([a-zA-Z0-9_-]+)/;

    const match = url.match(regex); 
    let id = ''
    if (match) {
         id = match[1];
    }
    
        const fileUrl = `https://terabox.hnn.workers.dev/api/get-info?shorturl=${id}&pwd=`;
        try {
            const fileResponse = await this.fetchJson(fileUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
                    'Referer': 'https://terabox.hnn.workers.dev/'
                }
            });

            if (!fileResponse || !fileResponse.list || !Array.isArray(fileResponse.list)) {
                throw new Error("Invalid response from Terabox API.");
            }

            return fileResponse;
        } catch (err) {
            console.error(err);
            throw new Error(`get_link error: ${err.message}`);
        }
    },

    get_file: async function ({ id, uk, shareid, timestamp, sign, size, filename }) {
        const linkUrl = "https://terabox.hnn.workers.dev/api/get-download";

        try {
            const linkRequestData = {
                shareid,
                uk,
                sign,
                timestamp,
                fs_id: id
            };

            const response = await axios.post(linkUrl, linkRequestData, {
                headers: {
                    "Content-Type": "application/json",
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
                    'Referer': 'https://terabox.hnn.workers.dev/'
                }
            });

            if (response.data?.ok && response.data.downloadLink) {
                return {
                    title: filename,
                    size: size,
                    link: response.data.downloadLink
                };
            } else {
                return {
                    title: filename,
                    link: "Error: Gagal mendapatkan link unduhan"
                };
            }
        } catch (error) {
            return {
                title: filename,
                link: `Error: ${error.message}`
            };
        }
    }
};