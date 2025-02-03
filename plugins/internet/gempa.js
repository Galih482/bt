/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

let Tio = async (m, {
    conn,
    args,
    text,
    usedPrefix,
    command
}) => {
    let type = (args[0] || '').toLowerCase()
    conn.gempa = conn.gempa || {};

    switch (type) {
        case 'update':
            if (args[1] == 'on') {
                conn.gempa['setting'] = true
                m.reply('auto update gempa *ON*')
            } else if (args[1] == 'off') {
                conn.gempa['setting'] = false
                m.reply('auto update gempa *OFF*')
            } else m.reply('swich ON/OFF')
            break
        default:
            try {
                let result = await Func.fetchJson('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json')
                let res = result.Infogempa.gempa
                let txt = `*${res.Wilayah}*\n\n`
                txt += `Tanggal : ${res.Tanggal}\n`
                txt += `Waktu : ${res.Jam}\n`
                txt += `Potensi : *${res.Potensi}*\n\n`
                txt += `Magnitude : ${res.Magnitude}\n`
                txt += `Kedalaman : ${res.Kedalaman}\n`
                txt += `Koordinat : ${res.Coordinates}${res.Dirasakan.length > 3 ? `\nDirasakan : ${res.Dirasakan}` : ''}`
                await conn.sendModify(m.chat, txt, m, {
                    ads: true,
                    title: command,
                    body: '',
                    thumbnailUrl: `https://data.bmkg.go.id/DataMKG/TEWS/${res.Shakemap}`,
                    url: '',
                    largeThumb: true
                });
            } catch (e) {
                console.log(e)
                m.reply(`[!] Fitur Error.`)
            }
    }
}
Tio.before = async (m, {
    conn
}) => {
    conn.gempa = conn.gempa || {};
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    let date = d.toLocaleDateString(locale, {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })

    if (!m.isGroup) return
    if (!conn.gempa['setting']) return;

    let result = await Func.fetchJson('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json')
    let res = result.Infogempa.gempa
    let txt = `*${res.Wilayah}*\n\n`
    txt += `Tanggal : ${res.Tanggal}\n`
    txt += `Waktu : ${res.Jam}\n`
    txt += `Potensi : *${res.Potensi}*\n\n`
    txt += `Magnitude : ${res.Magnitude}\n`
    txt += `Kedalaman : ${res.Kedalaman}\n`
    txt += `Koordinat : ${res.Coordinates}${res.Dirasakan.length > 3 ? `\nDirasakan : ${res.Dirasakan}` : ''}`

    if (new Date - conn.gempa[m.chat] < 86400000) return;
    if (res.Tanggal === date) {

        await conn.sendModify(m.chat, txt, null, {
            ads: true,
            title: 'UPDATE GEMPA',
            body: '',
            thumbnailUrl: `https://data.bmkg.go.id/DataMKG/TEWS/${res.Shakemap}`,
            url: '',
            largeThumb: true
        });

        conn.gempa[m.chat] = new Date() * 1
    }
};

Tio.help = ['gempa']
Tio.tags = ['internet']
Tio.command = /^(gempa)$/i

Tio.limit = true

export default Tio