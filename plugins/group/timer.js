/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, {
    conn,
    text,
    args,
    command,
    usedPrefix
}) => {

    switch (command) {
        case 'closetime':
            if (!m.isGroup) return m.reply(mess.group)
            if (args[1] == 'detik') {
                var timer = args[0] * `1000`
            } else if (args[1] == 'menit') {
                var timer = args[0] * `60000`
            } else if (args[1] == 'jam') {
                var timer = args[0] * `3600000`
            } else if (args[1] == 'hari') {
                var timer = args[0] * `86400000`
            } else {
                return m.reply(`[❗] invalid command\n/opentime 10 detik`)
            }
            m.reply(`Close time ${text} dimulai dari sekarang`)
            setTimeout(() => {
                var nomor = m.participant

                const close = `📢 *Grup telah ditutup secara otomatis, hanya admin yang dapat mengirim pesan digrup*`
                conn.groupSettingUpdate(m.chat, 'announcement')
                m.reply(close)
            }, timer)

            break
        case 'opentime':
            if (!m.isGroup) return m.reply(mess.group)
            if (args[1] == 'detik') {
                var timer = args[0] * `1000`
            } else if (args[1] == 'menit') {
                var timer = args[0] * `60000`
            } else if (args[1] == 'jam') {
                var timer = args[0] * `3600000`
            } else if (args[1] == 'hari') {
                var timer = args[0] * `86400000`
            } else {
                return m.reply(`[❗] invalid command\n/opentime 10 detik`)
            }
            m.reply(`Open time ${text} dimulai dari sekarang`)
            setTimeout(() => {
                var nomor = m.participant
                const open = `📢 *Grup telah dibuka secara otomatis setelah melakukan penutupan grup, semua peserta dapat mengirim pesan digrup*`
                conn.groupSettingUpdate(m.chat, 'not_announcement')
                m.reply(open)
            }, timer)
    }
}

Tio.help = Tio.command = ["closetime", "opentime"]
Tio.tags = ['group']
Tio.group = true
Tio.admin = true
Tio.botAdmin = true

export default Tio