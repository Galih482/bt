import fs from 'fs';
const _fs = fs.promises;

let Tio = async (m, { conn }) => {
  const jsonPath = './system/json/contact.json';
  const json = JSON.parse(await _fs.readFile(jsonPath, 'utf-8')); 
  if (!m.quoted) throw 'Balas/quote media/text yang ingin disimpan';
  try {
    const media = await m.quoted.download();
    const filePath = './tmp/' + Date.now() + '.vcf';
    await _fs.writeFile(filePath, media);

    const data = await _fs.readFile(filePath, 'utf8');
    const phoneNumbers = [];
    const lines = data.split('\n');
    let total = 0;

    lines.forEach(line => {
      if (line.startsWith('TEL')) {
        const phoneNumber = line.split(':')[1];
        if (phoneNumber) {
          phoneNumbers.push(phoneNumber.trim());
        }
      }
    });

    for (let number of phoneNumbers) {
      const cleanedNumber = number.replace(/[+\s-]/g, '');
      let formattedNumber = '';

      if (cleanedNumber.length >= 10) {
        if (cleanedNumber.startsWith('62')) {
          formattedNumber = cleanedNumber;
        } else if (cleanedNumber.startsWith('0')) {
          formattedNumber = cleanedNumber.replace(/^0/, '62');
        }

        if (formattedNumber) {
          const cek = await conn.onWhatsApp(formattedNumber);
          if (cek && cek[0]?.exists && !json.includes(formattedNumber)) {
            json.push(formattedNumber + global.info.jid); 
            total++;
          }
        }
      }
    }

    await _fs.writeFile(jsonPath, JSON.stringify(json, null, 2));

    await m.reply(`Sukses menyimpan *${total}* kontak.`);

    setTimeout(async () => {
      await _fs.unlink(filePath);
    }, 1000);
  } catch (e) {
    console.error(e);
    await m.reply('Terjadi kesalahan saat menyimpan kontak');
  }
};

Tio.help = Tio.command = ['savekontaksw'];
Tio.tags = ['owner'];
Tio.rowner = true;

export default Tio;
