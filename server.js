const express = require('express');
const app = express();
const io = require('socket.io');
const ServerHttp = require('http');
var bodyParser = require('body-parser')

const serverHttp = ServerHttp.createServer(app);
const ioSocket = io(serverHttp);


  // create application/json parser
var jsonParser = bodyParser.json()

  app.get('/', function (req, res) {

    res.send("teste ok");
});

app.post('/', jsonParser, function (req, res) {
    const commit = {
        author: req.body.actor.display_name,
        date: new Date(req.body.push.changes[0].new.target.date),
        message:  req.body.push.changes[0].new.target.message,
        avatar_url: req.body.actor.links.avatar.href
    };
    ioSocket.emit('commit',commit);

    res.send(commit);
});

app.listen(process.env.PORT || 4000);