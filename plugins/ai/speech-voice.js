/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import axios from 'axios'

let Tio = async (m, {
    conn,
    isOwner,
    usedPrefix,
    command,
    args,
    text
}) => {
    conn.voice = conn.voice || {}
    if (!('id' in conn.voice) || !('model' in conn.voice)) {
        conn.voice = {
            id: '',
            model: ''
        };
    }

    let type = (args[0] || '').toLowerCase()
    switch (type) {
        case 'setmodel':
            let list_v = [
                'eleven_monolingual_v1',
                'eleven_multilingual_v2'
            ]
            let listM = list_v.map((item, index) => ({
                model: item
            }));
            if (!args[1]) return m.reply('Select modelV:\n' + listM.map((item, index) => `\n\n*${index + 1}.* ${item.model}`).join("\n"))
            let outing = listM[args[1] - 1].model
            conn.voice.model = outing
            m.reply(`*Success change model_voice: ${outing}*`)

            break
        case 'setid':
            let out;
            if (!args[1]) {
            let {
                data
            } = await axios.get("https://api.elevenlabs.io/v1/voices?show_legacy=true")
            let listModel = data.voices
            let list = listModel.map((item, index) => ({
                voiceId: item.voice_id,
                name: item.name
            }));
            return m.reply('Select id:\n' + list.map((item, index) => `*${index + 1}.* ${item.name}`).join("\n"))
            }
            if (args[1].length > 2) {
            conn.voice.id = args[1];
            } else {
            let {
                data
            } = await axios.get("https://api.elevenlabs.io/v1/voices?show_legacy=true")
            let listModel = data.voices
            let list = listModel.map((item, index) => ({
                voiceId: item.voice_id,
                name: item.name
            }));
            out = list[args[1] - 1].voiceId
            conn.voice.id = out
            }
            m.reply(`*Success change id_voice: ${args[1].length > 2 ? args[1] : out}*`)
            break
        default:
            if (m.quoted && m.quoted.text) {
                text = m.quoted.text || 'hai'
            } else if (text) {
                text = text
            } else if (!text && !m.quoted) return m.reply('reply / masukan teks');
            try {
                conn.sendMessage(m.chat, {
                    react: {
                        text: '🕛',
                        key: m.key
                    }
                })
                const {
                    id,
                    model
                } = conn.voice;
                if (!model) return m.reply(`Set terlebih dahulu model nya\n- .${command} setmodel`)
                if (!id) return m.reply(`Set terlebih dahulu id nya\n- .${command} setid`)
                const response = await voice(text, model, id)

                let audio = {
                    audio: response,
                    mimetype: 'audio/mpeg',
                    ptt: true,
                    contextInfo: {
                        externalAdReply: {
                            showAdAttribution: true,
                            mediaType: 1,
                            mediaUrl: '',
                            title: 'SPEECH VOICE',
                            body: `Model: ${model} ( ${id} )`,
                            sourceUrl: '',
                            thumbnail: await (await conn.getFile('https://telegra.ph/file/d088e696314f56d29e60c.jpg')).data,
                            renderLargerThumbnail: true
                        }
                    }
                };

                conn.sendMessage(m.chat, audio, {
                    quoted: m
                })
                conn.sendMessage(m.chat, {
                    react: {
                        text: '✅',
                        key: m.key
                    }
                })
            } catch (e) {
                throw eror
                conn.sendMessage(m.chat, {
                    react: {
                        text: '❗',
                        key: m.key
                    }
                })

            }
    }
}
Tio.help = ["setid", "setmodel"].map(v => `speech ${v}`)
Tio.tags = ["speech", "ai"]
Tio.command = /^(spe(ak|ech)?)$/i
Tio.premium = true
export default Tio

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}


async function voice(text, model, id) {
    const data = {
        text: text,
        model_id: model || 'eleven_multilingual_v2'
    };
    id = id ? id : 'EXAVITQu4vr4xnSDxMaL';

    const headers = {
        "xi-api-key": APIKeys['elevenlabs'],
'Referer': 'https://elevenlabs.io/app/speech-synthesis/text-to-speech',
'Content-Type': 'application/json',
'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36'
    };
    try {
        let response = await axios.post(`https://api.elevenlabs.io/v1/text-to-speech/${id}?allow_unauthenticated=1`, data, {
            headers,
            responseType: 'arraybuffer'
        })
        return response.data
    } catch (error) {
        return error.response
    }
}