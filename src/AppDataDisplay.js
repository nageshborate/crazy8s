var AppDataDisplay = 
{
    getCardSuitDisplay: (suit) =>
    {
        let symbol = '';

        if (suit === 'S')
            symbol = '&spades;';
        else if (suit === 'C')
            symbol = '&clubs;';
        else if (suit === 'H')
            symbol = '&hearts;';
        else if (suit === 'D')
            symbol = '&diams;';

        return symbol;
    }
};

export default AppDataDisplay;