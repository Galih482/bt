/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import axios from 'axios';

let Tio = async (m, { conn, args, text, usedPrefix, command }) => {
  let teks = m.quoted ? m.quoted.text : text;
  let idd = args[0] ? args[0] : 'id_001';
  let id = text.split('|')[0];
  let tekss = teks.split('|')[1];

  let input = `[!] *Invalid input*

*Usage Examples:*
1. ${usedPrefix + command} id|text 
2. ${usedPrefix + command} en_us_001|hello band move 

*Note:*
- Male: cowo
- Female: cewe

*Voice ID List:*

*English (US)*
- id: 'en_us_001', •> Female 
- id: 'en_us_006', •> Male 1 
- id: 'en_us_007', •> Male 2 
- id: 'en_us_009', •> Male 3 
- id: 'en_us_010', •> Male 4 

*English (UK)*
- id: 'en_uk_001', •> Male 1 
- id: 'en_uk_003', •> Male 2 

*English (AU)*
- id: 'en_au_001', •> Female 
- id: 'en_au_002', •> Male 

*French*
- id: 'fr_001', •> Male 1 
- id: 'fr_002', •> Male 2 

*German*
- id: 'de_001', •> Female 
- id: 'de_002', •> Male 

*Spanish*
- id: 'es_002', •> Male 

*Spanish (MX)*
- id: 'es_mx_002', •> Male 1 
- id: 'es_male_m3', •> Male 2 
- id: 'es_female_f6', •> Female 1 
- id: 'es_female_fp1', •> Female 2 
- id: 'es_mx_female_supermom', •> Female 3 

*Transformers*
- id: 'es_mx_male_transformer', •> Optimus Prime (Transformers) 

*Portuguese*
- id: 'br_003', •> Female 2 
- id: 'br_004', •> Female 3 
- id: 'br_005', •> Male 

*Indonesian*
- id: 'id_001', •> Female 

*Japanese*
- id: 'jp_001', •> Female 1 
- id: 'jp_003', •> Female 2 
- id: 'jp_005', •> Female 3 
- id: 'jp_006', •> Male 

*Korean*
- id: 'kr_002', •> Male 1 
- id: 'kr_004', •> Male 2 
- id: 'kr_003', •> Female 

*Characters*
- id: 'en_us_ghostface', •> Ghostface (Scream) 
- id: 'en_us_chewbacca', •> Chewbacca (Star Wars) 
- id: 'en_us_c3po', •> C3PO (Star Wars) 
- id: 'en_us_stitch', •> Stitch (Lilo & Stitch) 
- id: 'en_us_stormtrooper', •> Stormtrooper (Star Wars) 
- id: 'en_us_rocket', •> Rocket (Guardians of the Galaxy) 

*Singing Voices*
- id: 'en_female_f08_salut_damour', •> Alto 
- id: 'en_male_m03_lobby', •> Tenor 
- id: 'en_male_m03_sunshine_soon', •> Sunshine Soon 
- id: 'en_female_f08_warmy_breeze', •> Warmy Breeze 
- id: 'en_female_ht_f08_glorious', •> Glorious 
- id: 'en_male_sing_funny_it_goes_up', •> It Goes Up 
- id: 'en_male_m2_xhxs_m03_silly', •> Chipmunk 
- id: 'en_female_ht_f08_wonderful_world', •> Dramatic 
`;

  if (!tekss) return m.reply(input);
  if (!id) return m.reply(input);

  const { data } = await axios.post("https://tiktok-tts.weilnet.workers.dev/api/generation", {
    "text": tekss,
    "voice": id
  });
  conn.sendMessage(m.chat, { audio: Buffer.from(data.data, "base64"), mimetype: "audio/mp4" }, { quoted: m });
};

Tio.help = ['ttsv2'];
Tio.tags = ['tools'];
Tio.command = /^(ttsv2)$/i;
Tio.limit = true;
Tio.premium = true;

export default Tio;