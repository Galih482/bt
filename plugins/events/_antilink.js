const isLinkHttp = /chat.whatsapp.com/i;

export async function before(m, {
    conn,
    args,
    usedPrefix,
    command,
    isAdmin,
    isBotAdmin
}) {
    if (m.isBaileys && m.fromMe) return !0;
    if (!m.isGroup) return !1;

    let chat = global.db.data.chats[m.chat];
    let name = conn.getName(m.sender);
    const isAntiLinkHttp = isLinkHttp.test(m.text);

    // Inisialisasi pelanggaran
    if (!chat.violations) chat.violations = {};
    if (!chat.violations[m.sender]) chat.violations[m.sender] = 0;

    function cek(grup1, grup2) {
        const regex = /^https:\/\/chat\.whatsapp\.com\/[a-zA-Z0-9]{22}$/;
        return regex.test(grup1) && regex.test(grup2) && grup1 === grup2;
    }

    if (chat.antiLink && isAntiLinkHttp) {
        let grup = await conn.groupInviteCode(m.chat);
        let gc = await cek(m.text, 'https://chat.whatsapp.com/' + grup);
        
        if (gc) {
            await m.reply('kamu mengirim link grup ini. kamu aman!');
        } else if (!isAdmin) {
            if (isBotAdmin) {
                chat.violations[m.sender] += 1; // Tambah pelanggaran

                // Cek jika pelanggaran sudah mencapai 3 kali
                if (chat.violations[m.sender] >= 3) {
                    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove'); // Keluarkan anggota
                    await m.reply('Kamu telah dikeluarkan dari grup karena melanggar aturan 3 kali.');
                    delete chat.violations[m.sender]; // Reset pelanggaran
                } else {
                    await conn.sendMessage(m.chat, {
                        delete: m.key
                    });

                    // Hitung sisa pelanggaran
                    const sisaPelanggaran = 3 - chat.violations[m.sender];
                    await m.reply(`> Maaf, mengirim link grup lain tidak diperbolehkan di grup ini.\n\nPesan Anda akan dihapus untuk menjaga keamanan dan kenyamanan bersama.\n\n> Total Sisa : 3/${sisaPelanggaran}\n\n*Jika 3x Akan Di Kick Oleh Bot*\nTerima kasih atas pengertiannya! 🙏`);
                }
            }
        } else {
            await m.reply('*📣 kamu admin, kamu aman*');
        }
    }
    return !1;
}