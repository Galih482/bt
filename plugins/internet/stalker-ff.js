/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

let Tio = async (m, { usedPrefix, conn, args, text, command }) => {
    if (!args[0]) {
        return m.reply(await Func.exam(usedPrefix, command, '12345678(id)'));
    }
    await m.react('🔍');

    try {
        const url = `https://api.vreden.web.id/api/ffstalk?id=${args[0]}`;
        const { result } = await Func.fetchJson(url);

        if (!result || !result.account) {
            return m.reply("❌ Data tidak ditemukan atau ID salah.");
        }

        const { account, pet_info, guild, ketua_guild } = result;

        const caption = `
*Free Fire Stalker*

👤 *Username:* ${account.name}
🆔 *User ID:* ${account.id}
🌍 *Region:* ${account.region}
📊 *Level:* ${account.level}
🔥 *XP:* ${account.xp}
👍 *Likes:* ${account.like}
📜 *Bio:* ${account.bio || "Tidak ada"}
🕰 *Akun Dibuat:* ${account.create_time}
🔄 *Terakhir Login:* ${account.last_login}

🏆 *Booyah Pass:* ${account.booyah_pass}
🎖 *Booyah Pass Badge:* ${account.booyah_pass_badge}
⚔ *Evo Access Badge:* ${account.evo_access_badge}
📛 *Equipped Title:* ${account.equipped_title}

⭐ *Honor Score:* ${account.honor_score}
🎯 *BR Points:* ${account.BR_points}
🔫 *CS Points:* ${account.CS_points}

🐾 *Pet Name:* ${pet_info?.name || "Tidak ada"}
📈 *Pet Level:* ${pet_info?.level || "-"}
🔢 *Pet Type:* ${pet_info?.type || "-"}
💡 *Pet XP:* ${pet_info?.xp || "-"}

🏰 *Guild:* ${guild?.name || "Tidak ada"}
🆔 *Guild ID:* ${guild?.id || "-"}
📶 *Guild Level:* ${guild?.level || "-"}
👥 *Anggota:* ${guild?.member || "0"}/${guild?.capacity || "0"}

👑 *Ketua Guild:* ${ketua_guild?.name || "Tidak diketahui"}
🆔 *Ketua Guild ID:* ${ketua_guild?.id || "-"}
📊 *Ketua Level:* ${ketua_guild?.level || "-"}
🔥 *Ketua XP:* ${ketua_guild?.xp || "-"}
👍 *Ketua Likes:* ${ketua_guild?.like || "-"}
🕰 *Ketua Akun Dibuat:* ${ketua_guild?.create_time || "-"}
🔄 *Ketua Terakhir Login:* ${ketua_guild?.last_login || "-"}
🏆 *Ketua BP Badge:* ${ketua_guild?.BP_bagdes || "-"}
🎯 *Ketua BR Points:* ${ketua_guild?.BR_points || "-"}
🔫 *Ketua CS Points:* ${ketua_guild?.CS_points || "-"}
📛 *Ketua Equipped Title:* ${ketua_guild?.equipped_title || "-"}
        `.trim();

        await m.reply(caption);
        m.react('✅');
    } catch (e) {
        console.error(e);
        await m.reply("❌ Terjadi kesalahan saat mengambil data.");
    }
};

Tio.help = Tio.command = ['ffstalk'];
Tio.tags = ['stalker'];
export default Tio;