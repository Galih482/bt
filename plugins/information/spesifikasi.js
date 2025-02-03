/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import os from 'os';

let Tio = async (m, { conn }) => {
  const cpus = os.cpus();
  const totalMemory = (os.totalmem() / 1024 ** 3).toFixed(2) + ' GB';
  const freeMemory = (os.freemem() / 1024 ** 3).toFixed(2) + ' GB';
  const platform = os.platform();
  const arch = os.arch();
  const uptime = (os.uptime() / 3600).toFixed(2) + ' hours';
  const hostname = os.hostname();

  const cpuInfo = cpus.map((cpu, index) => `CPU ${index + 1}: ${cpu.model} (${cpu.speed} MHz)`).join('\n');

  const response = `*VPS Specifications:*

*Hostname:* ${hostname}
*Platform:* ${platform}
*Architecture:* ${arch}
*Uptime:* ${uptime}

*Memory:*
  Total: ${totalMemory}
  Free: ${freeMemory}

*CPU Info:*
${cpuInfo}`;

  conn.reply(m.chat, response, m);
};

Tio.help = ['speck'];
Tio.tags = ['info'];
Tio.command = /^(spe(c)?k)$/i
export default Tio;