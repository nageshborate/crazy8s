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
                data.playerCards[idx].sort();
            }

            data.lastPlayedCard = methods.generateLastPlayedCard();
        }

        return data;
    }.bind({ methods: this, data: AppData });

    this.getPlayerCardsWithValidity = function(player)
    {
        let { methods, data} = this;
        let returnArray = [];

        if (data.players.indexOf(player) >= 0)
        {
            let lastPlayedCardSuit = methods.getCardSuit(data.lastPlayedCard);
            let lastPlayedCardValue = methods.getCardValue(data.lastPlayedCard);

            let playerIdx = data.players.indexOf(player);
            let playerCards = data.playerCards[playerIdx];
            for (let idx = 0 ; idx < playerCards.length ; idx++)
            {
                let playerCardIdx = playerCards[idx];
                let playerCardSuit = methods.getCardSuit(playerCardIdx);
                let playerCardValue = methods.getCardValue(playerCardIdx);
                let isPlayerCardValue8 = methods.getCardValue(playerCardIdx) === '8';

                if (data.changeSuit)
                {
                    returnArray.push(
                    {
                        cardIdx: playerCardIdx,
                        card: methods.getCard(playerCardIdx),
                        valid: isPlayerCardValue8 || (data.changeSuit === playerCardSuit) || false
                    });
                }
                else
                {
                    returnArray.push(
                    {
                        cardIdx: playerCardIdx,
                        card: methods.getCard(playerCardIdx),
                        valid: isPlayerCardValue8 || (lastPlayedCardSuit === playerCardSuit) || (lastPlayedCardValue === playerCardValue) || false
                    });
                }
            }
        }
        return returnArray;
    }.bind({ methods: this, data: AppData });

    this.isPlayerTurn = function(player)
    {
        if (this.currentTurn != undefined && this.players && this.players.length > 0)
        {
            let playerNumber = this.players.indexOf(player);
            if (playerNumber >= 0)
            {
                return playerNumber === this.currentTurn;
            }
        }
        return false;
    }.bind(AppData);

    this.changeTurns = function()
    {
        if (this.currentTurn && this.players && this.players.length > 0)
        {
            this.currentTurn ++;
            if (this.currentTurn >= this.players.length)
                this.currentTurn = 0;
        }

        return this;
    }.bind(AppData);

    this.switchSuit = function(changeSuit)
    {
        this.changeSuit = changeSuit;
    }.bind(AppData);

    this.clearChangeSuit = function()
    {
        this.changeSuit = undefined;
    }.bind(AppData);

    this.cardPlayed = function(player, cardIdx)
    {
        if (this.players && this.players.length > 0)
        {
            let playerNumber = this.players.indexOf(player);
            if (playerNumber >= 0)
            {
                let playerCardIdx = this.playerCards[playerNumber].indexOf(cardIdx);
                if (playerCardIdx >= 0)
                {
                    this.playerCards[playerNumber].splice(playerCardIdx, 1);
                    this.lastPlayedCard = cardIdx;
                }
            }
        }
    }.bind(AppData);

    this.drawCard = function(player)
    {
        if (this.players && this.players.length > 0)
        {
            let playerNumber = this.players.indexOf(player);
            if (playerNumber >= 0)
            {
                let playerCard = this.discardPile.shift();
                this.playerCards[playerNumber].push(playerCard);
                this.playerCards[playerNumber].sort();
            }
        }
    }.bind(AppData);

    this.updateRawData = function(rawData)
    {
        for (key in rawData)
        {
            AppData[key] = rawData[key];
        }

        return AppData;
    };

    return this;
};