/*
 * This code was created by Zykuan
 * © 2024 XiezuMedia. All rights reserved.
 * Do not remove this watermark or you will face a penalty.
*/

export async function before(m) {
    try {
        let id = m.chat;
        let timeout = 180000; // 3 menit
        let reward = randomInt(100, 80000);
        let users = global.db.data.users[m.sender];
        let body = typeof m.text == 'string' ? m.text : false;
        this.bomb = this.bomb ? this.bomb : {};
        if (!this.bomb[id]) return false;
        let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text);
        if (isSurrender) {
            await this.reply(m.chat, `🚩 Kamu menyerah! Semoga lain kali beruntung!`, m);
            clearTimeout(this.bomb[id][2]);
            delete this.bomb[id];
            return;
        }
        if (this.bomb[id] && m.quoted && m.quoted.id == this.bomb[id][3].id && !isNaN(body)) {
            let json = this.bomb[id][1].find(v => v.position == body);
            if (!json) return this.reply(m.chat, `🚩 Silakan kirim angka *1* - *9* untuk membuka kotak!`, m);
            if (json.emot == '💥') {
                json.state = true;
                let bomb = this.bomb[id][1];
                let teks = `🎉 *B O M B*\n\n`;
                teks += bomb.slice(0, 3).map(v => v.state ? v.emot : v.number).join('') + '\n';
                teks += bomb.slice(3, 6).map(v => v.state ? v.emot : v.number).join('') + '\n';
                teks += bomb.slice(6).map(v => v.state ? v.emot : v.number).join('') + '\n\n';
                teks += `Waktu habis: [ *${((timeout / 1000) / 60)} menit* ]\n`;
                teks += `*Permainan selesai!*, bom ada di kotak ini: (- *${formatNumber(reward)} Exp*)`;

                this.reply(m.chat, teks, m).then(() => {
                    users.exp < reward ? users.exp = 0 : users.exp -= reward;
                    clearTimeout(this.bomb[id][2]);
                    delete this.bomb[id];
                });
            } else if (json.state) {
                return this.reply(m.chat, `🚩 Kotak ${json.number} sudah dibuka! Silakan pilih kotak yang lain.`, m);
            } else {
                json.state = true;
                let changes = this.bomb[id][1];
                let open = changes.filter(v => v.state && v.emot != '💥').length;

                if (open >= 8) {
                    let teks = `🎉 *B O M B*\n\n`;
                    teks += `Silakan kirim angka *1* - *9* untuk membuka kotak:\n\n`;
                    teks += changes.slice(0, 3).map(v => v.state ? v.emot : v.number).join('') + '\n';
                    teks += changes.slice(3, 6).map(v => v.state ? v.emot : v.number).join('') + '\n';
                    teks += changes.slice(6).map(v => v.state ? v.emot : v.number).join('') + '\n\n';
                    teks += `Waktu habis: [ *${((timeout / 1000) / 60)} menit* ]\n`;
                    teks += `*Permainan selesai!* Semua kotak terbuka, bom tidak ada! (+ *${formatNumber(reward)} Exp*)`;

                    this.reply(m.chat, teks, m).then(() => {
                        users.exp += reward;
                        clearTimeout(this.bomb[id][2]);
                        delete this.bomb[id];
                    });
                } else {
                    let teks = `🎉 *B O M B*\n\n`;
                    teks += `Silakan kirim angka *1* - *9* untuk membuka kotak:\n\n`;
                    teks += changes.slice(0, 3).map(v => v.state ? v.emot : v.number).join('') + '\n';
                    teks += changes.slice(3, 6).map(v => v.state ? v.emot : v.number).join('') + '\n';
                    teks += changes.slice(6).map(v => v.state ? v.emot : v.number).join('') + '\n\n';
                    teks += `Waktu habis: [ *${((timeout / 1000) / 60)} menit* ]\n`;
                    teks += `Kotak tidak ada bom: (+ *${formatNumber(reward)} Exp*)`;

                    this.relayMessage(m.chat, {
                        protocolMessage: {
                            key: this.bomb[id][3],
                            type: 14,
                            editedMessage: {
                                conversation: teks
                            }
                        }
                    }, {}).then(() => {
                        users.exp += reward;
                    });
                }
            }
        }
    } catch (e) {
        console.log(e);
    }
}

export const exp = 0;

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatNumber(number) {
    return number.toLocaleString();
}