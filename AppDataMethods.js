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

    this.isDiscardPileEmpty = function()
    {
        return this.discardPile.length === 0;
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

    this.generateDiscardPileWithoutPlayerCards = function()
    {
        let { methods, data } = this;
        if (data.players && data.players.length > 0)
        {
            let allPlayerCards = [];
            for (let idx = 0 ; idx < data.players.length ; idx++)
            {
                allPlayerCards = [...allPlayerCards, ...data.playerCards[idx]];
            }
            let isOneOfPlayerCards = function(cardIdx)
            {
                let allPlayerCards = this;
                return allPlayerCards.indexOf(cardIdx) >= 0;
            }.bind(allPlayerCards);

            let discardPile = [data.lastPlayedCard];
            data.lastPlayedCard = undefined;
            while (discardPile.length < (52 - allPlayerCards.length ))
            {
                let cardIdx;
                while (true)
                {
                    cardIdx = getRandomIntInclusive(0, 51);
                    if (isNumberAlreadyGenerated(cardIdx, discardPile))
                        continue;
                    if (isOneOfPlayerCards(cardIdx))
                        continue;
                    else
                        break;
                }
                discardPile.push(cardIdx);
            }

            data.discardPile = discardPile;
            data.lastPlayedCard = methods.generateLastPlayedCard();
        }
    }.bind({ methods: this, data: AppData });

    this.generatePlayerCards = function(count = 5)
    {
        return this.discardPile.splice(0, count);
    }.bind(AppData);

    this.generateLastPlayedCard = function()
    {
        return this.discardPile.shift();
    }.bind(AppData);

    this.startNewRound = function()
    {
        let { methods, data } = this;

        if (data.players && data.players.length > 0)
        {
            methods.cleanEverythingExceptPoints();

            methods.generateDiscardPile();
            data.playerCards = {};

            for (let idx = 0 ; idx < data.players.length ; idx++)
            {
                data.playerCards[idx] = methods.generatePlayerCards().sort((a, b) => a-b);
            }

            data.lastPlayedCard = methods.generateLastPlayedCard();
        }

        return data;
    }.bind({ methods: this, data: AppData });

    this.startNewGame = function()
    {
        let { methods, data } = this;

        if (data.players && data.players.length > 0)
        {
            methods.cleanEverything();

            methods.generateDiscardPile();
            data.playerCards = {};

            for (let idx = 0 ; idx < data.players.length ; idx++)
            {
                data.playerCards[idx] = methods.generatePlayerCards().sort((a, b) => a-b);
            }

            data.lastPlayedCard = methods.generateLastPlayedCard();
        }

        return data;
    }.bind({ methods: this, data: AppData });

    this.cleanEverything = function()
    {
        this.playerCards = [];
        this.lastPlayedCard = undefined;
        this.discardPile = [];
        this.currentTurn = 0;
        this.changeSuit = undefined;
        this.roundComplete = false;
        this.playerPoints = [];
    }.bind(AppData);

    this.cleanEverythingExceptPoints = function()
    {
        this.playerCards = [];
        this.lastPlayedCard = undefined;
        this.discardPile = [];
        this.currentTurn = 0;
        this.changeSuit = undefined;
        this.roundComplete = false;
    }.bind(AppData);

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
        if (this.currentTurn != undefined && this.players && this.players.length > 0)
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

    this.isChangeSuitSet = function()
    {
        return this.changeSuit != undefined;
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
                    this.playerCards[playerNumber] = this.playerCards[playerNumber].sort((a, b) => a-b);
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
                this.playerCards[playerNumber].sort((a, b) => a-b);
            }
        }
    }.bind(AppData);

    this.checkRoundComplete = function()
    {
        this.roundComplete = (function()
        {
            if (this.players && this.players.length > 0)
            {
                for (let playerNumber = 0 ; playerNumber < this.players.length ; playerNumber++)
                {
                    if (this.playerCards[playerNumber].length === 0)
                        return true;
                }
            }
            return false;
        }.bind(this))();

        return this.roundComplete;
    }.bind(AppData);

    this.calculatePlayerPoints = function()
    {
        let { methods, data} = this;

        if (data.players && data.players.length > 0)
        {
            let roundWinnerPlayerNumber = -1;
            let playerPoints = 0;
            for (let playerNumber = 0 ; playerNumber < data.players.length ; playerNumber++)
            {
                let playerCards = data.playerCards[playerNumber];

                if (playerCards.length > 0)
                {
                    for (let playerCardIdx = 0 ; playerCardIdx < playerCards.length ; playerCardIdx++)
                    {
                        let playerCardValue = methods.getCardValue(playerCards[playerCardIdx]);

                        if (playerCardValue === 'A')
                            playerCardValue = 20;
                        else if (playerCardValue === 'J')
                            playerCardValue = 11;
                        else if (playerCardValue === 'Q')
                            playerCardValue = 12;
                        else if (playerCardValue === 'K')
                            playerCardValue = 13;
                        else
                            playerCardValue = Number(playerCardValue);
                        playerPoints = playerPoints + playerCardValue;
                    }
                }
                else
                    roundWinnerPlayerNumber = playerNumber;
            }
            if (roundWinnerPlayerNumber >= 0)
                data.playerPoints[roundWinnerPlayerNumber] = data.playerPoints[roundWinnerPlayerNumber] ? (data.playerPoints[roundWinnerPlayerNumber] + playerPoints) :playerPoints;
        }
    }.bind({ methods: this, data: AppData });

    this.updateRawData = function(rawData)
    {
        for (key in rawData)
        {
            AppData[key] = rawData[key];
        }

        if (this.isDiscardPileEmpty())
            this.generateDiscardPileWithoutPlayerCards();

        if (this.getCardValue(AppData.lastPlayedCard) !== '8' && this.isChangeSuitSet())
            this.clearChangeSuit();

        return AppData;
    }.bind(this);

    return this;
};