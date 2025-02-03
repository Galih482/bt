/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import fetch from "node-fetch"
import fs from "fs"

let Tio = async (m, {
    conn,
    isOwner,
    usedPrefix,
    command,
    args
}) => {
    let query = "Input Code:\n.carbon console.log('hello world ')"
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw query
    
    await m.reply(msg.wait)
    CarbonifyV1(text)
  .then((result) => {
    return conn.sendFile(m.chat, result, "", "*V1 by:*\n" + m.name, m);
  })
  .catch(() => {
    return CarbonifyV2(text)
      .then((result) => {
        return conn.sendFile(m.chat, result, "", "*V2 by:*\n" + m.name, m);
      })
      .catch((error) => {
        m.reply(msg.error);
      });
  });
    
}
Tio.help = ["carbon"]
Tio.tags = ["maker"]
Tio.command = /^(carbon(ify)?)$/i
export default Tio

async function CarbonifyV1(input) {
    let Blobs = await fetch("https://carbonara.solopov.dev/api/cook", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "code": input
            })
        })
        .then(response => response.blob())
    let arrayBuffer = await Blobs.arrayBuffer();
    let buffer = Buffer.from(arrayBuffer);
    return buffer
}

async function CarbonifyV2(input) {
    let Blobs = await fetch("https://carbon-api.vercel.app/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "code": input
            })
        })
        .then(response => response.blob())
    let arrayBuffer = await Blobs.arrayBuffer();
    let buffer = Buffer.from(arrayBuffer);
    return buffer
}