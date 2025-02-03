/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let handler = async (m, { conn, text }) => {
    conn.saldo = conn.saldo || {};
    let id = m.sender;
    if (!(id in conn.saldo)) return m.reply("Tidak ada charge yang sedang berlangsung untuk dibatalkan.");

    if (conn.saldo[id].status === "finish") {
        return m.reply("Pembayaran telah selesai, tidak dapat membatalkan.");
    }

    clearTimeout(conn.saldo[id].time);
    conn.sendMessage(m.chat, { text: "Charge telah dibatalkan." });
    conn.sendMessage(owner + info.jid, { text: `Charge telah dibatalkan.\nNomor: ${m.sender.split("@")[0]}\nNominal: Rp${rp(conn.saldo[id].nominal)}` });
    delete conn.saldo[id];

    await m.reply("Charge saldo telah dibatalkan.");
};

handler.help = handler.command = ["cancelcharge"];
handler.tags = ["topup"];

export default handler;

function rp(x) {
    x = x.toString();
    let pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1.$2");
    return x;
}