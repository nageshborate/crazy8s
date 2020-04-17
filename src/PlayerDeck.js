import React from "react"
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import '../styles/card_1024.css';
import '../styles/playerdeck.css';

const PlayerDeck = ({ AppData, onCardPlayed, selectedPlayer }) =>
{
    if (!(AppData))
        return null;

    if (AppData.roundComplete)
        return <>
        <Typography variant="h5" align='center'>
            End of round
        </Typography>
        </>;

    const {
        isPlayerTurn,
        cardPlayed, 
        isChangeSuitSet, 
        clearChangeSuit, 
        getCardValue, 
        switchSuit,
        drawCard,
        getPlayerCardsWithValidity
    } = require('../AppDataMethods').getAppDataMethods(AppData);

    const isCurrentPlayerTurn = isPlayerTurn(selectedPlayer);

    const onClick = function()
    {
        const { cardIdx, valid } = this;
        if (valid)
        {
            if (cardIdx >= 0)
            {
                cardPlayed(selectedPlayer, cardIdx);

                if (isChangeSuitSet())
                    clearChangeSuit();

                if (getCardValue(cardIdx) === '8')
                {
                    let newSuit = '';
                    while (newSuit != 'S' && newSuit != 'C' && newSuit != 'H' && newSuit != 'D')
                    {
                        newSuit = prompt('Change suit to? (Valid values: S C H D) : ');
                    }

                    switchSuit(newSuit);
                }
            }
            else
            {
                drawCard(selectedPlayer);
            }
        }

        onCardPlayed(AppData);
    };

return <>
    <Typography variant="h5" align='center'>
        Your Cards
    </Typography>
    <Container style={{ display: "flex", flexWrap: "wrap" }}>
        { getPlayerCardsWithValidity(selectedPlayer).map((obj) =>
        {
            let { cardIdx, card, valid } = obj;
            valid = isCurrentPlayerTurn && valid;

            return  <Card onClick = { onClick.bind({...obj, valid}) } style={{ margin: 5 }}>
                        <CardContent>
                            <Box display="flex" justifyContent="center">
                                <div id={ `card_${cardIdx}` } className={ `card-1024 card-1024-${card} ${valid ? 'enabledCard' : 'disabledCard'}` }></div>
                            </Box>
                        </CardContent>
                    </Card>
        }) }
        <Card onClick = { onClick.bind({ cardIdx: -1, card: 'newCard', valid: isCurrentPlayerTurn}) } style={{ margin: 5 }}>
            <CardContent>
                <Box display="flex" justifyContent="center">
                    <Typography variant='button' align='center' className={ `card-1024 ${isCurrentPlayerTurn ? 'enabledCard' : 'disabledCard'}` } style={{ backgroundImage: 'none' }}>Pick card</Typography>
                </Box>
            </CardContent>
        </Card>
    </Container>
</>
}

export default PlayerDeck;

