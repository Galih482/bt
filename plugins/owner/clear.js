/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import fs from 'fs'
import path from 'path'

let Tio = async (m, {command}) => {

switch (command) {
case 'cleartmp':
await conn.reply(m.chat, "Done", m)
const folderPath = './tmp';
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Gagal membaca folder:', err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Gagal menghapus file ${file}:`, err);
      } else {
        console.log(`File ${file} berhasil dihapus.`);
      }
    });
  });
});

    break
    case 'clearsesi':
    const directory = './sessions';
function deleteFilesExceptOne(directory, fileNameToKeep) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error('Terjadi kesalahan:', err);
      return;
    }
    
    files.forEach((file) => {
      const filePath = path.join(directory, file);
      if (file !== fileNameToKeep) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Gagal menghapus file ${file}:`, err);
          } else {
            console.log(`File ${file} berhasil dihapus.`);
          }
        });
      }
    });
  });
}
await deleteFilesExceptOne(directory, 'creds.json');
m.reply('Suskess Clear all sessions ✅')
    break 
  }
}
Tio.help = ['cleartmp','cleartmp']
Tio.tags = ['owner']
Tio.command = /^(clear(tmp|sesi)?)$/i

Tio.rowner = true

export default Tio