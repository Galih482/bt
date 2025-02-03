const moment = (await import('moment-timezone')).default;
import fs from "fs";
import archiver from 'archiver';
import cron from "node-cron";

/**
    ═───────◇───────═
**/
const jsonMessage = JSON.parse(await fs.readFileSync("./system/json/message.json", "utf-8"));

/**
    ═───────◇───────═
**/
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function options(jid, conn, type) {
    if (type === "close") {
        type = "announcement";
    } else if (type === "open") {
        type = "not_announcement";
    }
    return conn.groupSettingUpdate(jid, type);
}

/**
    ═───────◇───────═
**/
async function groupSchedule(conn, message) {
    let json = global.db.data.schedule;
    if (json.length === 0) return;

    try {
        const time = moment.tz('Asia/Jakarta').format('HH:mm');

        for (let index of json) {
            let ID = await conn.groupMetadata(index.id);
            let check = ID.announce;

            if (time === index.time.close && check === false) {
                await conn.reply(index.id, message.close, null);
                await options(index.id, conn, "close");
            }

            if (time === index.time.open && check === true) {
                await conn.reply(index.id, message.open, null);
                await options(index.id, conn, "open");
            }
        }
    } catch (e) {
        console.log(e);
        return false;
    }
}

/**
    ═───────◇───────═
**/
async function backupScript(conn) {
    // 1 jam sekali
    cron.schedule('0 */2 * * *', async () => {
        if (!global.db.data.settings[conn.user.jid].backup) return;

        const output = fs.createWriteStream(jsonMessage.backupName);
        const archive = archiver('zip', {
            zlib: { level: 9 }
        });

        output.on('close', async function() {
            let caption = 'Backup Script. ' + await Func.toSize(archive.pointer());
            console.log(caption);
            await conn.sendFile(global.owner + global.info.jid, jsonMessage.backupName, jsonMessage.backupName, caption, {
                key: {
                    participant: '0@s.whatsapp.net',
                    remoteJid: '0@s.whatsapp.net'
                },
                message: {
                    conversation: await global.Func.style('Backup Script', 5)
                }
            });
        });

        archive.on('warning', function(err) {
            if (err.code === 'ENOENT') {
                console.warn(err);
            } else {
                throw err;
            }
        });

        archive.on('error', function(err) {
            throw err;
        });

        archive.pipe(output);
        archive.glob('**/*', {
            ignore: ['node_modules/**', 'tmp/**']
        });

        await archive.finalize();
        setTimeout(async () => {
        await fs.unlinkSync(jsonMessage.backupName);
        }, 60 * 1000);
    });
}

/**
    ═───────◇───────═
**/
async function resetLimit(conn) {
    // setiap jam 12 malam
    cron.schedule('0 0 * * *', async () => {
        if (!global.setting.resetLimit) return;
           
        try {
            let data = global.db.data;
            let object = Object.keys(data.users);
            let grup = Object.keys(data.chats).filter(v => v.endsWith('@g.us'));

            for (let usr of object) {
                if (data.users[usr].limit < 1) {
                    data.users[usr].limit = global.limit;
                }
            }

            for (let gc of grup) {
                await conn.reply(gc, await global.Func.style("Sistem reset semua limit yang di bawah 1", 1), null);
                await delay(5000);
            }

        } catch (err) {
            console.error('Terjadi kesalahan dalam proses cron:', err);
        }
    }, {
        scheduled: true,
        timezone: "Asia/Jakarta"
    });
}

async function automatic(conn) {
    resetLimit(conn);
    backupScript(conn);
}
async function schedule(conn) {
    return groupSchedule(conn, jsonMessage)
}
export { automatic, schedule };
