/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import fetch from "node-fetch";

let Tio = async (m, {
    conn,
    text
}) => {
    if (!text) throw "masukan prompt/deskripsi video"

    try {
        m.reply(`\`Waktu yang dibutuhkan mungkin lama hingga music dapat di kirim\``)
        let video = new Vidnoz()
        
        let id = await video.textToVideo(text, "Relaxing", 0, 2, 206);
        let data  = await video.getTask(id);
await conn.delay(5000);
        if (data) {
        await conn.sendMessage(m.chat, {
            video: {
                url: data.additional_data.video_url
            },
            caption: `\`${text}\`\n\n⏳: ${data.additional_data.duration} *Second*`,
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    title: data.action,
                    body: data.additional_data.video_url,
                    mediaType: 1,
                    thumbnail: await (await conn.getFile(data.additional_data.thumbnail_url)).data,
                    sourceUrl: data.additional_data.video_url
                }
            }
        }, {
            quoted: m
        })
        }
    } catch (e) {
        throw e
    }

}
Tio.help = Tio.command = ["txt2video"]
Tio.tags = ["ai"]
Tio.premium = true

export default Tio

/**
creator tio
**/

const ip = () => {
    const octet = () => Math.floor(Math.random() * 256);
    return `${octet()}.${octet()}.${octet()}.${octet()}`;
};

class Vidnoz {
    constructor(authToken) {
        this.authToken = authToken || null;
        this.apiBaseUrl = 'https://tool-api.vidnoz.com/ai/tool';
    }

    async getHeaders() {
        return {
            'Content-Type': 'application/json',
            'X-TASK-VERSION': '2.0.0',
            'Authorization': `Bearer ${this.authToken}`,
            'x-forwarded-for': await ip()
        };
    }

    async postData(url = '', data = {}) {
        const headers = await this.getHeaders();
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });
        return response.json();
    }

    async textToVideo(text, makeBackgroundMusic = "Relaxing", subtitles, voiceOverGender, voiceOverVoice) {
        try {
            const data = {
                text: text,
                make_background_music: makeBackgroundMusic,
                subtitles: subtitles,
                voiceOver_gender: voiceOverGender,
                voiceOver_voice: voiceOverVoice,
                language: "EN"
            };
            const response = await this.postData(`${this.apiBaseUrl}/text-to-video`, data);
            return response.data.task_id;
        } catch (e) {
            return { msg: e };
        }
    }

    async getTask(taskId) {
        try {
            const data = { id: taskId };
            let res;
            do {
                let response = await this.postData(`${this.apiBaseUrl}/get-task`, data);
                res = response.data;
            } while (res.status === -2);
            return res;
        } catch (e) {
            return { msg: e };
        }
    }
}