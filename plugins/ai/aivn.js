/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import axios from "axios";
import * as cheerio from "cheerio";
import qs from "qs";
import kode from 'kode-scrape';
const { ai } = kode;

let Tio = async (m, {
    text,
    command,
    conn
}) => {
    conn.aivn = conn.aivn ? conn.aivn : {};
    let id = m.sender;

    if (!text) return m.reply("on/off");
    if (text === "on") {
        conn.aivn[id] = {};
        await m.reply("Ai VN aktif");
    } else if (text === "off") {
        delete conn.aivn[id];
        await m.reply("Ai VN nonaktif");
    }
}

Tio.help = Tio.command = ["aivn"];
Tio.tags = ["tools"];

Tio.before = async (m, {
    conn
}) => {
    conn.aivn = conn.aivn ? conn.aivn : {};
    let id = m.sender;
    if (!(id in conn.aivn)) return;
    
    if (m.quoted && m.quoted.fromMe && m.mtype.includes("audio")) {
        await m.react('🔖');
        let media = await m.download();
        let audio = await gptAudio(media);
        let result = await getAudio('indonesian', audio, 'fr-FR-VivienneMultilingualNeural');

        await conn.sendMessage(m.chat, {
            audio: result,
            mimetype: "audio/mpeg",
            ptt: true
        }, {
            quoted: m
        });
    } else if (m.quoted && m.quoted.fromMe && m.mtype === "extendedTextMessage") {
        m.react('🔖');
        let { gpt } = await ai.Gpt4(m.text);
        await m.reply(gpt);
    }
}

export default Tio;

async function gptAudio(audioBuffer) {
    try {
        const info = await getInfo();
        const data = new FormData();
        const blob = new Blob([audioBuffer.toArrayBuffer()], {
            type: 'audio/mpeg'
        });
        data.append('_wpnonce', info[0]['data-nonce']);
        data.append('post_id', info[0]['data-post-id']);
        data.append('action', 'wpaicg_chatbox_message');
        data.append('audio', blob, 'wpaicg-chat-recording.wav');

        const response = await axios.post('https://chatgptt.me/wp-admin/admin-ajax.php', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        let results = [response.data][0].split('[DONE]')[1]
        let hasil = results.replace('\n\n', '')
        return hasil.split(`"data":"`)[1].split(`","`)[0]
    } catch (error) {
        console.error('An error occurred:', error.message);
        throw error;
    }
}

async function getInfo() {
    const url = 'https://chatgptt.me';

    try {
        const { data: html } = await axios.get(url);
        const $ = cheerio.load(html);

        const chatData = $('.wpaicg-chat-shortcode').map((index, element) => {
            return Object.fromEntries(Object.entries(element.attribs));
        }).get();

        return chatData;
    } catch (error) {
        throw new Error('Error:', error.message);
    }
}

async function getAudio(lang, text, voiceId) {
    const url = 'https://wavel.ai/wp-json/myplugin/v1/tts';
    const data = {
        lang: lang,
        text: text,
        voiceId: voiceId
    };
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': '*/*',
        'X-Requested-With': 'XMLHttpRequest'
    };

    try {
        let response = await axios.post(url, qs.stringify(data), {
            headers: headers
        });
        let { base64Audio } = response.data;
        let result = Buffer.from(('data:audio/mpeg;base64,' + base64Audio).split(',')[1], 'base64');

        return result;
    } catch (error) {
        console.error("Error fetching audio:", error);
        throw error;
    }
}