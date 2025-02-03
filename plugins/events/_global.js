/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import * as fs from 'fs'
import * as fetch from 'node-fetch'
import * as axios from 'axios'
import * as cheerio from "cheerio";

let Tio = m => m
Tio.all = async function(m) {
        global.doc = pickRandom(["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/msword", "application/pdf"]);
        global.fsizedoc = pickRandom([2000, 3000, 2023000, 2024000]);
        // modul
        global.axios = axios.default;
        global.fetch = fetch.default;
        global.cheerio = cheerio
        global.fs = fs.default

        global.verif = {
            key: {
                participant: '13135550002@s.whatsapp.net',
                remoteJid: "13135550002@s.whatsapp.net"
            },
            message: {
                conversation: `${global.info.nameBot} terverifikasi oleh WhatsApp`
            }
        };    
    global.ephemeral = '86400'
    global.adReply = {
        contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                "newsletterJid": "120363183258593542@newsletter",
                "serverMessageId": 103,
                "newsletterName": `⌜ ${global.info.nameBot} ⌟`

            }
        }
    }

}
global.multiplier = 69
global.rpg = {
  emoticon(string) {
    string = string.toLowerCase();
      let emot = {
      agility: '🤸‍♂️',
      arc: '🏹',
      armor: '🥼',
      bank: '🏦',
      bibitanggur: '🍇',
      bibitapel: '🍎',
      bibitjeruk: '🍊',
      bibitmangga: '🥭',
      bibitpisang: '🍌',
      bow: '🏹',
      bull: '🐃',
      cat: '🐈',
      chicken: '🐓',
      common: '📦',
      cow: '🐄',
      crystal: '🔮',
      darkcrystal: '♠️',
      diamond: '💎',
      dog: '🐕',
      dragon: '🐉',
      elephant: '🐘',
      emerald: '💚',
      exp: '✉️',
      fishingrod: '🎣',
      fox: '🦊',
      gems: '🍀',
      giraffe: '🦒',
      gold: '👑',
      health: '❤️',
      horse: '🐎',
      intelligence: '🧠',
      iron: '⛓️',
      keygold: '🔑',
      keyiron: '🗝️',
      knife: '🔪',
      legendary: '🗃️',
      level: '🧬',
      limit: '🌌',
      lion: '🦁',
      magicwand: '⚕️',
      mana: '🪄',
      money: '💵',
      mythic: '🗳️',
      pet: '🎁',
      petFood: '🍖',
      pickaxe: '⛏️',
      pointxp: '📧',
      potion: '🥤',
      rock: '🪨',
      snake: '🐍',
      stamina: '⚡',
      strength: '🦹‍♀️',
      string: '🕸️',
      superior: '💼',
      sword: '⚔️',
      tiger: '🐅',
      trash: '🗑',
      uncommon: '🎁',
      upgrader: '🧰',
      wood: '🪵'
    }
    let results = Object.keys(emot).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string));
    if (!results.length) return '';
    else return emot[results[0][0]];
  }
}

export default Tio

function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
}