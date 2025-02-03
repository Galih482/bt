/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, { conn, text }) => {
    conn.saldo = conn.saldo || {};
    let id = m.sender;

    if (!(id in conn.saldo)) return m.reply("Kamu tidak memiliki sesi pembayaran.");

    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    
    if (!mime.startsWith('image/')) throw 'Balas dengan gambar sebagai bukti pembayaran.';

    let media = await q.download();

    await conn.sendMessage(owner + info.jid, {
        image: media,
        caption: `[ Bukti Pembayaran ]\nNomor: ${m.sender.split("@")[0]}\nNominal: Rp${await rp(conn.saldo[id].nominal)}`
    });

    clearTimeout(conn.saldo[id].time);
    delete conn.saldo[id];

    await m.reply("Bukti pembayaran telah dikirim. Mohon tunggu, owner akan segera memproses saldo Anda.");
};

Tio.help = Tio.command = ["kirimbukti", "ssbukti"];
Tio.tags = ["topup"];

export default Tio;

function rp(x) {
    x = x.toString();
    let pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1.$2");
    return x;
}