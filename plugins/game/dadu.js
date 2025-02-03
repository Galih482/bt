/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import { createSticker } from "wa-sticker-formatter"
let handler = async (m, { conn }) => {
let diceImage = rollDice()
let stiker = await createSticker(diceImage, { pack: info.packname, author: info.author })
            await conn.sendFile(m.chat, stiker, "dadu.webp", "", m)
}
handler.help = ["dadu"]
handler.tags = ["game"]
handler.command = ["dadu"] 
export default handler

function rollDice() {
  return "https://www.random.org/dice/dice" + (Math.floor(Math.random() * 6) + 1) + ".png"
}