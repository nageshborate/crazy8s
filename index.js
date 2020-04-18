const { AppData } = require('./AppData')
const AppDataMethods = require('./AppDataMethods').getAppDataMethods(AppData)
const express = require('express')
const app = express()
const port = 3000
const { getPlayerView } = require('./PlayerView');
const bodyParser = require('body-parser');
const nocache = require('nocache')
app.use(nocache())
app.use(bodyParser.json());
app.use(express.static('dist', {}))

app.get('/', (req, res) => res.send("Welcome to Crazy8s"))

app.get('/getRawAppData', (req, res) => res.send(AppData))

app.post('/updateRawAppData', (req, res) => res.send(AppDataMethods.updateRawData(req.body)))

app.get('/startNewGame', (req, res) => res.send(AppDataMethods.startNewGame()))

app.get('/startNewRound', (req, res) => res.send(AppDataMethods.startNewRound()))

app.get('/add/:personName', (req, res) => res.send(AppDataMethods.addPlayer(req.params.personName)))

app.get('/:personName', (req, res) => res.send(getPlayerView(AppData, req.params.personName)))

app.post('/generateDiscardPileWithoutPlayerCards', (req, res) => res.send((function(inAppData)
{
    AppDataMethods.updateRawData(inAppData);
    AppDataMethods.generateDiscardPileWithoutPlayerCards();
    return AppData;

    //const { generateDiscardPileWithoutPlayerCards } = require('./AppDataMethods').getAppDataMethods(inAppData);
    //generateDiscardPileWithoutPlayerCards();
    //return inAppData;
})(req.body)))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

