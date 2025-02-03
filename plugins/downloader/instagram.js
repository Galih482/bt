/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

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
    let input = `[!] *wrong input*
	
Ex : ${usedPrefix + command} https://www.instagram.com/reel/CsC2PQCNgM1/?igshid=NTc4MTIwNjQ2YQ==`
    if (!text) return m.reply(input)
    
    try {

        await m.react('🕐')
        let media = await instagram(text);
        for (let v of media) {
            await conn.sendFile(m.chat, v, '', null, m)
        }
    } catch (e) {
        throw e
    }
}
Tio.help = ["instagram"]
Tio.tags = ['downloader']
Tio.command = /^(i(nsta)?g(ram)?(d)?(own)?(l)?(oad)?)$/i
Tio.limit = true
Tio.register = true

export default Tio


const IP  = () => {
    const octet = () => Math.floor(Math.random() * 256);
    return `${octet()}.${octet()}.${octet()}.${octet()}`;
};


async function instagram(url) {
    try {
        const indown = await axios.create({
            baseURL: 'https://indown.io',
            withCredentials: true,
        });
        let ip = await IP()
        
        const {
            data: html,
            headers
        } = await indown.get('/', {
        headers: {
        'User-Agent': 'Positify/1.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
                "x-forwarded-for": ip,
        "x-real-ip": ip,
        "client-ip": ip,
    }
        });
        const $ = cheerio.load(html);
        const token = $('input[name="_token"]').val();
        const cookies = headers['set-cookie'].join('; ');

        const formData = new FormData();
        formData.append('referer', 'https://indown.io/');
        formData.append('locale', 'en');
        formData.append('p', ip);
        formData.append('_token', token);
        formData.append('link', url);

        const response = await indown.post('/download', formData, {
            headers: {
                'XSRF-TOKEN': token,
                'Cookie': cookies,
        "x-forwarded-for": ip,
        "x-real-ip": ip,
        "client-ip": ip,
        'User-Agent': 'Positify/1.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
            },
        });

        const $result = cheerio.load(response.data);
        const videoUrl = $result('video source').attr('src');

        if (videoUrl) {
            
            return [videoUrl];
        } else {
            const imageUrls = [];
            $result('.image-link img').each((index, element) => {
                const imgSrc = $(element).attr('src');
                if (imgSrc) {
                    imageUrls.push(imgSrc);
                }
            });
            return imageUrls;
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}