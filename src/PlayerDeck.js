import React from "react"
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import '../styles/card_1024.css';
import '../styles/playerdeck.css';
const AppDataMethods = require('../AppDataMethods').getAppDataMethods(AppData);

const PlayerDeck = () => (
<>
    <Typography variant="h5" align='center'>
        Your Cards
    </Typography>
    <Container style={{ display: "flex", flexWrap: "wrap" }}>
        { AppDataMethods.getPlayerCardsWithValidity(selectedPlayer).map(({ card, valid }) =>
        {
            return  <Card style={{ margin: 5 }}>
                        <CardContent>
                            <Box display="flex" justifyContent="center">
                                <div className={ `card-1024 card-1024-${card} ${valid ? 'enabledCard' : 'disabledCard'}` }></div>
                            </Box>
                        </CardContent>
                    </Card>
        }) }
        <Card style={{ margin: 5 }}>
            <CardContent>
                <Box display="flex" justifyContent="center">
                    <Typography variant='button' align='center' className='card-1024 enabledCard' style={{ backgroundImage: 'none' }}>Pick card</Typography>
                </Box>
            </CardContent>
        </Card>
    </Container>
</>
)

export default PlayerDeck;

