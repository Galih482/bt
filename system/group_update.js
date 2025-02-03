
export async function participantsUpdate({ id, participants, action }) {
    if (opts['self'])
        return
    if (conn.isInit)
        return
    if (global.db.data == null)
        await loadDatabase()
    let chat = global.db.data.chats[id] || {}
    
    let text = ''
    switch (action) {

        case 'add':
            if (chat.welcome) {
                let groupMetadata = await conn.groupMetadata(id) || (conn.chats[id] || {}).metadata
                let member = groupMetadata.participants.length
                let name = await conn.getName(id)
                                              
                for (let user of participants) {
                    let pp = media.avatar 
                    let ppgc = media.avatar 
                    
                    try {
                        pp = await conn.profilePictureUrl(user, 'image')
                        ppgc = await conn.profilePictureUrl(id, 'image')
                        
                    } catch (e) {
                    } finally {
                        text = (chat.sWelcome || conn.welcome || 'Welcome, @user!').replace('@user', '@' + user.split('@')[0]).replace('@subject', await conn.getName(id)).replace('@member', member).replace('@desc', groupMetadata.desc?.toString() || 'unknow')
                            
const welcome = await Func.fetchBuffer(global.API('Tixo', "/canvas/welcome", {pp, title: name, desc: text}))

    conn.sendMessage(id, {
        text: text,
        contextInfo: {
        mentionedJid: [user],
            externalAdReply: {
                title: 'W E L C O M E',
                body: '',
                thumbnail: await welcome,
                sourceUrl: url.sgc,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    })
                    }
                }
            }
            
            break 
            case 'remove':
            if (chat.bye) {
                let groupMetadata = await conn.groupMetadata(id) || (conn.chats[id] || {}).metadata
                let member = groupMetadata.participants.length
                let name = await conn.getName(id)
                                              
                for (let user of participants) {
                    let pp = media.avatar 
                    let ppgc = media.avatar 
                    
                    try {
                        pp = await conn.profilePictureUrl(user, 'image')
                        ppgc = await conn.profilePictureUrl(id, 'image')
                        
                    } catch (e) {
                    } finally {
                        text = (chat.sBye || conn.bye || 'Bye, @user!').replace('@user', '@' + user.split('@')[0]).replace('@subject', await conn.getName(id)).replace('@member', member).replace('@desc', await groupMetadata.desc?.toString() || 'unknown')
                               
const leave = await Func.fetchBuffer(global.API('Tixo', "/canvas/leave", {pp, title: name, desc: text}))
    
    conn.sendMessage(id, {
        text: text,
        contextInfo: {
        mentionedJid: [user],
            externalAdReply: {
                title: 'G O O D B Y E',
                body: '',
                thumbnail: await leave,
                sourceUrl: global.info.sgc,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    })

                    }
                }
            }
            break
    }
}

export async function deleteUpdate(message) {
    try {
        const { fromMe, id, remoteJid, participant} = message
        if (fromMe)
            return
        let msg = conn.serializeM(conn.loadMessage(id))
        if (!msg)
            return
        if (!msg.isGroup) return;
        let chat = global.db.data.chats[msg.chat]
    
        if (chat.delete) {
        await conn.reply(msg.chat, `
Terdeteksi @${participant.split(`@`)[0]} menghapus pesan

- Untuk mematikan fitur ini, ketik
- .disable antidelete
`.trim(), msg, {contextInfo: {
            mentionedJid: [participant]
            }
        })
        conn.copyNForward(msg.chat, msg).catch(e => console.log(e, msg))
        }
    } catch (e) {
        console.error(e)
    }
}

export async function callUpdate(callUpdates) {
  let bot = global.db.data.settings[conn.user.jid];
  if (!bot.antiCall) return;
  let usr = callUpdates[0];
    if (!usr.isGroup && usr.status === "offer" && usr.from !== global.nomerown + "@s.whatsapp.net") {
      const jenisPanggilan = usr.isVideo ? "panggilan video" : "panggilan suara";
      const pesan = `⊝ *Anti Call* ⊝

- Nama: @${usr.from.split("@")[0]}
- Jenis: \`${jenisPanggilan}\`

kamu telah melanggar *TOS BOT* (kamu terbanned dan terblokir).
Jika ini adalah kesalahan, silakan hubungi owner:\n• https://wa.me/${global.owner}`;
      global.db.data.users[usr.from].banned = true;
      await conn.reply(usr.from, pesan, false, {
        contextInfo: {mentionedJid: [usr.from] }
      })
      await conn.rejectCall(usr.id, usr.from).then(async () => await conn.updateBlockStatus(usr.from, "block"))
    }
  console.log(callUpdates)
}