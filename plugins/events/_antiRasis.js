/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import {
    performance
} from 'perf_hooks';

let badwordRegex = /anj(k|g)|ajn?(g|k)|a?njin(g|k)|bajingan|b(a?n)?gsa?t|ko?nto?l|me?me?(k|q)|pe?pe?(k|q)|meki|titi(t|d)|pe?ler|tetek|toket|ngewe|go?blo?k|to?lo?l|idiot|(k|ng)e?nto?(t|d)|jembut|bego|dajj?al|janc(u|o)k|pantek|puki ?(mak)?|kimak|kampang|lonte|col(i|mek?)|pelacur|henceu?t|nigga|fuck|dick|bitch|tits|bastard|asshole/i

export async function before(m, {
        isAdmin,
        dbChat,
        dbUser,
        isOwner,
        isBotAdmin
    }) {
        if (m.isGroup) {
            if (m.mtype === 'protocolMessage' || m.mtype === 'pollUpdateMessage' || m.mtype === 'reactionMessage') return;
            if (dbChat[m.chat].antiSpam) {
                if (!m.msg || !m.message || m.key.remoteJid !== m.chat || dbUser[m.sender].banned || dbChat[m.chat].isBanned) return;

                conn.spam = conn.spam || {};
                conn.spam[m.sender] = conn.spam[m.sender] || {
                    count: 0,
                    lastspam: 0
                };
                const now = performance.now();
                const timeDifference = now - conn.spam[m.sender].lastspam;

                if (timeDifference < 5000) {
                    conn.spam[m.sender].count++;
                    if (conn.spam[m.sender].count >= 4 && !isOwner && !isAdmin) {
                        dbUser[m.sender].banned = true;
                        conn.spam[m.sender].lastspam = now + 5000;
                        const remainingCooldown = Math.ceil((conn.spam[m.sender].lastspam - now) / 1000);

                        setTimeout(() => {
                            dbUser[m.sender].banned = false;
                            conn.spam[m.sender].count = 0;

                            conn.sendMessage(m.chat, {
                                react: {
                                    text: '✅',
                                    key: m.key
                                }
                            })
                        }, 10000);

                        const message = m.mtype.replace(/message$/i, '').replace('audio', m.msg.ptt ? 'PTT' : 'audio').replace(/^./, v => v.toUpperCase()) || 'Unknown';
                        return m.reply('⚠️ Kamu telah terbanned tunggu setelah 10 detik..');
                    }
                } else {
                    conn.spam[m.sender].count = 0;
                }

                conn.spam[m.sender].lastspam = now;
            }

            if (dbChat[m.chat].antiBadword && isBadword) {
                if (m.fromMe) return !0
                let isBadword = badwordRegex.exec(m.text)
                dbUser[m.sender].warn += 1
                await m.reply(`${dbUser[m.sender].warn >= 5 ? '*📮 Jika total warning kamu mencapai 5 Bot terpaksa kick kamu dari grup!*' : '*📮 Kata Kata Toxic/Jorok Terdeteksi*'}

𖠙 Warning: ${dbUser[m.sender].warn} / 5

[❗] Jika total warning mencapai 5 Kamu akan dikeluarkan dari group ini

“Barang siapa yang beriman kepada Allah dan Hari Akhir maka hendaklah dia berkata baik atau diam” (HR. al-Bukhari dan Muslim).`)
                if (dbUser[m.sender].warn >= 5) {
                    dbUser[m.sender].warn = 0
                    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
                }
            }
        }
}