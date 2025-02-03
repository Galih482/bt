/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import fs from "fs";

async function Tio(m, {
    conn,
    text,
    usedPrefix,
    command
}) {
    let [action, number] = text.split(' ');
    let jsonData = global.db.data.schedule;
    switch (command) {
        case 'schedule':
            if (action === 'hapus') {
                if (!number) {
                    if (jsonData.length === 0) return m.reply("Tidak ada schedule.");
                    let scheduleList = jsonData.map((item, index) => `#${index + 1} Close: ${item.time.close}, Open: ${item.time.open}`).join('\n');
                    return m.reply(`Daftar Schedule:\n\n${scheduleList}`);
                } else {
                    number = parseInt(number) - 1; 
                    if (isNaN(number) || number < 0 || number >= jsonData.length) {
                        return m.reply("Nomor schedule tidak valid.");
                    }
                    jsonData.splice(number, 1);
                    return m.reply(`Schedule nomor ${number + 1} telah dihapus.`);
                }
            } else {
                let [close, open] = text.split(' ');

                if (!(close && open)) return m.reply(await Func.exam(usedPrefix, command, ' close(12:00) open(12:01)'));
                
                const isTimeValid = (time) => {
                    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
                    return regex.test(time);
                };

                if (!isTimeValid(close) || !isTimeValid(open)) return m.reply("Format jam harus HH:mm (contoh: 12:00)");

                const timeToMinutes = (time) => {
                    let [hours, minutes] = time.split(':').map(Number);
                    return hours * 60 + minutes;
                };

                let closeTime = timeToMinutes(close);
                let openTime = timeToMinutes(open);

                if (openTime <= closeTime) return m.reply("Waktu open harus lebih besar dari waktu close.");

                jsonData.push({
                    id: m.chat,
                    time: {
                        close,
                        open
                    }
                });
                return m.reply(`Schedule *AKTIF*\n\nClose: ${close}\nOpen: ${open}`);
            }
        break;
        default:
            return m.reply("Perintah tidak dikenal.");
    }
}

Tio.help = Tio.command = ["schedule"];
Tio.tags = ["group"];

Tio.admin = Tio.group = true;

export default Tio;