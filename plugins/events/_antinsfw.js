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

import axios from "axios";
import FormData from "form-data";

/**
Anti NSFW by Tio
**/

export async function before(m, {
    conn,
    dbChat
}) {
    if (m.fromMe) return true;
    if (!m.isGroup) return false;

    const {
        mtype,
        text,
        sender
    } = m
    let hapus = m.key.participant
    let bang = m.key.id

    if (dbChat[m.chat].antiNsfw) {
            //code
if (mtype === 'imageMessage') {
            const media = await m.download()
            const {
                nsfw,
                msg
            } = await antiNsfw(media);
            if (nsfw > 0.35) {

                return conn.sendMessage(m.chat, {
                    text: `❗${msg}`
                }, {
                    quoted: verif,
                    mentions: m.sender
                }).then(_ => {
                    conn.sendMessage(m.chat, {
                        delete: {
                            remoteJid: m.chat,
                            fromMe: false,
                            id: bang,
                            participant: hapus
                        }
                    })
                })

            } else {
                await m.reply(`@${m.sender.split('@')[0]} media yang kamu kirim *Aman*.`)
            }
        }
    }
  }

async function antiNsfw(buffer) {
    try {
let { user, secret } = global.APIKeys["nsfw"]
let data = new FormData();
data.append('media', buffer, 'nsfw.jpg');
data.append('models', 'nudity-2.1');
data.append('api_user', user);
data.append('api_secret', secret);

let response = await axios({
  method: 'post',
  url:'https://api.sightengine.com/1.0/check.json',
  data: data,
  headers: data.getHeaders()
})
        if (response.data.status == 'success') {
            const message = `Konten NSFW *( ${response.data.nudity.sexual_activity}% )* terdeteksi oleh sistem, media mengandung NSFW.`

            return {
                nsfw: response.data.nudity.sexual_activity,
                msg: message
            }
        }
    } catch (e) {
        console.log('terjadi error saat mendeteksi media: ' + e)
    }
}