class Blackjack {
    decks;
    state = "waiting";
    player = [];
    dealer = [];
    table = {
        player: {
            total: 0,
            cards: [],
        },
        dealer: {
            total: 0,
            cards: [],
        },
        bet: 0,
        payout: 0,
        doubleDowned: false,
    };
    cards;
    endHandlers = [];
    constructor(decks) {
        this.decks = validateDeck(decks);
    }
    placeBet(bet) {
        if (bet <= 0) {
            throw new Error("Anda harus memasang taruhan lebih besar dari 0");
        }
        this.table.bet = bet;
    }
    start() {
        if (this.table.bet <= 0) {
            throw new Error("Anda harus memasang taruhan sebelum memulai permainan");
        }
        this.cards = new Deck(this.decks);
        this.cards.shuffleDeck(2);
        this.player = this.cards.dealCard(2);
        let dealerFirstCard;
        do {
            dealerFirstCard = this.cards.dealCard(1)[0];
        } while (dealerFirstCard.value > 11);
        this.dealer = [dealerFirstCard, ...this.cards.dealCard(1)];
        this.updateTable();
        return this.table;
    }
    hit() {
        if (this.state === "waiting") {
            const newCard = this.cards.dealCard(1)[0];
            this.player.push(newCard);
            this.updateTable();
            const playerSum = sumCards(this.player);
            const dealerSum = sumCards(this.dealer);
            if (playerSum === dealerSum) {
                this.state = "draw";
                this.emitEndEvent();
            }
            else if (playerSum === 21) {
                this.state = "player_blackjack";
                this.emitEndEvent();
            }
            else if (playerSum > 21) {
                this.state = "dealer_win";
                this.emitEndEvent();
            }
            return this.table;
        }
    }
    stand() {
        let dealerSum = sumCards(this.dealer);
        let playerSum = sumCards(this.player);
        if (playerSum <= 21) {
            while (dealerSum < 17) {
                this.dealer.push(...this.cards.dealCard(1));
                dealerSum = sumCards(this.dealer);
                this.updateTable();
            }
        }
        if (playerSum <= 21 && (dealerSum > 21 || dealerSum < playerSum)) {
            if (playerSum === 21) {
                this.state = "player_blackjack";
            }
            else {
                this.state = "player_win";
            }
        }
        else if (dealerSum === playerSum) {
            this.state = "draw";
        }
        else {
            this.state = dealerSum === 21 ? "dealer_blackjack" : "dealer_win";
        }
        this.emitEndEvent();
    }
    doubleDown() {
        if (this.canDoubleDown()) {
            this.table.doubleDowned = true;
            this.player.push(...this.cards.dealCard(1));
            this.updateTable();
            this.stand();
        }
        else {
            throw new Error("Anda hanya dapat menggandakan taruhan pada giliran pertama");
        }
    }
    calculatePayout() {
        if (this.state === "player_blackjack") {
            this.table.payout = this.table.bet * 1.5;
        }
        else if (this.state === "player_win") {
            this.table.payout = this.table.bet;
        }
        else if (this.state === "dealer_win" ||
            this.state === "dealer_blackjack") {
            this.table.payout = 0; // Tidak ada pembayaran jika kalah
        }
        else if (this.state === "draw") {
            this.table.payout = this.table.bet; // Kembali taruhan jika seri
        }
        if (this.table.doubleDowned && this.state !== "draw") {
            this.table.payout *= 2;
        }
        this.table.payout = Math.round(this.table.payout);
    }
    canDoubleDown() {
        return this.state === "waiting" && this.player.length === 2;
    }
    onEnd(handler) {
        this.endHandlers.push(handler);
    }
    emitEndEvent() {
        this.calculatePayout();
        for (let handler of this.endHandlers) {
            handler({
                state: this.state,
                player: formatCards(this.player),
                dealer: formatCards(this.dealer),
                bet: this.table.bet,
                payout: this.table.payout,
            });
        }

        // Mengurangi uang pengguna jika kalah
        if (this.state === "dealer_win" || this.state === "dealer_blackjack") {
            const lossAmount = Math.round(this.table.bet * 0.5); // Mengurangi 50% dari taruhan
            global.db.data.users[this.idPemain].money -= lossAmount;
        } else if (this.state === "player_win" || this.state === "player_blackjack") {
            global.db.data.users[this.idPemain].money += this.table.payout; // Menambahkan pembayaran jika menang
        }
    }
    updateTable() {
        this.table.player = formatCards(this.player);
        this.table.dealer = formatCards(this.dealer);
    }
}

class Deck {
    deck = [];
    dealtCards = [];
    constructor(decks) {
        for (let i = 0; i < decks; i++) {
            this.createDeck();
        }
    }
    createDeck() {
        const card = (suit, value) => {
            let name = value + " of " + suit;
            if (value.toUpperCase().includes("J") ||
                value.toUpperCase().includes("Q") ||
                value.toUpperCase().includes("K"))
                value = "10";
            if (value.toUpperCase().includes("A"))
                value = "11";
            return { name, suit, value: +value };
        };
        const values = [
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "J",
            "Q",
            "K",
            "A",
        ];
        const suits = ["♣️", "♦️", "♠️", "♥️"];
        for (let s = 0; s < suits.length; s++) {
            for (let v = 0; v < values.length; v++) {
                this.deck.push(card(suits[s], values[v]));
            }
        }
    }
    shuffleDeck(amount = 1) {
        for (let i = 0; i < amount; i++) {
            for (let c = this.deck.length - 1; c >= 0; c--) {
                const tempVal = this.deck[c];
                let randomIndex = Math.floor(Math.random() * this.deck.length);
                while (randomIndex === c) {
                    randomIndex = Math.floor(Math.random() * this.deck.length);
                }
                this.deck[c] = this.deck[randomIndex];
                this.deck[randomIndex] = tempVal;
            }
        }
    }
    dealCard(numCards) {
        const cards = [];
        for (let c = 0; c < numCards; c++) {
            const dealtCard = this.deck.shift();
            if (dealtCard) {
                cards.push(dealtCard);
                this.dealtCards.push(dealtCard);
            }
        }
        return cards;
    }
}

function sumCards(cards) {
    let value = 0;
    let numAces = 0;
    for (const card of cards) {
        value += card.value;
        numAces += card.value === 11 ? 1 : 0;
    }
    while (value > 21 && numAces > 0) {
        value -= 10;
    }
    return value;
}

function formatCards(cards) {
    return { total: sumCards(cards), cards };
}

function validateDeck(decks) {
    if (!decks) {
        throw new Error("Sebuah dek harus memiliki jumlah dek");
    }
    if (decks < 1) {
        throw new Error("Sebuah dek harus memiliki setidaknya 1 dek");
    }
    if (decks > 8) {
        throw new Error("Sebuah dek dapat memiliki maksimal 8 dek");
    }
    return decks;
}

const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
});

const templateBlackjackMessage = (usedPrefix, command, conn, m, blackjack) => {
    const { table, state } = blackjack;
    const { bet, dealer, player, payout } = table;
    let message = '';
    const dealerCards = dealer.cards.map(card => `${card.name}`).join(', ');
    const dealerTotal = dealer.total;
    const playerCards = player.cards.map(card => `${card.name}`).join(', ');
    const playerTotal = player.total;

    let hiddenDealerCards = dealer.cards.slice(0, -1).map(card => `${card.name}`).join(', ');
    if (dealer.cards.length > 1) {
        hiddenDealerCards += ', ❓';
    } else {
        hiddenDealerCards += `, ${dealer.cards[0].name}`;
    }
    
    switch (state) {
        case "player_win":
        case "dealer_win":
        case "draw":
        case "player_blackjack":
        case "dealer_blackjack":
            hiddenDealerCards = dealer.cards.map(card => `${card.name}`).join(', ');
            message = `*\`🃏 • B L A C K J A C K •\`*

╭───┈ •
│ *Kartu Anda:*\n│ \`${playerCards}\`
│ *Total Anda:*\n│ \`${playerTotal}\`
├───┈ •
│ *Kartu Dealer:*\n│ \`${dealerCards}\`
│ *Total Dealer:*\n│ \`${dealerTotal > 21 ? 'BUST' : dealerTotal}\`
╰───┈ •

> *\`${(state === "player_win" ? "Anda menang! 🎉" : state === "dealer_win" ? "Dealer menang. 😔" : state === "draw" ? "Seri. 🤝" : state === "player_blackjack" ? "Blackjack! 🥳" : "Dealer mendapatkan Blackjack! 😔").toUpperCase()}\`*\n*Taruhan:*\n- \`\`\`${formatter.format(bet)}\`\`\`\n*Pembayaran:*\n- \`\`\`${formatter.format(payout)}\`\`\`
`;
            global.db.data.users[conn.blackjack[m.chat].idPemain].money += payout;
            delete conn.blackjack[m.chat];
            break;
        default:
            message = `*\`🃏 • B L A C K J A C K •\`*

╭───┈ •
│ *Kartu Anda:*\n│ \`${playerCards}\`
│ *Total Anda:*\n│ \`${playerTotal}\`
├───┈ •
│ *Kartu Dealer:*\n│ \`${hiddenDealerCards}\`
│ *Total Dealer:*\n│ \`${dealerTotal > 21 ? 'BUST' : '❓'}\`
╰───┈ •

*Taruhan:*\n- \`\`\`${formatter.format(bet)}\`\`\`

Ketik *\`${usedPrefix + command} hit\`* untuk menarik kartu.
Ketik *\`${usedPrefix + command} stand\`* untuk mengakhiri giliran Anda.`;
            break;
    }

    // Tambahkan informasi pengurangan 50% jika kalah
    if (state === "dealer_win" || state === "dealer_blackjack") {
        message += `\n\n*Anda kalah! Anda kehilangan 50% dari taruhan Anda: ${formatter.format(bet * 0.5)}.*`;
    }

    return message;
}

const handler = async (m, { conn, usedPrefix, command, args }) => {
    conn.blackjack = conn.blackjack || {};
    let [aksi, argumen] = args;

    try {
        switch (aksi) {
            case 'end':
                if (conn.blackjack[m.chat]?.idPemain === m.sender) {
                    delete conn.blackjack[m.chat];
                    await conn.reply(m.chat, '*Anda keluar dari sesi blackjack.* 👋', m);
                } else {
                    await conn.reply(m.chat, '*Tidak ada sesi blackjack yang sedang berlangsung atau Anda bukan pemainnya.*', m);
                }
                break;

            case 'start':
                if (conn.blackjack[m.chat]) {
                    await conn.reply(m.chat, `*Sesi blackjack sudah berlangsung.* Gunakan *${usedPrefix + command} end* untuk keluar dari sesi.`, m);
                } else {
                    conn.blackjack[m.chat] = new Blackjack(1);
                    conn.blackjack[m.chat].idPemain = m.sender;

                    // Jika argumen adalah "all", gunakan semua uang yang dimiliki pengguna
                    if (argumen === "all") {
                        const totalMoney = db.data.users[m.sender].money;
                        if (totalMoney <= 0) {
                            await conn.reply(m.chat, '*Anda tidak memiliki uang untuk dipertaruhkan.*', m);
                            break;
                        }
                        conn.blackjack[m.chat].placeBet(totalMoney);
                    } else {
                        // Ambil argumen sebagai jumlah taruhan
                        if (!argumen) {
                            await conn.reply(m.chat, '*Anda harus memasukkan jumlah taruhan atau "all".*', m);
                            break;
                        }

                        let betAmount = parseInt(argumen);

                        // Validasi jumlah taruhan
                        if (isNaN(betAmount) || betAmount <= 0) {
                            await conn.reply(m.chat, '*Jumlah taruhan harus lebih besar dari 0.*', m);
                            break;
                        }

                        // Cek apakah pengguna memiliki cukup uang
                        if (db.data.users[m.sender].money < betAmount) {
                            await conn.reply(m.chat, '*Uang kamu kurang untuk memasang taruhan ini.*', m);
                            break;
                        }

                        conn.blackjack[m.chat].placeBet(betAmount);
                    }

                    conn.blackjack[m.chat].start();
                    const table = conn.blackjack[m.chat];
                    const pesanStart = templateBlackjackMessage(usedPrefix, command, conn, m, table);
                    await conn.reply(m.chat, pesanStart, m);
                }
                break;

            case 'hit':
                if (!conn.blackjack[m.chat] || conn.blackjack[m.chat]?.idPemain !== m.sender) {
                    await conn.reply(m.chat, '*Anda tidak sedang bermain blackjack atau bukan pemainnya.*', m);
                    break;
                }
                conn.blackjack[m.chat].hit();
                const tableHit = conn.blackjack[m.chat];
                const pesanHit = templateBlackjackMessage(usedPrefix, command, conn, m, tableHit);
                await conn.reply(m.chat, pesanHit, m);
                break;

            case 'stand':
                if (!conn.blackjack[m.chat] || conn.blackjack[m.chat]?.idPemain !== m.sender) {
                    await conn.reply(m.chat, '*Anda tidak sedang bermain blackjack atau bukan pemainnya.*', m);
                    break;
                }
                conn.blackjack[m.chat].stand();
                const tableStand = conn.blackjack[m.chat];
                const pesanStand = templateBlackjackMessage(usedPrefix, command, conn, m, tableStand);
                await conn.reply(m.chat, pesanStand, m);
                break;

            case 'double':
                if (!conn.blackjack[m.chat] || conn.blackjack[m.chat]?.idPemain !== m.sender) {
                    await conn.reply(m.chat, '*Anda tidak sedang bermain blackjack atau bukan pemainnya.*', m);
                    break;
                }
                conn.blackjack[m.chat].doubleDown();
                const tableDouble = conn.blackjack[m.chat];
                const pesanDouble = templateBlackjackMessage(usedPrefix, command, conn, m, tableDouble);
                await conn.reply(m.chat, pesanDouble, m);
                break;

            default:
                await conn.reply(m.chat, `*Perintah tidak valid.*\nGunakan *${usedPrefix + command} start* untuk memulai sesi blackjack.`, m);
                break;
        }
    } catch (err) {
        console.error(err);
        await conn.reply(m.chat, '*Terjadi kesalahan saat memproses perintah.*', m);
    }
}

handler.command = /^(blackjack|bj)$/i;
handler.tags = ['game'];
handler.help = ['blackjack'];

export default handler;