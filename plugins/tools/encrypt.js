/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import fs from 'fs';
import jsobfus from 'javascript-obfuscator';

let Tio = async (m, { text }) => {
    let inputText;

    if (m.quoted && m.quoted.text) {
        inputText = m.quoted.text;
    } else if (text) {
        inputText = text;
    } else if (m.quoted && m.quoted.mimetype) {

        let fileBuffer = await m.quoted.download();
        if (!fileBuffer) throw 'Gagal mengunduh file, coba lagi!';
        inputText = fileBuffer.toString(); 
    } else {
        throw 'Balas dengan teks, kirim teks langsung, atau reply file!';
    }

    try {
        const obfuscatedResult = await obfuscate(inputText);
        const resultFilePath = './tmp/result_enc.js';

        await fs.writeFileSync(resultFilePath, obfuscatedResult);

        m.reply(obfuscatedResult);
        await conn.sendMessage(
            m.chat,
            {
                document: await fs.readFileSync(resultFilePath),
                mimetype: 'application/javascript',
                fileName: 'result_enc.js',
            },
            { quoted: m }
        );

        fs.unlinkSync(resultFilePath);
    } catch (e) {
        throw `Error saat memproses obfuscasi: ${e.message}`;
    }
};

Tio.help = ['encrypt'];
Tio.tags = ['tools'];
Tio.command = /^(enc(rypt)?)$/i;
Tio.register = true;
Tio.limit = true;

export default Tio;

/**
 * Fungsi Obfuscasi
 * @param {string} code - Kode JavaScript yang akan diobfuscate
 * @returns {Promise<string>} - Kode yang telah diobfuscasi
 */
async function obfuscate(code) {
    return new Promise((resolve, reject) => {
        try {
            const obfuscationResult = jsobfus.obfuscate(code, {
                compact: true,
                controlFlowFlattening: true,
                controlFlowFlatteningThreshold: 1,
                deadCodeInjection: true,
                deadCodeInjectionThreshold: 0.4,
                numbersToExpressions: true,
                simplify: true,
                stringArray: true,
                stringArrayEncoding: ['rc4', 'base64'],
                stringArrayIndexShift: true,
                stringArrayShuffle: true,
                stringArrayThreshold: 1,
                splitStrings: true,
                splitStringsChunkLength: 5,
                transformObjectKeys: true,
                unicodeEscapeSequence: true,
            });
            resolve(obfuscationResult.getObfuscatedCode());
        } catch (error) {
            reject(error);
        }
    });
}