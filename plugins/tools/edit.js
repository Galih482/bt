/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = async (m, {
    conn,
    text,
    command,
    isBotAdmin
}) => {
    if (!m.quoted) throw "Reply pesan yang ingin diedit"
    if (!text) throw "Tidak ada teks"
    if (!m.quoted.isBaileys) throw "Pesan tidak dikirim oleh bot!"

    try {
        await conn.sendMessage(m.chat, {
            text: text,
            edit: m.quoted.vM.key
        })
    } catch (e) {
        try {
            let edit = m.quoted.sender ? m.message.extendedTextMessage.contextInfo.participant : m.key.participant
            let bang = m.quoted.id ? m.message.extendedTextMessage.contextInfo.stanzaId : m.key.id
            await conn.sendMessage(m.chat, {
                text: text,
                edit: {
                    remoteJid: m.chat,
                    fromMe: false,
                    id: bang,
                    participant: edit
                }
            })

        } catch (e) {
            try {
                await conn.relayMessage(m.chat, {
                    protocolMessage: {
                        key: m.quoted.vM.key,
                        type: 14,
                        editedMessage: {
                            conversation: text
                        }
                    }
                }, {})

            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
Tio.help = ["edit teks ( Reply Pesan )"]
Tio.tags = ["main"]
Tio.command = ["edit"]
Tio.premium = true

export default Tio

function checkTrue(input) {
    return input === false;
}