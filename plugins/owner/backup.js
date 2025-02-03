/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import fs from 'fs';
import archiver from 'archiver';

let Tio = async (m, { conn, isOwner, command, text }) => {
  
  if (global.conn.user.jid !== conn.user.jid) return;
  
  await m.react('🔓')
  const fake = {
    key: {
      participant: '0@s.whatsapp.net',
      remoteJid: '0@s.whatsapp.net'
    },
    message: { conversation: await Func.style('Backup Script', 5) }
  };

  let backupZip = 'tmp/Tixo.zip';
  const output = fs.createWriteStream(backupZip);
  const archive = archiver('zip', {
    zlib: { level: 9 }
  });

  output.on('close', async function() {
    let cap = 'Proses pengarsipan selesai. ' + await Func.toSize(archive.pointer());
    console.log(cap);
    await conn.sendFile(owner + info.jid, backupZip, backupZip.split('/')[1], cap, fake);
    await m.react('🔐');
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

  archive.finalize();
  setTimeout(async() => {
  await fs.unlinkSync(backupZip);
  }, 1000 * 60)
};

Tio.help = ['backup'];
Tio.tags = ['owner'];
Tio.command = /^(backup)$/i;
Tio.rowner = true;

export default Tio;