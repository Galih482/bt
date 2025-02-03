/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import fetch from 'node-fetch';

let Tio = async(m, { conn, text, args, command, usedPrefix}) => {

let q = m.quoted ? m.quoted : m
if (!q) return m.reply('Media not found')
let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
    
if (!/audio/.test(mime)) return m.reply(`Reply audio dengan perintah ${usedPrefix + command}`)

let media = await q.download?.()
let { text: result } = await transcribe(media);
await conn.sendMessage(m.chat, { text: result }, {quoted: m})
}

Tio.help = ['whisper']
Tio.tags = ['ai']
Tio.command = /^(ws|whisper)$/i
Tio.register = true 
Tio.limit = true

export default Tio

async function transcribe(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/openai/whisper-large-v3-turbo",
		{
			headers: {
				Authorization: "Bearer " + global.APIKeys['hf'],
				"Content-Type": "application/json",
			},
			method: "POST",
			body: data,
		}
	);
	const result = await response.json();
	return result;
}