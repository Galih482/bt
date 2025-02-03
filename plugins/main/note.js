/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

let Tio = async (m, { conn, command, usedPrefix, text, dbUser }) => {
  dbUser[m.sender].note = dbUser[m.sender].note || [];

  switch (true) {
    case /^(listnote|daftar(catatan|note)|notelist)$/i.test(command): {
      if (dbUser[m.sender].note.length === 0) {
        return m.reply("Kamu belum punya catatan!");
      }

      if (text) {
        if (isNaN(text)) return m.reply("Nomor harus berupa angka!");
        let nom = parseInt(text) - 1;
        if (!dbUser[m.sender].note[nom]) return m.reply("Catatan tidak ditemukan!");
        let note = dbUser[m.sender].note[nom];
        await conn.reply(m.chat, `*Title: ${note.title}*\n${note.isi}`, m);
      } else {
        let txt = "•─── 〘 *List Note* 〙───•\n" + readMore;
        let num = 1;
        for (let note of dbUser[m.sender].note) {
          txt += `\n> ${num++}. *\`${note.title}\`*`;
        }
        await conn.reply(m.chat, txt, m);
      }
      break;
    }

    case /^(hapus(note|catatan)|del(ete)?(note|catatan)?)$/i.test(command): {
      if (dbUser[m.sender].note.length === 0) {
        return m.reply("Kamu belum punya catatan!");
      }

      if (text) {
        if (isNaN(text)) return m.reply("Nomor harus berupa angka!");
        let nom = parseInt(text) - 1;
        if (!dbUser[m.sender].note[nom]) return m.reply("Catatan tidak ditemukan!");
        let note = dbUser[m.sender].note.splice(nom, 1)[0];
        await conn.reply(m.chat, `Sukses menghapus catatan:\n*Title: ${note.title}*`, m);
      } else {
        let txt = "List catatan:\n\n";
        let num = 1;
        for (let note of dbUser[m.sender].note) {
          txt += `${num++}. *${note.title}*\n`;
        }
        txt += "\nKetik: .delnote (nomor)";
        await conn.reply(m.chat, txt, m);
      }
      break;
    }

    case /^(buat(catatan|note)|add(catatan|note))$/i.test(command): {
      let split = text.split("|");
      let title = split[0]?.trim();
      let isi = m.quoted && m.quoted.text ? m.quoted.text : split[1]?.trim();

      if (!title || !isi) {
        return m.reply(
          `*Format salah!*\nContoh: ${usedPrefix + command} Judul Catatan|Isi Catatan\nAtau reply pesan dengan ${usedPrefix + command} Judul`
        );
      }

      if (dbUser[m.sender].note.some((n) => n.title === title)) {
        return m.reply("*[ Judul tidak tersedia! ]*\n\n*Alasan:* Sudah digunakan");
      }

      let newNote = { title, isi };
      dbUser[m.sender].note.push(newNote);
      await conn.sendFile(
        m.chat,
        "https://telegra.ph/file/7989b4e60a9dedfcdbbec.jpg",
        "",
        `*[ Notes Created! ]*\n\nUntuk melihat Note yang sudah dibuat, ketik: *${usedPrefix}listnote*`,
        m
      );
      break;
    }

    default:
      m.reply("Perintah tidak dikenal!");
      break;
  }
};

Tio.help = ["listnote", "hapusnote", "buatnote"];
Tio.tags = ["tools"];
Tio.command = /^(listnote|daftar(catatan|note)|notelist|hapus(note|catatan)|del(ete)?(note|catatan)?|buat(catatan|note)|add(catatan|note))$/i;

export default Tio;

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);