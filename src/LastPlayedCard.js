import React from "react"
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import '../styles/card_1024.css';


const LastPlayedCard = ({ AppData }) => {

if (!(AppData))
    return null;

const AppDataMethods = require('../AppDataMethods').getAppDataMethods(AppData);

return <>
    <Typography variant="h5" align='center'>
        Last Played Card
    </Typography>
    <Container>
        <Card>
            <CardContent>
                <Box display="flex" justifyContent="center">
                    <div className={ `card-1024 card-1024-${AppDataMethods.getLastPlayedCard()}` }></div>
                </Box>
            </CardContent>
        </Card>
    </Container>
</>
}

export default LastPlayedCard;

