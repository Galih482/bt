let handler = async (m, { conn, usedPrefix, text, args, command }) => {
  let monsters = [
    { area: 1, name: "Goblin", description: "Makhluk humanoid kecil berwarna hijau dengan senyum licik." },
    { area: 1, name: "Slime", description: "Lumpur kental yang bergerak perlahan, tampak tidak berbahaya." },
    { area: 1, name: "Wolf", description: "Predator lapar yang mengintai di hutan." },
    { area: 2, name: "Nymph", description: "Makhluk ajaib dari hutan yang mampu mengendalikan alam." },
    { area: 2, name: "Skeleton", description: "Prajurit undead yang terbangun oleh sihir gelap." },
    { area: 3, name: "Baby Demon", description: "Demon kecil yang lincah, tidak bisa dianggap remeh." },
    { area: 4, name: "Witch", description: "Seorang penyihir kuat yang bisa mengeluarkan mantra menghancurkan." },
    { area: 5, name: "Giant Scorpion", description: "Scorpion raksasa dengan sengat beracun." },
    { area: 6, name: "Sorcerer", description: "Penyihir jahat dengan sihir yang bisa merubah jalannya pertempuran." },
    { area: 7, name: "Cecaelia", description: "Makhluk laut, setengah gurita, setengah wanita yang tinggal di kedalaman samudra." },
    { area: 8, name: "Giant Crocodile", description: "Reptil raksasa dengan rahang yang bisa menghancurkan baja." },
    { area: 9, name: "Killer Robot", description: "Automaton canggih dengan laser mematikan." },
    { area: 10, name: "Dullahan", description: "Kuda tanpa kepala, pembawa petaka." },
    { area: 11, name: "Baby Dragon", description: "Naga kecil yang berapi-api, siap membuktikan dirinya." },
    { area: 12, name: "Not so young Dragon", description: "Naga muda yang masih banyak belajar." },
    { area: 13, name: "Teen Dragon", description: "Naga remaja yang penuh semangat dan kemarahan." },
  ];

  let player = global.db.data.users[m.sender];
  let pengirim = m.sender.split("@")[0];
  let __timers = new Date() - global.db.data.users[m.sender].lasthunt;
  let _timers = 60000 - __timers;  // Cooldown hanya 1 menit (60000 ms)
  let timers = clockString(_timers);

  let area_monsters = monsters[Math.floor(Math.random() * monsters.length)];
  let monster = area_monsters.name;
  let monsterName = monster.toUpperCase();
  let description = area_monsters.description;

  // Event Khusus (Serangan Mendadak, Peti Harta Karun, dll)
  let specialEvent = Math.random() < 0.1;  // 10% kemungkinan untuk event khusus
  let specialEventMessage = '';
  if (specialEvent) {
    let eventType = Math.random() < 0.5 ? 'Ambush' : 'Treasure';
    if (eventType === 'Ambush') {
      specialEventMessage = `⚠️ *SERANGAN MENDADAK!* Sekelompok monster mengepungmu! Bertarunglah untuk bertahan!`;
    } else if (eventType === 'Treasure') {
      let treasureAmount = Math.floor(Math.random() * 5000) + 1000;
      specialEventMessage = `🎉 *HARTA KARUN DITEMUKAN!* Kamu menemukan peti tersembunyi dengan ${new Intl.NumberFormat().format(treasureAmount)} uang di dalamnya!`;
      player.money += treasureAmount;  // Menambahkan harta ke uang pemain
    }
  }

  if (__timers > 60000) {  // Cek cooldown berburu (1 menit)
    let coins = Math.floor(Math.random() * 100000);
    let exp = Math.floor(Math.random() * 10000);
    let healing = Math.floor(Math.random() * 100);
    let criticalHit = Math.random() < 0.1;  // 10% kemungkinan serangan kritis
    let rareItem = Math.random() < 0.05;  // 5% kemungkinan menemukan item langka
    let poisonEffect = Math.random() < 0.1;  // 10% kemungkinan terkena efek keracunan
    let playerStatusEffect = poisonEffect ? 'Keracunan' : '';

    player.health -= healing;
    player.lasthunt = new Date() * 1;

    if (criticalHit) {
      exp *= 2;  // XP ganda untuk serangan kritis
      coins *= 2;  // Uang ganda untuk serangan kritis
    }

    if (rareItem) {
      let rareItemName = "Permata Mistis";
      let rareItemReward = Math.floor(Math.random() * 5000) + 1000;
      coins += rareItemReward;
      exp += rareItemReward;
      description += `\n🎁 Kamu menemukan item langka: *${rareItemName}* yang bernilai ${rareItemReward} uang dan XP!`;
    }

    if (player.health < 0) {
      let msg = `*@${pengirim}* Kamu terbunuh oleh *${monsterName}*! \n\n${description}`;
      if (player.level > 0) {
        player.level -= 1;
        player.sword = Math.max(0, player.sword - 5);
        player.exp = Math.max(0, player.exp - exp);
        msg += `\n⚠️ Level turun -1, Sword -5, dan XP berkurang!`;
      }
      player.health = 100;
      await conn.reply(m.chat, msg, m, { mentions: conn.parseMention(msg) });
      return;
    }

    player.money += coins;
    player.exp += exp;
    global.db.data.users[m.sender].tiketcoin += 1;

    let pesan = `🎯 *Berburu Berhasil*  
👤 *@${pengirim}* Kamu mengalahkan *${monsterName}*!
🦸 *Deskripsi:* ${description}  
${specialEventMessage}
🎁 *Hadiah:*  
💰 ${new Intl.NumberFormat().format(coins)} Uang  
⭐ ${new Intl.NumberFormat().format(exp)} XP  
❤️ -${healing} Kesehatan, Sisa Kesehatan: ${player.health}

🎟 +1 Tiketcoin`;

    if (playerStatusEffect) {
      pesan += `\n💀 PERINGATAN: Kamu terkena *Keracunan*! Kesehatanmu akan berkurang sedikit demi sedikit.`;
    }
    
    await conn.reply(m.chat, pesan, m, { mentions: conn.parseMention(pesan) });
  } else throw `⏳ Silakan tunggu ${timers} sebelum berburu lagi!`;
};

handler.help = ['hunter'];
handler.tags = ['game'];
handler.command = /^hunter/i;
handler.limit = true;
handler.group = true;
handler.fail = null;

export default handler;

function clockString(ms) {
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return `\n${m} *Menit* ${s} *Detik*`;
}
