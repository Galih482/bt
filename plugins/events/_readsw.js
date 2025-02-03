/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

export async function before(m, {
    dbBot,
    conn
}) {
    if (m.key.remoteJid != 'status@broadcast') return;

    conn.story = conn.story ? conn.story : [];

    const {
        mtype,
        text,
        sender
    } = m;
    const name = m.sender.split('@')[0];
    const chat = dbBot[conn.user.jid] || {}

    if (!chat.viewStory) return;

    if (mtype === 'imageMessage' || mtype === 'videoMessage') {
        const caption = text ? text : '';
        try {
            await conn.readMessages([m.key])
            let buffer = await m.download();
            await conn.sendFile(owner + info.jid, buffer, '', caption, m, false, {
                mentions: [m.sender]
            });
            await conn.sendMessage(m.key.remoteJid, { react: { text: await emoji(), key:  m.key } }, { statusJidList: [m.key.participant, m.sender] });
            // Save the message to conn.story array
            conn.story.push({
                type: mtype,
                quoted: m,
                sender: m.sender,
                caption: caption,
                buffer: buffer
            });
        } catch (e) {
            console.log(e);
            await conn.reply(owner + info.jid, caption, m, {
                mentions: [m.sender]
            });
        }


    } else if (mtype === 'audioMessage') {
        try {
           await conn.readMessages([m.key])
            let buffer = await m.download();
            await conn.sendFile(owner + info.jid, buffer, '', '', m, false, {
                mimetype: m.mimetype
            });
            await conn.sendMessage(m.key.remoteJid, { react: { text: await emoji(), key:  m.key } }, { statusJidList: [m.key.participant, m.sender] });
            // Save the message to conn.story array
            conn.story.push({
                type: mtype,
                quoted: m,
                sender: m.sender,
                buffer: buffer
            });
        } catch (e) {
            console.log(e);
        }
    } else if (mtype === 'extendedTextMessage') {
        const pesan = text ? text : '';
        await conn.readMessages([m.key])
        await conn.reply(owner + info.jid, pesan, m, {
            mentions: [m.sender]
        });
        await conn.sendMessage(m.key.remoteJid, { react: { text: await emoji(), key:  m.key } }, { statusJidList: [m.key.participant, m.sender] });
        // Save the message to conn.story array
        conn.story.push({
            type: mtype,
            quoted: m,
            sender: m.sender,
            message: pesan
        });
    }
}

async function emoji() {
    let emo = [
        "😀", "😂", "😍", "🥺", "😎", "😢", "😡", "😱", "👍", "👎",
        "👏", "💪", "🙏", "🎉", "🎂", "🌟", "🌈", "🔥", "🍎", "🍕",
        "🍔", "🍟", "🍣", "🍜", "🎸", "🎧", "🎤", "🎬", "🏆", "⚽",
        "🏀", "🏈", "🏊", "🚴", "🚗", "✈️", "🚀", "🚂", "🏠", "🌍"
    ];
    
    let randomIndex = Math.floor(Math.random() * emo.length);
    return emo[randomIndex];
}