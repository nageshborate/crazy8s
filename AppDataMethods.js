exports.getAppDataMethods = function(AppData)
{
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

    this.getCardSuit = function(cardIdx)
    {
        return this.deck[cardIdx][0]
    }.bind(AppData);

    this.getCardValue = function(cardIdx)
    {
        return this.deck[cardIdx][1]
    }.bind(AppData);

    this.getCard = function(cardIdx)
    {
        return this.deck[cardIdx]
    }.bind(AppData);

    this.getLastPlayedCard = function()
    {
        return this.deck[this.lastPlayedCard]
    }.bind(AppData);

    this.addPlayer = function(player)
    {
        if (this.players.indexOf(player) < 0)
            this.players.push(player);

        return this;
    }.bind(AppData);

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
    }.bind(AppData);

    this.generatePlayerCards = function(count = 5)
    {
        return this.discardPile.splice(0, count);
    }.bind(AppData);

    this.generateLastPlayedCard = function()
    {
        return this.discardPile.shift();
    }.bind(AppData);

    this.startNewGame = function()
    {
        let { methods, data} = this;

        if (data.players && data.players.length > 0)
        {
            methods.generateDiscardPile();
            data.playerCards = {};

            for (let idx = 0 ; idx < data.players.length ; idx++)
            {
                data.playerCards[idx] = methods.generatePlayerCards();
            }

            data.lastPlayedCard = methods.generateLastPlayedCard();
        }

        return data;
    }.bind({ methods: this, data: AppData });

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
                    valid: isPlayerCardValue8 || (lastPlayedCardSuit === playerCardSuit) || (lastPlayedCardValue === playerCardValue) || false
                });
            }
            return returnArray;
        }
    }.bind(AppData);

    return this;
};