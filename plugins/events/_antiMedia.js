/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import * as bailey from '@adiwajshing/baileys'
const {
    downloadContentFromMessage
} = bailey

export async function before(m, {
    isAdmin,
    conn,
    isBotAdmin,
    dbChat,
    dbBot
}) {
    if (!m.isGroup) return;
    if (m.fromMe) return;
    let messageType = m.mtype;
    let sender = m.key.participant;
    let messageId = m.key.id;

    if (dbChat[m.chat].viewonce) {
        if (m.mtype == 'viewOnceMessageV2') {
            let msg = m.message.viewOnceMessageV2.message;
            let type = Object.keys(msg)[0];
            let media = await downloadContentFromMessage(msg[type], type == 'imageMessage' ? 'image' : 'video');
            let buffer = Buffer.from([]);
            for await (const chunk of media) {
                buffer = Buffer.concat([buffer, chunk]);
            }

            if (/video/.test(type)) {
                return conn.sendFile(m.chat, buffer, '', `[View Once Video] Detected\n\n` + (msg[type].caption || ''), m);
            } else if (/image/.test(type)) {
                return conn.sendFile(m.chat, buffer, '', `[View Once Image] Detected\n\n` + (msg[type].caption || ''), m);
            }
        } else if (m.mtype == "viewOnceMessageV2Extension") {
            let mssg = m.message.viewOnceMessageV2Extension.message;
            let tipe = Object.keys(mssg)[0]
            let media2 = await downloadContentFromMessage(mssg[tipe], 'audio');
            let buff = Buffer.from([]);
            for await (const chunk of media2) {
                buff = Buffer.concat([buff, chunk]);
            }
            if (/audio/.test(tipe)) {
                await conn.reply(m.chat, `@${m.sender.split("@")[0]} telah mengirim audio sekali putar`, null, {
                    contextInfo: {
                        mentionedJid: [m.sender]
                    }
                })
                return conn.sendFile(m.chat, buff, '', '', m, true);

            }
        }
    }
    if (dbChat[m.chat].antiAudio && messageType === 'audioMessage') {
        if (!isAdmin && isBotAdmin) {
            m.reply(`*Terdeteksi File Mp3*\nSory audio/mp3 yang kamu kirim akan dihapus, karna admin mengaktifkan antiAudio`);
            return conn.sendMessage(m.chat, {
                delete: {
                    remoteJid: m.chat,
                    fromMe: false,
                    id: messageId,
                    participant: sender
                }
            });
        }
    }
    if (dbChat[m.chat].antiFoto && messageType === 'imageMessage') {
        if (!isAdmin && isBotAdmin) {
            m.reply(`*Terdeteksi Gambar*\nSory gambar yang kamu kirim akan dihapus, karna admin mengaktifkan antiImage`);
            return conn.sendMessage(m.chat, {
                delete: {
                    remoteJid: m.chat,
                    fromMe: false,
                    id: messageId,
                    participant: sender
                }
            });
        }
    }
    if (dbChat[m.chat].antiSticker && messageType === 'stickerMessage') {
        if (!isAdmin && isBotAdmin) {
            m.reply(`*Terdeteksi Sticker*\nSory sticker yang kamu kirim akan dihapus, karna admin mengaktifkan antiSticker`);
            return conn.sendMessage(m.chat, {
                delete: {
                    remoteJid: m.chat,
                    fromMe: false,
                    id: messageId,
                    participant: sender
                }
            });
        }
    }
    if (dbChat[m.chat].antiVideo && messageType === 'videoMessage') {
        if (!isAdmin && isBotAdmin) {
            m.reply(`*Terdeteksi Video*\nSory video yang kamu kirim akan dihapus, karna admin mengaktifkan antiVideo`);
            return conn.sendMessage(m.chat, {
                delete: {
                    remoteJid: m.chat,
                    fromMe: false,
                    id: messageId,
                    participant: sender
                }
            });
        }
    }
    if (dbChat[m.chat].antiedit) {

            if (m.mtype == "editedMessage") {
            
                let msg = (m.mtype === 'editedMessage') ? m.message.editedMessage.message.protocolMessage.editedMessage.conversation ? m.message.editedMessage.message.protocolMessage.editedMessage.conversation : m.message.editedMessage.message.protocolMessage.editedMessage.extendedTextMessage.text : ''
                
                let json = await conn.loadMessage(m.message.editedMessage.message.protocolMessage.key.id)
                let cap = `[ *NOTICE EDITED MESSAGE* ]

Dari: @${json.key.participant ? json.key.participant.split("@")[0] : json.key.remoteJid.split("@")[0]}
Pesan Sebelumnya: \`${json.message.extendedTextMessage ? json.message.extendedTextMessage.text : json.message.conversation}\`
Pesan di Edit: \`${msg}\``

                await conn.reply(json.key.remoteJid, cap, m, {
                    contextInfo: {
                        mentionedJid: [json.key.participant ? json.key.participant : json.key.remoteJid]
                    }
                })
            }
             }
}