/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import fs from 'fs'

let Tio = async (m, {
    conn,
    usedPrefix,
    command,
    args,
    dbUser
}) => {
    const cmd = args[0] || 'list';
    let type = (args[0] || '').toLowerCase()
    let _menu = global.db.data.settings[conn.user.jid]
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    let hari = d.toLocaleDateString(locale, {
        weekday: 'long'
    })
    let tanggal = d.toLocaleDateString(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    let jam = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Jakarta'
    });
    let Styles = (text, style = 1) => {
  var xStr = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
  var yStr = Object.freeze({
    1: 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀꜱᴛᴜᴠᴡxʏᴢ1234567890'
  });
  var replacer = [];
  xStr.map((v, i) => replacer.push({
    original: v,
    convert: yStr[style].split('')[i]
  }));
  var str = text.toLowerCase().split('');
  var output = [];
  str.map(v => {
    const find = replacer.find(x => x.original == v);
    find ? output.push(find.convert) : output.push(v);
  });
  return output.join('');
};
    const tagCount = {};
    const tagHelpMapping = {};
    Object.keys(global.plugins)
        .filter(plugin => !plugin.disabled)
        .forEach(plugin => {
            const tagsArray = Array.isArray(global.plugins[plugin].tags) ?
                global.plugins[plugin].tags : [];

            if (tagsArray.length > 0) {
                const helpArray = Array.isArray(global.plugins[plugin].help) ?
                    global.plugins[plugin].help : [global.plugins[plugin].help];

                tagsArray.forEach(tag => {
                    if (tag) {
                        if (tagCount[tag]) {
                            tagCount[tag]++;
                            tagHelpMapping[tag].push(...helpArray);
                        } else {
                            tagCount[tag] = 1;
                            tagHelpMapping[tag] = [...helpArray];
                        }
                    }
                });
            }
        });
    let objek = Object.values(db.data.stats).map(v => v.success)
    let totalHit = 0
    for (let b of objek) {
        totalHit += b
    }

    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled && plugin.help).map(plugin => {
        return {
            help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
            tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
            prefix: 'customPrefix' in plugin,
            limit: plugin.limit,
            premium: plugin.premium,
            enabled: !plugin.disabled,
        }
    });

    let data = dbUser[m.sender];
    let fitur = Object.values(plugins).filter(v => v.help).map(v => v.help).flat(1);
    let tUser = Object.keys(dbUser).length;
    let userReg = Object.values(dbUser).filter(user => user.registered == true).length

    let headers = `
  Hai, Glasly adalah asisten virtual berbasis WhatsApp yang dirancang untuk mempermudah berbagai kebutuhan Anda. Dengan teknologi chatbot yang canggih, Glasly siap membantu Anda kapan saja, di mana saja.
    
*｢ DASHBOARD ｣*
┌ ▸ Name: ${m.pushName || 'User'}
│ ▸ Limit: ${data.limit}
│ ▸ Uang: ${data.money}
└ ▸ Status: ${data.registered ? "Terdaftar" : "Tidak terdaftar"} ${data.premium ? "Premium" : "Free"}

*｢ DATE ｣*
┌ ▸ Hari: ${hari}
│ ▸ Tanggal: ${tanggal}
└ ▸ Jam: ${jam}

*｢ INFO-BOT ｣*
┌ ▸ Mode: ${global.db.data.settings[conn.user.jid].self ? 'Self' : 'Public'}
│ ▸ Total menu: ${Object.keys(tagCount).length}
│ ▸ Total fitur: ${fitur.length}
│ ▸ Total user: ${tUser}
│ ▸ Total Hit: ${totalHit}
│ ▸ Total register: ${userReg}
└ ▸ Owner: ${global.info.numberOwn}\n`

    if (cmd === 'list') {
        const daftarTag = Object.keys(tagCount)
            .sort()
            .join('\n⤿ ' + usedPrefix + command + ' ');
        const more = String.fromCharCode(8206)
        const readMore = more.repeat(4001)
        let list = `${headers}${readMore}\n╭──┈  「 *LIST MENU* 」\n⤿ ${usedPrefix + command} all\n⤿ ${usedPrefix+command} ${daftarTag}\n╰──────•`
        if (_menu.image) {

            conn.sendMessage(m.chat, {
                text: Styles(list, 1), 
                contextInfo: {
                    externalAdReply: {
                        title: 'G L A S L Y - A I',
                        body: 'M E N U',
                        thumbnailUrl: media.thumbnail,
                        souceUrl: url.sgc,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, {
                quoted: m
            }).then(() => {
                if (config.sound) return conn.sendFile(m.chat, media.sound, '', null, m, true)
            })

        } else if (_menu.gif) {

            conn.sendMessage(m.chat, {
                video: {
                    url: media.gif
                },
                gifPlayback: true,
                caption: list,
                jpegThumbnail: await conn.resize((await conn.getFile(media.docThumbnail)).data, 180, 72),
                contextInfo: {
                    externalAdReply: {
                        title: info.nameBot,
                        body: 'M E N U',
                        thumbnailUrl: media.thumbnail,
                        souceUrl: url.sgc,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, {
                quoted: m
            }).then(() => {
                if (config.sound) return conn.sendFile(m.chat, media.sound, '', null, m, true)
            })

        } else if (_menu.teks) {

            conn.reply(m.chat, list, m).then(() => {
                if (config.sound) return conn.sendFile(m.chat, media.sound, '', null, m, true)
            })

        } else if (_menu.doc) {

            conn.sendMessage(m.chat, {
                document: fs.readFileSync("./package.json"),
                fileName: info.nameBot,
                fileLength: new Date(),
                pageCount: "2024",
                caption: list,
                jpegThumbnail: await conn.resize((await conn.getFile(media.docThumbnail)).data, 180, 72),
                contextInfo: {
                    externalAdReply: {
                        containsAutoReply: true,
                        mediaType: 1,
                        mediaUrl: 'https://telegra.ph/file/74abb87ac6082571db546.jpg',
                        renderLargerThumbnail: true,
                        showAdAttribution: true,
                        sourceUrl: url.sgc,
                        thumbnailUrl: media.thumbnail,
                        title: 'G L A S L Y - A I',
                        body: '',
                    },
                },
            }, {
                quoted: m
            }).then(() => {
                if (config.sound) return conn.sendFile(m.chat, media.sound, '', null, m, true)
            })
        }
    } else if (tagCount[cmd]) {
        const daftarHelp = tagHelpMapping[cmd].map((helpItem, index) => {

            const check = help.find(v => v.help == helpItem && v.limit) ? '🅛' : help.find(v => v.help == helpItem && v.premium) ? '🅟' : '';
            return `${usedPrefix}${helpItem} ${check}`;
        }).join('\n╰◈' + ' ');

        const list2 = `*╭─┈ ▣ ${cmd.toUpperCase()} ▣┈────⊡*\n╰◈ ${daftarHelp}\n*Total menu ${cmd}: ${tagHelpMapping[cmd].length}*`
        if (_menu.image) {

            conn.sendMessage(m.chat, {

                text: Styles(list2, 1), 
                contextInfo: {
                    externalAdReply: {
                        title: info.nameBot,
                        body: 'M E N U',
                        thumbnailUrl: media.thumbnail,
                        souceUrl: url.sgc,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, {
                quoted: m
            }).then(() => {
                if (config.sound) return conn.sendFile(m.chat, media.sound, '', null, m, true)
            })

        } else if (_menu.gif) {

            conn.sendMessage(m.chat, {
                video: {
                    url: media.gif
                },
                gifPlayback: true,
                caption: list2,
                contextInfo: {
                    externalAdReply: {
                        title: info.nameBot,
                        body: 'M E N U',
                        thumbnailUrl: media.thumbnail,
                        souceUrl: url.sgc,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, {
                quoted: m
            }).then(() => {
                if (config.sound) return conn.sendFile(m.chat, media.sound, '', null, m, true)
            })

        } else if (_menu.teks) {

            conn.reply(m.chat, list2, m).then(() => {
                if (config.sound) return conn.sendFile(m.chat, media.sound, '', null, m, true)
            })

        } else if (_menu.doc) {

            conn.sendMessage(m.chat, {
                document: fs.readFileSync("./package.json"),
                fileName: info.nameBot,
                fileLength: new Date(),
                pageCount: "2024",
                jpegThumbnail: await conn.resize((await conn.getFile(media.docThumbnail)).data, 180, 72),
                caption: list2,
                contextInfo: {
                    externalAdReply: {
                        containsAutoReply: true,
                        mediaType: 1,
                        mediaUrl: 'https://telegra.ph/file/74abb87ac6082571db546.jpg',
                        renderLargerThumbnail: true,
                        showAdAttribution: true,
                        sourceUrl: url.sgc,
                        thumbnailUrl: media.thumbnail,
                        title: `${date}`,
                        body: '',
                    },
                },
            }, {
                quoted: m
            }).then(() => {
                if (config.sound) return conn.sendFile(m.chat, media.sound, '', null, m, true)
            });
        }
    } else if (cmd === 'all') {
        let name = m.pushName || conn.getName(m.sender)
        const allTagsAndHelp = Object.keys(tagCount).sort().map(tag => {
            const daftarHelp = tagHelpMapping[tag].map((helpItem, index) => {
                const check = help.find(v => v.help == helpItem && v.limit) ? '🅛' : help.find(v => v.help == helpItem && v.premium) ? '🅟' : '';
                return `${usedPrefix}${helpItem} ${check}`;
            }).join('\n*⤿*' + ' ');
            return `*▧──···「 ${tag.toUpperCase()} 」*\n*⤿* ${daftarHelp}\n\n`;
        }).join('\n');
        let all = `${allTagsAndHelp}\n${global.info.wm}`
        if (_menu.image) {

            conn.sendMessage(m.chat, {
                text: Styles(all, 1), 
                contextInfo: {
                    externalAdReply: {
                        title: 'G L A S L Y - A I',
                        body: 'M E N U',
                        thumbnailUrl: media.thumbnail,
                        souceUrl: url.sgc,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, {
                quoted: m
            }).then(() => {
                if (config.sound) return conn.sendFile(m.chat, media.sound, '', null, m, true)
            })

        } else if (_menu.gif) {

            conn.sendMessage(m.chat, {
                video: {
                    url: media.gif
                },
                gifPlayback: true,
                caption: all,
                contextInfo: {
                    externalAdReply: {
                        title: info.nameBot,
                        body: 'M E N U',
                        thumbnailUrl: media.thumbnail,
                        souceUrl: url.sgc,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, {
                quoted: m
            }).then(() => {
                if (config.sound) return conn.sendFile(m.chat, media.sound, '', null, m, true)
            })

        } else if (_menu.teks) {

            conn.reply(m.chat, all, m).then(() => {
                if (config.sound) return conn.sendFile(m.chat, media.sound, '', null, m, true)
            })

        } else if (_menu.doc) {

            conn.sendMessage(m.chat, {
                document: fs.readFileSync("./package.json"),
                fileName: info.nameBot,
                fileLength: new Date(),
                pageCount: "2024",
                caption: all,
                jpegThumbnail: await conn.resize((await conn.getFile(media.docThumbnail)).data, 180, 72),
                contextInfo: {
                    externalAdReply: {
                        containsAutoReply: true,
                        mediaType: 1,
                        mediaUrl: 'https://telegra.ph/file/74abb87ac6082571db546.jpg',
                        renderLargerThumbnail: true,
                        showAdAttribution: true,
                        sourceUrl: url.sgc,
                        thumbnailUrl: media.thumbnail,
                        title: 'G L A S L Y - A I',
                        body: '',
                    },
                },
            }, {
                quoted: m
            }).then(() => {
                if (config.sound) return conn.sendFile(m.chat, media.sound, '', null, m, true)
            })
        }
    } else {
        await conn.reply(m.chat, `"'${cmd}' tidak dapat ditemukan. Gunakan perintah '${command} list' atau '${command} all' untuk melihat menu yang telah tersedia.`, m);
    }
}

Tio.help = ['menu']
Tio.tags = ['main']
Tio.command = ['menu']
Tio.register = true
export default Tio