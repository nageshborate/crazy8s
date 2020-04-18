import React from "react"
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import SelectSuitDialog from './SelectSuitDialog';
import '../styles/card_1024.css';
import '../styles/playerdeck.css';

const PlayerDeck = ({ onCardPlayed, selectedPlayer, stopDataRefresh }) =>
{
    if (!(AppData))
        return null;

    if (AppData.roundComplete)
        return <>
        <Typography variant="h5">
            End of round
        </Typography>
        </>;

    let selectSuitDialog = React.createRef();;

    const {
        isPlayerTurn,
        cardPlayed, 
        isChangeSuitSet, 
        clearChangeSuit, 
        getCardValue, 
        switchSuit,
        drawCard,
        getPlayerCardsWithValidity,
        getCardSuit
    } = require('../AppDataMethods').getAppDataMethods(AppData);

    const isCurrentPlayerTurn = isPlayerTurn(selectedPlayer);

    const onClick = function()
    {
        const { cardIdx, valid } = this;
        if (valid)
        {
            stopDataRefresh();

            if (cardIdx>= 0)
            {
                handleCardPlay(cardIdx);
            }
            else
            {
                drawCard(selectedPlayer);
                onCardPlayed();
            }
        }
    };

    const handleCardPlay = function(cardIdx)
    {
        cardPlayed(selectedPlayer, cardIdx);

        if (getCardValue(cardIdx) === '8')
        {
            initiateHandleEightCard();
        }
        else
            handleNonEightCard();
    };

    const handleNonEightCard = function()
    {
        onCardPlayed();
    };

    const initiateHandleEightCard = function()
    {
        selectSuitDialog.current.handleClickOpen();
    };

    const completeHandleEightCard = function(newSuit)
    {
        switchSuit(newSuit);
        onCardPlayed();
    };

    const getCurrentSuit = function()
    {
        const suit = isChangeSuitSet() ? AppData.changeSuit : getCardSuit(AppData.lastPlayedCard);
        return (suit === 'C') ? ('&clubs;') : ((suit === 'D') ? ('&diams;') : ((suit === 'H') ? ('&hearts;') : ('&spades;')));
    }

return <>
    <Container style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
    <Typography variant="h5">
        { `Your Cards` }
    </Typography>
    <span dangerouslySetInnerHTML = { { __html : `&nbsp;&nbsp;` } }></span>
    <Typography variant="h5">
        { `[Current Turn: ${ AppData.players[AppData.currentTurn] }]` }
    </Typography>
    <span dangerouslySetInnerHTML = { { __html : `&nbsp;&nbsp;` } }></span>
    <Typography variant="h5">
        <span dangerouslySetInnerHTML = { { __html : `[Current Suit: ${ getCurrentSuit() }]` } }></span>
    </Typography>
    </Container>
    <br />
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
                    <Typography variant='button'  className={ `card-1024 ${isCurrentPlayerTurn ? 'enabledCard' : 'disabledCard'}` } style={{ backgroundImage: 'none' }}>Pick card</Typography>
                </Box>
            </CardContent>
        </Card>
    </Container>
    <SelectSuitDialog ref = { selectSuitDialog } handleSuitChange = { completeHandleEightCard } />
</>
}

export default PlayerDeck;

