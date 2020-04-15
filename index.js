const { AppData } = require('./AppData')
const AppDataMethods = require('./AppDataMethods').getAppDataMethods(AppData)
const express = require('express')
const app = express()
const port = 3000
const { getPlayerView } = require('./PlayerView');
app.use(express.static('dist', {}))

app.get('/', (req, res) => res.send("Welcome to Crazy8s"))

app.get('/showRawAppData', (req, res) => res.send(AppData))

app.get('/startNewGame', (req, res) => res.send(AppDataMethods.startNewGame()))

app.get('/add/:personName', (req, res) => res.send(AppDataMethods.addPlayer(req.params.personName)))

app.get('/:personName', (req, res) => res.send(getPlayerView(AppData, req.params.personName)))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

