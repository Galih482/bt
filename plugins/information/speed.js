/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import speed from 'performance-now'
import { spawn, exec, execSync } from 'child_process'

let Tio = async (m, { conn }) => {
         let timestamp = speed();
         let latensi = speed() - timestamp;
         exec(`neofetch --stdout`, (error, stdout, stderr) => {
          let child = stdout.toString("utf-8");
          let ssd = child.replace(/Memory:/, "Ram:");
          m.reply(`${ssd}乂  *Kecepatan* : ${latensi.toFixed(4)} _ms_`);
            });
}
Tio.help = ['ping']
Tio.tags = ['main']
Tio.command = ['speed']

export default Tio