/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

let Tio = m => m

Tio.all = async function(m, {
    isPrems
}) {
    let user = global.db.data.users[m.sender]
    if ((user.money * 1) > 10000000) {
        user.money = 10000000
    } else if ((user.money * 1) < 0) {
        user.money = 0
    }
    if ((user.health * 1) > 100) {
        user.health = 100
    } else if ((user.health * 1) < 0) {
        user.health = 0
    }
    if ((user.exp * 1) > 10000000000) {
        user.exp = 10000000000
    } else if ((user.exp * 1) < 0) {
        user.exp = 0
    }
    if (!isPrems && (user.limit * 1) > 100) {
        m.reply("Maaf limit kamu max 100.\nJika kamu mempunyai limit lebih dari 100 maka akan di reset ke 100.\nUpgrade ke premium untuk menggunakan limit tanpa batas.")
        user.limit = 100
    } else if ((user.limit * 1) < 0) {
        user.limit = 0
    }
    if ((user.bank * 1) > 10000000000) {
        user.bank = 10000000000
    } else if ((user.bank * 1) < 0) {
        user.bank = 0
    }
}
export default Tio