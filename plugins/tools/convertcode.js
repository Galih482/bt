/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

let Tio = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    if (command === 'toesm') {
        if (m.quoted && m.quoted.text) {
            text = m.quoted?.text
        } else if (text) {
            text = text
        } else if (!text || !m.quoted && !m.quoted.text) {
            return conn.reply(m.chat, 'Silakan berikan kode CJS yang ingin dikonversi.', m);
        }

        let esmCode = convertCJS2ESM(text);
        conn.sendMessage(m.chat, {
            text: `${esmCode}`
        }, {
            quoted: m
        });
    } else if (command === 'tocjs') {
        if (m.quoted && m.quoted.text) {
            text = m.quoted?.text
        } else if (text) {
            text = text
        } else if (!text || !m.quoted && !m.quoted.text) {
            return conn.reply(m.chat, 'Silakan berikan kode ESM yang ingin dikonversi.', m);
        }

        let cjsCode = convertESM2CJS(text);
        conn.sendMessage(m.chat, {
            text: `${cjsCode}`
        }, {
            quoted: m
        });
    }
}

function convertCJS2ESM(cjsCode) {
    let esmCode = cjsCode.replace(/const\s+(\w+)\s*=\s*require\((['"])(.*?)\2\);/g, 'import $1 from "$3";');
    esmCode = esmCode.replace(/module\.exports\s*=\s*(.*?);/g, 'export default $1;');
    esmCode = esmCode.replace(/exports\.(\w+)\s*=\s*(.*?);/g, 'export const $1 = $2;');

    return esmCode;
}

function convertESM2CJS(esmCode) {
    let cjsCode = esmCode.replace(/import\s+(\w+)\s+from\s+['"](.+)['"];/g, 'const $1 = require("$2");');
    cjsCode = cjsCode.replace(/export default\s+(.*?);/g, 'module.exports = $1;');
    cjsCode = cjsCode.replace(/export const\s+(\w+)\s*=\s*(.*?);/g, 'exports.$1 = $2;');

    return cjsCode;
}

Tio.help = ['toesm', 'tocjs']
Tio.command = ['toesm', 'tocjs']
Tio.tags = ['tools']

export default Tio;