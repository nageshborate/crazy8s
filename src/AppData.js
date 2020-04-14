class AppData
{
    constructor()
    {
        this.deck =
        [
            "SA", "SK", "SQ", "SJ", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10", 
            "CA", "CK", "CQ", "CJ", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", 
            "HA", "HK", "HQ", "HJ", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10", 
            "DA", "DK", "DQ", "DJ", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10"
        ];

        this.players = ["nagesh", "akansha"];

        this.playerCards = 
        {
            0: [ 2, 15, 20, 25, 35, 38, 42],
            1: [10, 14, 22, 28, 40, 45, 48]
        };

        this.lastPlayedCard = 32;

        this.discardPile = [];

        this.getCardSuit = function(cardIdx)
        {
            return this.deck[cardIdx][0]
        }.bind(this);

        this.getCardValue = function(cardIdx)
        {
            return this.deck[cardIdx][1]
        }.bind(this);

        this.getCard = function(cardIdx)
        {
            return this.deck[cardIdx]
        }.bind(this);

        this.getLastPlayedCard = function()
        {
            return this.deck[this.lastPlayedCard]
        }.bind(this);

        this.addPlayer = function(player)
        {
            if (this.players.indexOf(player) < 0)
                this.players.push(player);
        }.bind(this);

        this.generateDiscardPile = function()
        {
            let discardPile = [];
            for (let idx = 0 ; idx < 52 ; idx++)
            {
                let cardIdx;
                while (true)
                {
                    cardIdx = getRandomIntInclusive(0, 51);
                    if (isNumberAlreadyGenerated(cardIdx, discardPile))
                        continue;
                    else
                        break;
                }
                discardPile.push(cardIdx);
            }

            this.discardPile = discardPile;
        }.bind(this);

        this.generatePlayerCards = function(count = 5)
        {
            return this.discardPile.splice(0, count);
        }.bind(this);

        this.generateLastPlayedCard = function()
        {
            return this.discardPile.shift();
        }.bind(this);

        this.startNewGame = function()
        {
            if (this.players && this.players.length > 0)
            {
                this.generateDiscardPile();
                this.playerCards = {};

                for (let idx = 0 ; idx < this.players.length ; idx++)
                {
                    this.playerCards[idx] = this.generatePlayerCards();
                }

                this.lastPlayedCard = this.generateLastPlayedCard();
            }
        }.bind(this);

        this.getPlayerCardsWithValidity = function(player)
        {
            if (this.players.indexOf(player) >= 0)
            {
                let returnArray = [];
                let lastPlayedCardSuit = this.getCardSuit(this.lastPlayedCard);
                let lastPlayedCardValue = this.getCardValue(this.lastPlayedCard);

                let playerIdx = this.players.indexOf(player);
                let playerCards = this.playerCards[playerIdx];
                for (let idx = 0 ; idx < playerCards.length ; idx++)
                {
                    let playerCardIdx = playerCards[idx];
                    let playerCardSuit = this.getCardSuit(playerCardIdx);
                    let playerCardValue = this.getCardValue(playerCardIdx);
                    let isPlayerCardValue8 = this.getCardValue(playerCardIdx) === '8';

                    returnArray.push(
                    {
                        cardIdx: playerCardIdx,
                        card: this.getCard(playerCardIdx),
                        valid: isPlayerCardValue8 || (lastPlayedCardSuit === playerCardSuit) || (lastPlayedCardValue === playerCardValue) || false;
                    });
                }
                return returnArray;
            }
        }
    }
}

let getRandomIntInclusive = function(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

let isNumberAlreadyGenerated = function(generatedNumber, generatedNumbers)
{
    let index = generatedNumbers.indexOf(generatedNumber);

    return (index >= 0);
};

export default new AppData();