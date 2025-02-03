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

let Tio = async (m, {
    participants,
    conn,
    isOwner,
    isROwner,
    text
}) => {

    let api = "https://telegra.ph/file/98f82ae5ad3c9b175c1e1.jpg";

    let getGroups = await conn.groupFetchAllParticipating();
    let groups = Object.entries(getGroups).slice(0).map(entry => entry[1]);
    let anu = groups.map(v => v.id);
    let pesan = text ? text : m.quoted ? m.quoted.text : '';
    let bc = `\n${pesan}\n\n` + await Func.style(info.nameBot, 5);

    if (!pesan) throw 'Teksnya?';

    m.reply(`Mengirim Broadcast ke ${anu.length} chat, waktu selesai dalam ${anu.length * 0.5} detik`);

    if (m.quoted) {
        let quotedType = m.quoted.mtype;
        let sendMessage = async (type) => {
            for (let i of anu) {
                await conn.sendMessage(i, {
                    [type]: await m.quoted.download(),
                    caption: bc,
                    contextInfo: {
                        "externalAdReply": {
                            "title": `📣 [ ʙ ʀ ᴏ ᴀ ᴅ ᴄ ᴀ s ᴛ ] 📣`,
                            "body": 'WhatsApp Bot MD',
                            "showAdAttribution": true,
                            "previewType": "PHOTO",
                            "sourceUrl": url.sgc,
                            "thumbnailUrl": media.thumbnail
                        }
                    }
                }, {
                    quoted: verif
                });
                await conn.delay(1000);
            }
        };

        if (quotedType === 'imageMessage' || quotedType === 'videoMessage') {
            await sendMessage(quotedType === 'imageMessage' ? 'image' : 'video');
        } else if (quotedType === 'extendedTextMessage') {
            for (let i of anu) {
                await conn.sendMessage(i, {
                    text: bc,
                    contextInfo: {
                        "externalAdReply": {
                            "title": `📣 [ ʙ ʀ ᴏ ᴀ ᴅ ᴄ ᴀ s ᴛ ] 📣`,
                            "body": 'WhatsApp Bot MD',
                            "showAdAttribution": true,
                            "mediaType": 1,
                            "sourceUrl": url.sgc,
                            "thumbnailUrl": api,
                            "renderLargerThumbnail": true
                        }
                    }
                }, {
                    quoted: verif
                });
                await conn.delay(1000);
            }
        }
    } else {
        for (let i of anu) {
            await conn.sendMessage(i, {
                text: bc,
                contextInfo: {
                    "externalAdReply": {
                        "title": `📣 [ ʙ ʀ ᴏ ᴀ ᴅ ᴄ ᴀ s ᴛ ] 📣`,
                        "body": 'WhatsApp Bot MD',
                        "showAdAttribution": true,
                        "mediaType": 1,
                        "sourceUrl": url.sgc,
                        "thumbnailUrl": api,
                        "renderLargerThumbnail": true
                    }
                }
            }, {
                quoted: verif
            });
            await conn.delay(1000);
        }
    }

    m.reply(`Sukses mengirim broadcast ke ${anu.length} group`);
};

Tio.help = ['bcgc'];
Tio.tags = ['owner'];
Tio.command = /^(broadcastgc|bcgc)$/i;
Tio.owner = true;

export default Tio;