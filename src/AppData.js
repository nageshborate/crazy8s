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
    }
}

export default new AppData();