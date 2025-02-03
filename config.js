import {
    watchFile,
    unwatchFile
} from 'fs';
import chalk from 'chalk';
import {
    fileURLToPath
} from 'url';
import * as functions from './system/function.js';
/**
═───────◇───────═
 ═───────◇───────═
═───────◇───────═
**/
global.owner = '6282137800396' // just one number 😑
global.lann = 'beta-galih' 
global.end = 'SRA-GGCOLI'
// ═───────◇───────═
global.Func = functions;
// ═───────◇───────═
global.setting = {
    cTmp: true,
    fakeReply: true,
    typing: false,
    online: false,
    resetLimit: false
};
// ═───────◇───────═
global.limit = 50;
global.PPN = 1500;
// ═───────◇───────═
global.config = {
    sessions: 'sessions',
    database: 'system/database/database.json',
    sound: false,
    idGrup: '-',
    key: '@Tixo-team' // jangan diubah
};
// ═───────◇───────═
global.info = {
    numberBot: '-',
    pairingNumber: '-',
    figlet: 'Tixo', // buat tampilan log start
    nameOwn: 'Galihz',
    numberOwn: global.owner,
    packname: 'sticker by ',
    author: 'Galihz',
    nameBot: 'Glasly',
    wm: '©Glasly-AI',
    stickpack: 'Whatsapp',
    stickauth: 'Glasly-AI',
    jid: '@s.whatsapp.net'
};
// ═───────◇───────═
global.media = {
    thumbnail: 'https://img101.pixhost.to/images/100/546830181_test.jpg',
    gif: 'https://telegra.ph/file/ca2d038b71ff86e2c70d3.mp4',
    docThumbnail: 'https://telegra.ph/file/e601537d315cbc69b856b.jpg', // size harus kecil
    sound: 'https://files.catbox.moe/atzbj9.opus',
    sistem: {
        akses: "./system/media/akses.jpg",
        register: "./system/media/register.jpg",
        unreg: "./system/media/unreg.jpg"
    },
    avatar: 'https://i.ibb.co/3Fh9V6p/avatar-contact.png'
};
// ═───────◇───────═
global.url = {
    sig: 'https://instagram.com/glihz_x22',
    sgh: 'https://wa.me/6282137800396',
    sgc: 'https://chat.whatsapp.com/JxYRvCww1O89abXlETkLFA'
};
// ═───────◇───────═
global.payment = {
    saweria: 'https://wa.me/6282137800396',
    qris: 'https://wa.me/6282137800396',
    danaUrl: 'https://wa.me/6282137800396',
    dana: 'https://wa.me/6282137800396'
};
// ═───────◇───────═
global.msg = {
    wait: '😺 ```Searching```',
    error: '😿 ```Upss.. sepertinya ada kesalahan dalam memproses.```'
};
// ═───────◇───────═
global.APIs = {
    Tixo: "https://site.tioxy.xyz",
    lann: "https://api.betabotz.eu.org"
};
// ═───────◇───────═
global.cpanel = {
    plta: '-',
    pltc: '-',
    domain: '-',
    egg: 1
};
// ═───────◇───────═
global.APIKeys = {
    hf: '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',
    groq: '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',
    elevenlabs: '-',
    paydisini: '-',
    cloudFlare: {
        zone: '-',
        token: '-'
    },
    nsfw: {
        user: '-',
        secret: '-'
    },
    prodia: '62612488-cd47-44d7-8857-865ea607033a',
    Tixo: "Tio",
    lann: "beta-galih",
    Bing: '1ZyVeTxAYvnihvLoVH5ACggwZ6Fe0YSzKTKtwHa2DVRa-tjZmjHMpBhIaNyCWtS7HzYUEKSpQ_YXaseKxZXGiw8nZpKSKQNeoL9LHpzfaNuwRSgDGAff0TFsLaNSbt1n8qGoJ8Fsc-ilkEdEn0CtAKRvEv_wdF1LfNUMStJW_BO3zTnZ9l-jjppvSwcyOydJRfFFwViAIzHKadQCCXRD0ng; WLS=C=67005ff1395a5358&N=',
    atlantic: '-' // https://atlantich2h.com
};
// ═───────◇───────═
global.smm = {
    litensi: {
        id: '-', // https://litensi.id
        api_key: '-'
    },
    lapak: {
        api_id: '-', // https://panel.lapaksosmed.com
        api_key: '-'
    },
    maupedia: {
        key: '-', // https://maupedia.com/
        sign: '-',
        secret: '-'
    }
};

global.Orkut = {
    id: '-',
    pin: '-',
    password: "-",
    apikey: '-',
    qr: '00020101021126670016COM.NOBUBANK.WWW01189360050300000879140214607467751228530303UMI51440014ID.CO.QRIS.WWW0215ID20243511191670303UMI5204541153033605802ID5923PAMBUDI STORE OK20654666009SIJUNJUNG61052751162070703A01630498D3'
};
/**
═───────◇───────═
 ═───────◇───────═
═───────◇───────═
**/
let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
    unwatchFile(file)
    console.log(chalk.redBright("Update 'config.js'"))
    import(`${file}?update=${Date.now()}`)
})