/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import axios from 'axios';
import * as cheerio from 'cheerio';

let Tio = async (m, {
    conn,
    args,
    usedPrefix,
    command,
    text
}) => {
    try {
        if (text) {
            let res = await gptChat(text);
            await m.reply(res);
        } else if (m.quoted.text) {
            let res = await gptChat(m.quoted.text);
            await m.reply(res);
        } else if (m.quoted.mimetype.includes("audio")) {
            let audioBuff = await m.quoted.download();
            let res = await gptAudio(audioBuff);
            await m.reply(res);
        } else return m.reply("Reply Teks/Audio untuk menggunakan gpt ini");
    } catch (e) {
        throw e;
    }
};

Tio.help = ["chatgptt"];
Tio.tags = ["ai"];
Tio.command = /^(chatgptt)$/i;

export default Tio;

async function gptAudio(audioBuffer) {
    try {
        const info = await getInfo();
        const formData = new FormData();
        const blob = new Blob([audioBuffer.toArrayBuffer()], {
            type: 'audio/mpeg'
        });
        formData.append('_wpnonce', info[0]['data-nonce']);
        formData.append('post_id', info[0]['data-post-id']);
        formData.append('action', 'wpaicg_chatbox_message');
        formData.append('audio', blob, 'wpaicg-chat-recording.wav');

        const response = await axios.post('https://chatgptt.me/wp-admin/admin-ajax.php', formData);

        let results = [response.data][0].split('[DONE]')[1]
        let hasil = results.replace('\n\n', '')
        return hasil.split(`"data":"`)[1].split(`","`)[0]
    } catch (error) {
        console.error('An error occurred:', error.message);
        throw error;
    }
}

async function gptChat(message) {
    try {
        const info = await getInfo();
        const formData = new FormData();
        formData.append('_wpnonce', info[0]['data-nonce']);
        formData.append('post_id', info[0]['data-post-id']);
        formData.append('action', 'wpaicg_chatbox_message');
        formData.append('message', message);

        const response = await axios.post('https://chatgptt.me/wp-admin/admin-ajax.php', formData);

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