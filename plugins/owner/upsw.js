const {
    generateWAMessage,
    STORIES_JID,
    generateWAMessageFromContent
} = (await import('@adiwajshing/baileys')).default;
import { fileTypeFromBuffer } from 'file-type';

let handler = async (m, { conn, text }) => {
    try {
        if (!text) return m.reply('❌ *Format tidak valid!*\n\n📢 *Cara Penggunaan:*\n' +
  '1️⃣ *Kirim ke semua grup:*\n`.upswtag Ini pesan --all`\n' +
  '2️⃣ *Kirim ke semua grup kecuali grup tertentu:*\n`.upswtag Ini pesan --all --x 123456@g.us 7891011@g.us`\n' +
  '3️⃣ *Kirim hanya ke grup tertentu:*\n`.upswtag Ini pesan 123456@g.us 987654@g.us`\n\n' +
  '🔹 *Keterangan:*\n- Gunakan `--all` untuk mengirim ke semua grup.\n' +
  '- Gunakan `--x` diikuti dengan ID grup untuk mengecualikan grup tertentu.\n' +
  '- Sebutkan langsung ID grup jika hanya ingin mengirim ke grup tertentu.\n' +
  '- Balas media jika ingin mengirim gambar, video, atau audio sebagai status.');


        const groups = Object.values(await conn.groupFetchAllParticipating())
            .filter(v => v.participants.find(p => p.id == conn.user.jid) && !v.announce);

        const isAll = text.includes("--all");
        const exceptMatch = text.match(/--x\s+([\w@. -]+)/);
        const exceptIds = exceptMatch ? exceptMatch[1].split(/\s+/).filter(v => v.endsWith('@g.us')) : [];

        let args = text.replace(/--all|--x\s+([\w@. -]+)/g, "").trim().split(/\s+/);
        let messageText = args.filter(v => !v.endsWith('@g.us')).join(" ").trim();
        let groupIds = args.filter(v => v.endsWith('@g.us'));

        let groupData, statusJidList;

        if (isAll) {
            groupData = groups.map(v => v.id).filter(id => !exceptIds.includes(id));
            statusJidList = groups.flatMap(group => 
                exceptIds.includes(group.id) ? [] : group.participants.map(v => v.id)
            );
        } else if (groupIds.length > 0) {
            groupData = groupIds.filter(v => !exceptIds.includes(v));
            statusJidList = groupData.flatMap(id => 
                groups.find(g => g.id === id)?.participants.map(v => v.id) || []
            );
        } else {
            return m.reply('ID grup tidak ditemukan dalam input.');
        }

        if (groupData.length === 0) return m.reply('Semua grup dalam daftar telah dikecualikan.');

        const reps = messageText || '@anda disebut';
        let media;
        const content = { caption: reps };

        if (m.quoted && (/audioMessage|videoMessage|imageMessage|conversation|extendedTextMessage/.test(m.quoted.mtype))) {
            try {
                media = await m.quoted.download();
                if (!media) return m.reply('Media gagal diunduh.');
            } catch (error) {
                throw error;
            }

            const mime = await fileTypeFromBuffer(media);
            if (mime) {
                if (/image/.test(mime.mime)) content.image = media, content.mimetype = mime.mime || 'image/jpeg';
                else if (/video/.test(mime.mime)) content.video = media, content.mimetype = mime.mime || 'video/mp4';
                else if (/audio/.test(mime.mime)) content.audio = media, content.ptt = true, content.mimetype = mime.mime || 'audio/mpeg';
                else return m.reply(`Tipe media tidak didukung. MIME type: ${mime.mime}`);
            } else {
                return m.reply('Tipe media tidak terdeteksi.');
            }
        } else if (reps) {
            content.text = reps;
        } else {
            return m.reply('Balas media yang ingin dijadikan story.');
        }

        await m.react("👀");
        const { success, failed } = await sendStatusMention(content, groupData, statusJidList);

        await conn.reply(m.chat, `✅ *Laporan Pengiriman Status*\n📂 *Tipe*: Text\n👥 *Total User*: ${statusJidList.length}\n📌 *Total Grup*: ${groupData.length}\n📢 *Mentions*: Tidak\n📈 *Status*: [✅ Sukses: ${success}${failed > 0 ? `\n⚠️ Gagal: ${failed}` : ''}]\n\n⚠️ *Grup yang dikecualikan*:\n${exceptIds.map(v => `- ${v}`).join('\n') || 'Tidak ada'}`, verif);
    } catch (error) {
        console.error(error);
        m.reply('Terjadi kesalahan:\n' + error.message);
    }
};

handler.help = handler.command = ["upswtag"];
handler.tags = ["owner"];
handler.rowner = true;

export default handler;

const sendStatusMention = async (content, groupData, statusJidList) => {
    let success = 0, failed = 0, index = 0;

    if (!content.image && !content.video && !content.audio && !content.text) {
        throw new Error("Media or text content is missing.");
    }

    const media = await generateWAMessage(STORIES_JID, content, { upload: conn.waUploadToServer });
    const groupStages = await itemStages(groupData);
    
    for (const groupId of groupStages) {
        for (const jid of groupId) {
            try {
                const msg = await generateWAMessageFromContent(jid, {
                    statusMentionMessage: {
                        message: {
                            protocolMessage: {
                                key: media.key,
                                type: 25,
                            },
                        },
                    },
                }, {});
                
                await conn.relayMessage(jid, msg.message, {
                    additionalNodes: [{ tag: "meta", attrs: { is_status_mention: "true" }, content: undefined }],
                });
                success++;
            } catch (error) {
                failed++;
            }

            index++;
            const delay = (index % 10 === 0) ? 30000 : 3000;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
        
        await conn.relayMessage(STORIES_JID, media.message, {
            messageId: media.key.id,
            statusJidList,
        });

        await new Promise(resolve => setTimeout(resolve, 5000));
    }
    
    return { success, failed };
};

function itemStages(itemArray) {
    const hasil = [];
    for (let index = 0; index < itemArray.length; index += 5) {
        hasil.push(itemArray.slice(index, index + 5));
    }
    return hasil;
}