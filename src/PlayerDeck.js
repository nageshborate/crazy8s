import React from "react"
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import SelectSuitDialog from './SelectSuitDialog';
import '../styles/card_1024.css';
import '../styles/playerdeck.css';

const PlayerDeck = ({ AppData, onCardPlayed, selectedPlayer, stopDataRefresh }) =>
{
    if (!(AppData))
        return null;

    if (AppData.roundComplete)
        return <>
        <Typography variant="h5" align='center'>
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

            if (cardIdx >= 0)
            {
                handleCardPlay(cardIdx);
            }
            else
            {
                drawCard(selectedPlayer);
                onCardPlayed(AppData);
            }
        }
    };

    const handleCardPlay = function(cardIdx)
    {
        cardPlayed(selectedPlayer, cardIdx);

        console.log('after cardPlayed ', AppData);

        if (isChangeSuitSet())
        {
            clearChangeSuit();
            console.log('suit cleared', AppData);
        }

        if (getCardValue(cardIdx) === '8')
        {
            initiateHandleEightCard();
        }
        else
            handleNonEightCard();
    };

    const handleNonEightCard = function()
    {
        onCardPlayed(AppData);
    };

    const initiateHandleEightCard = function()
    {
        selectSuitDialog.current.handleClickOpen();
    };

    const completeHandleEightCard = function(newSuit)
    {
        console.log('newSuit ', newSuit);

        switchSuit(newSuit);
        onCardPlayed(AppData);

        console.log('after onCardPlayed ', AppData);
    };

    const getCurrentSuit = function()
    {
        const suit = isChangeSuitSet() ? AppData.changeSuit : getCardSuit(AppData.lastPlayedCard);
        return (suit === 'C') ? ('&clubs;') : ((suit === 'D') ? ('&diams;') : ((suit === 'H') ? ('&hearts;') : ('&spades;')));
    }

    console.log('getCurrentSuit() ', getCurrentSuit());

return <>
    <Typography variant="h5" align='center'>
        { `Your Cards [Current Turn: ${ AppData.players[AppData.currentTurn] }]` }<span dangerouslySetInnerHTML = { { __html : `&nbsp;&nbsp;[Current Suit: ${ getCurrentSuit() }]` } }></span>
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
    <SelectSuitDialog ref = { selectSuitDialog } handleSuitChange = { completeHandleEightCard } />
</>
}

export default PlayerDeck;

