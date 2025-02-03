import fetch from 'node-fetch';

const Tio = async (m, {
	conn,
	args,
	usedPrefix,
	command
}) => {
  if (command == 'bingchat') {
    	let text;
	if (args.length >= 1) {
		text = args.slice(0).join(" ");
	} else if (m.quoted && m.quoted.text) {
		text = m.quoted.text;
	} else {
		throw 'Input teks atau reply teks!';
	}
    try {
      await m.react('🔍')
      let response = await fetch('https://api.betabotz.eu.org/api/search/bing-chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: text,
            apikey: 'beta-galih'
          })
        })
        .then(res => res.json());

      await conn.reply(m.chat, response.message, m);
    } catch (e) {
      console.log(e);
      throw `*Error:* ${eror}`;
    }
  }
  if (command == 'bingimgv1') {
	let text;
	if (args.length >= 1) {
		text = args.slice(0).join(" ");
	} else if (m.quoted && m.quoted.text) {
		text = m.quoted.text;
	} else {
		throw 'Input teks atau reply teks!';
	}
    try {
      await m.react('🔍')
      let response = await fetch('https://api.betabotz.eu.org/api/search/bing-img', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: text,
            apikey: 'beta-galih'
          })
        })
        .then(res => res.json());

      for (let i = 0; i < 4; i++) {
        let img = response.result[i]
        await sleep(3000)
        await conn.sendFile(m.chat, img, 'bing_img.png', `*PROMPT:* ${text}`, m)
      }
    } catch (error) {
      throw `Error: ${eror}`
    }
  }
}

Tio.tags = ["ai"];
Tio.help = Tio.command = ["bingimgv1", "bingchat"];
Tio.premium = true
export default Tio;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
