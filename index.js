/**
          `   ◇───────◇───────◇
                    𝚃𝙸𝚇𝙾 
                    𝚃𝙴𝙰𝙼
            ────┈┈┈┄┄╌╌╌╌┄┄┈┈┈────
              © Tio 6282285357346
**/


import './config.js'
import { fetchLatestBaileysVersion } from '@adiwajshing/baileys'
import cfont from "cfonts";
import { spawn } from 'child_process';
import { createInterface } from "readline";
import { promises as fsPromises } from 'fs';
import {
    join,
    dirname
} from 'path';
import os from 'os';
import fs from 'fs';
import yargs from "yargs";
import chalk from 'chalk';
/**
═───────◇───────═
    ═───────◇───────═
        ═───────◇───────═
    ═───────◇───────═
═───────◇───────═
**/
const {
    say
} = cfont
const currentFilePath = new URL(import.meta.url).pathname;

say(info.figlet, {
    font: "simpleBlock",
    align: "center",
    gradient: ["yellow", "cyan", "red"],
    transitionGradient: 1,
})
say(`By ${global.info.nameOwn}`, {
    font: "tiny",
    align: "center",
    colors: ["white"]
})

const folderPath = './tmp';
if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
    console.log(chalk.green('Folder tmp berhasil dibuat.'));
}

let isRunning = false;
const rl = createInterface(process.stdin, process.stdout)
async function start(file) {
    if (isRunning) return;
    isRunning = true;
    const args = [join(dirname(currentFilePath), file), ...process.argv.slice(2)];
    const p = spawn(process.argv[0], args, {
        stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
    });
    p.on("message", data => {
        console.log(chalk.magenta("[ ✅ Accepted ]", data))
        switch (data) {
            case "reset":
                p.process.kill()
                isRunning = false
                start.apply(this, arguments)
                break
            case "uptime":
                p.send(process.uptime())
                break
        }
    })
    p.on("exit", (_, code) => {
        isRunning = false
        console.error("[❗] Keluar dengan kode :", code)
        if (code !== 0) return start(file)
        watchFile(args[0], () => {
            unwatchFile(args[0])
            start(file)
        })
    })

    let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
    if (!opts["test"])
        if (!rl.listenerCount()) rl.on("line", line => {
            p.emit("message", line.trim())
        })


    const packageJsonPath = join(dirname(currentFilePath), './package.json');
    const pluginsFolder = join(dirname(currentFilePath), 'plugins');
    const totalFoldersAndFiles = await getTotalFoldersAndFiles(pluginsFolder);
    fs.readdir(pluginsFolder, async (err, files) => {
        if (err) {
            console.error(chalk.red(`Folder Plugins Error: ${err}`));
            return;
        }

        try {
            console.log(chalk.bgGreen(chalk.white(`Library Baileys Versi ${(await fetchLatestBaileysVersion()).version} Telah Terinstall`)));
        } catch (e) {
            console.error(chalk.bgRed(chalk.white('Library Baileys Tidak Terinstall')));
        }
    })

    try {
        const packageJsonData = await fsPromises.readFile(packageJsonPath, 'utf-8');
        const packageJsonObj = JSON.parse(packageJsonData);
        const ramInGB = os.totalmem() / (1024 * 1024 * 1024);
        const freeRamInGB = os.freemem() / (1024 * 1024 * 1024);

        console.table({
            "⎔ Dashboard": " Sistem ⎔",
            "Name Bot": packageJsonObj.name,
            "Versi": packageJsonObj.version,
            "Deskripsi": packageJsonObj.description,
            "Os": os.type(),
            "Memori": freeRamInGB.toFixed(2) + ' / ' + ramInGB.toFixed(2),
            "Owner": global.info.numberOwn,
            "Fitur": `${totalFoldersAndFiles.files} Fitur/${totalFoldersAndFiles.folders} Folder`,
            "Creator": `Galihz`
        })
    } catch (err) {
        console.error(chalk.red(`Tidak Bisa Membaca File package.json: ${err}`));
    }

}
function getTotalFoldersAndFiles(folderPath) {
    return new Promise((resolve, reject) => {
        let folders = 0;
        let filesCount = 0;

        const countFilesAndFolders = (currentPath) => {
            try {
                const items = fs.readdirSync(currentPath);
                items.forEach((item) => {
                    const itemPath = join(currentPath, item);
                    const stats = fs.statSync(itemPath);
                    if (stats.isDirectory()) {
                        folders++; 
                        countFilesAndFolders(itemPath); 
                    } else {
                        filesCount++; 
                    }
                });
            } catch (err) {
                reject(err);
            }
        };

        countFilesAndFolders(folderPath);

        resolve({
            folders,
            files: filesCount
        });
    });
}
/**
═───────◇───────═
    ═───────◇───────═
        ═───────◇───────═
    ═───────◇───────═
═───────◇───────═
**/
start('main.js');
