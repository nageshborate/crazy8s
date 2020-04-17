var AppData =
{
    deck:
    [
        "SA", "SK", "SQ", "SJ", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10", 
        "CA", "CK", "CQ", "CJ", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", 
        "HA", "HK", "HQ", "HJ", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10", 
        "DA", "DK", "DQ", "DJ", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10"
    ],
    players: [],
    playerCards: [],
    lastPlayedCard: undefined,
    discardPile: [],
    currentTurn: 0,
    changeSuit: undefined,
    roundComplete: false,
    playerPoints: []
};

exports.AppData = AppData;