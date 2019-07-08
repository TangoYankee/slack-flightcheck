const flightstats = require('./apps/flightcheck/flightstats.js');
const slack = require('./apps/slack/slack.js');
const markdown_link = require('./apps/markdown_link/link.js');
var config = require('./config.js');

var express = require('express');
const bodyParser = require('body-parser');

var app = express();
var path = require('path');
var __dirname;
const PORT = config.port;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/templates/index.html'))
});

app.get('/oauth', (req, res) => {
    slack.data.oauth(req, res);
});

app.post('/flightcheck', (req, res) => {
    flightstats.data.controlInput(req.body.text, res);
});

app.post('/markdown-link', (req, res)=> {
    markdown_link.data.formatLink(req.body.text, res);
});