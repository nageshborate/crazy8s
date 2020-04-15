import React from "react"
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import '../styles/card_1024.css';
import '../styles/playerdeck.css';
const AppDataMethods = require('../AppDataMethods').getAppDataMethods(AppData);

const isPlayerTurn = AppDataMethods.isPlayerTurn(selectedPlayer);

const onClick = function()
{
    console.log(this);
    console.log(arguments);
};

const PlayerDeck = () => (
<>
    <Typography variant="h5" align='center'>
        Your Cards
    </Typography>
    <Container style={{ display: "flex", flexWrap: "wrap" }}>
        { AppDataMethods.getPlayerCardsWithValidity(selectedPlayer).map((obj) =>
        {
            let { cardIdx, card, valid } = obj;
            valid = isPlayerTurn && valid;

            return  <Card onClick = { onClick.bind(obj) } style={{ margin: 5 }}>
                        <CardContent>
                            <Box display="flex" justifyContent="center">
                                <div id={ `card_${cardIdx}` } className={ `card-1024 card-1024-${card} ${valid ? 'enabledCard' : 'disabledCard'}` }></div>
                            </Box>
                        </CardContent>
                    </Card>
        }) }
        <Card onClick = { onClick(this) } style={{ margin: 5 }}>
            <CardContent>
                <Box display="flex" justifyContent="center">
                    <Typography variant='button' align='center' className={ `card-1024 ${isPlayerTurn ? 'enabledCard' : 'disabledCard'}` } style={{ backgroundImage: 'none' }}>Pick card</Typography>
                </Box>
            </CardContent>
        </Card>
    </Container>
</>
)

export default PlayerDeck;

