/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import axios from 'axios';

let Tio = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) {
        return m.reply(await Func.exam(usedPrefix, command, 'google.com'));
    }

    const sanitizedUrl = text.replace(/https?:\/\//, '');

    try {
        const result = await dnscheck(sanitizedUrl);

        const caption = await formatDNSResult(result);

        await m.reply(caption);
    } catch (err) {
        await m.reply(`Terjadi kesalahan: ${err.message}`);
    }
};

Tio.help = Tio.command = ['cekdns'];
Tio.tags = ['tools'];
export default Tio;

const dnscheck = async (url) => {
    const requestData = {
        domain: url,
    };

    const options = {
        method: 'POST',
        url: 'https://www.nslookup.io/api/v1/webservers',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
            Referer: 'https://www.nslookup.io/',
            Origin: 'https://www.nslookup.io',
        },
        data: requestData,
    };

    const response = await axios.request(options);
    return response.data;
};

const formatDNSResult = (result) => {
    const { punycodeDomain, unicodeDomain, a, aaaa } = result;

    let caption = `🌐 *DNS Lookup Result*\n\n`;
    caption += `*Domain:* ${unicodeDomain} (${punycodeDomain})\n\n`;

    if (a?.response?.answer) {
        caption += `*IPv4 Records:*\n`;
        a.response.answer.forEach((ans, idx) => {
            const { ipv4, ttl } = ans.record;
            const { country, city, org } = ans.ipInfo || {};
            caption += `  ${idx + 1}. ${ipv4}\n     TTL: ${ttl}s\n     Location: ${city}, ${country}\n     Org: ${org}\n`;
        });
    }

    if (aaaa?.response?.answer) {
        caption += `\n*IPv6 Records:*\n`;
        aaaa.response.answer.forEach((ans, idx) => {
            const { ipv6, ttl } = ans.record;
            const { country, city, org } = ans.ipInfo || {};
            caption += `  ${idx + 1}. ${ipv6}\n     TTL: ${ttl}s\n     Location: ${city}, ${country}\n     Org: ${org}\n`;
        });
    }

    return caption;
};