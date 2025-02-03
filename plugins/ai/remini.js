/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import FormData from "form-data"

async function processing(urlPath, method) {
    return new Promise(async (resolve, reject) => {
        let Methods = ["enhance", "recolor", "dehaze"];
        Methods.includes(method) ? (method = method) : (method = Methods[0]);
        let buffer,
            Form = new FormData(),
            scheme = "https" + "://" + "inferenceengine" + ".vyro" + ".ai/" + method;
        Form.append("model_version", 1, {
            "Content-Transfer-Encoding": "binary",
            contentType: "multipart/form-data; charset=uttf-8",
        });
        Form.append("image", Buffer.from(urlPath), {
            filename: "enhance_image_body.jpg",
            contentType: "image/jpeg",
        });
        Form.submit({
                url: scheme,
                host: "inferenceengine" + ".vyro" + ".ai",
                path: "/" + method,
                protocol: "https:",
                headers: {
                    "User-Agent": "okhttp/4.9.3",
                    Connection: "Keep-Alive",
                    "Accept-Encoding": "gzip",
                },
            },
            function(err, res) {
                if (err) reject();
                let data = [];
                res
                    .on("data", function(chunk, resp) {
                        data.push(chunk);
                    })
                    .on("end", () => {
                        resolve(Buffer.concat(data));
                    });
                res.on("error", (e) => {
                    reject();
                });
            }
        );
    });
}

let Tio = async (m, {
    conn,
    usedPrefix,
    command
}) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || "";
    if (!mime) throw `Fotonya Mana Kak?`;
    if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} tidak support`;

    let img = await q.download?.();
    try {
        const This = await processing(img, "enhance");
        conn.sendFile(m.chat, This, "", "*Result from*:" + command, m).then(_ => {
            const react = {
                react: {
                    text: "✅",
                    key: m.key
                }
            }

        })
    } catch (er) {
        m.react('❎');
    }
};
Tio.help = ["remini"];
Tio.tags = ["ai"];
Tio.limit = true;
Tio.command = ["remini"];
export default Tio;