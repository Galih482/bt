/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

let Tio = async (m, {
    conn,
    text,
    args,
    command,
    usedPrefix
}) => {

    let q = m.quoted ? m.quoted : m
    if (!q) return m.reply('Media not found')
    let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''

    if (!/audio/.test(mime)) return m.reply(`Reply audio dengan perintah ${usedPrefix + command}`);
    let media = await q.download?.()
    let name = './tmp/' + new Date() + '.mp3';
    try {
        await m.reply(msg.wait);

        await fs.writeFileSync(name, media);
        let result = await transcribe(name);
        await conn.sendMessage(m.chat, {
            text: result.text
        }, {
            quoted: m
        })
    } catch (err) {
        m.reply(msg.error);
    } finally {
        await fs.unlinkSync(name);
    }
}

Tio.help = ['audiototext']
Tio.tags = ['ai']
Tio.command = /^(audiototext)$/i
Tio.register = true
Tio.limit = true

export default Tio

const transcribe = async (audioPath) => {
    try {
        const formData = new FormData();
        const fileStream = fs.createReadStream(audioPath);
        const fileName = path.basename(audioPath);

        formData.append('file', fileStream, {
            filename: fileName,
            contentType: 'audio/mpeg'
        });
        const config = {
            headers: {
                ...formData.getHeaders(),
                'authority': 'api.talknotes.io',
                'accept': '*/*',
                'accept-encoding': 'gzip, deflate, br',
                'origin': 'https://talknotes.io',
                'referer': 'https://talknotes.io/',
                'User-Agent': 'Postify/1.0.0'
            },
            maxBodyLength: Infinity
        };
        const response = await axios.post(
            'https://api.talknotes.io/tools/converter',
            formData,
            config
        );
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(`${error.response.status}: ${error.response.data}`);
        } else if (error.request) {
            throw new Error('Ya begitulah... kagak ada response dari sononyaa 😂');
        } else {
            throw new Error(error.message);
        }
    }
};