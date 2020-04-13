import React from "react"
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AppData from './AppData';
import '../styles/card_1024.css';

const PlayerDeck = () => (
<>
    <Typography variant="h5" align='center'>
        Your Cards
    </Typography>
    <Container>
        { AppData.playerCards[0].map(cardIdx =>
        {
            return  <Card>
                        <CardContent>
                            <Box display="flex" justifyContent="center">
                                <div className={ `card-1024 card-1024-${AppData.getCard(cardIdx)}` }></div>
                            </Box>
                        </CardContent>
                    </Card>
        }) }
    </Container>
</>
)

export default PlayerDeck;

