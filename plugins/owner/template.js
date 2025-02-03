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
    usedPrefix,
    command
}) => {

    // Database 
    const menu = global.db.data.settings[conn.user.jid]

    let type = (args[0] || '').toLowerCase()

    // Command 
    switch (type) {
        case 'image':

            menu.image = true
            menu.gif = false
            menu.teks = false
            menu.doc = false
            menu.button = false
            m.reply(`Success change template *Image*`)
            break
        case 'gif':

            menu.image = false
            menu.gif = true
            menu.teks = false
            menu.doc = false
            menu.button = false
            m.reply(`Success change template *Gif*`)
            break
        case 'teks':

            menu.image = false
            menu.gif = false
            menu.teks = true
            menu.doc = false
            menu.button = false
            m.reply(`Success change template *Text*`)
            break
        case 'doc':
        case 'document':

            menu.image = false
            menu.gif = false
            menu.teks = false
            menu.doc = true
            m.reply(`Success change template *Document*`)

            break
        case 'button':

            menu.image = false
            menu.gif = false
            menu.teks = false
            menu.doc = false
            menu.button = true
            m.reply(`Success change template *Button*`)
            break

        default:

            let menus = ['teks', 'document', 'image', 'gif', 'button'];


            let formattedResult = menus
                .map((item, index) => `${index + 1}. ${item}`)
                .join('\n');

            let output = `Template menu \n\n${formattedResult}`;
            m.reply(output)

    }
}
Tio.help = ["image", "gif", "teks", "doc"].map(v => `template ${v}`)
Tio.tags = ['owner']
Tio.command = /^(template)$/i

Tio.group = false
Tio.rowner = true

export default Tio