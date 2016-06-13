var express = require('express');
var bodyParser = require("body-parser");
var groups = require('./routes/groups');

var app = express();
//Handles post requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json);

var serverIP = "http://localhost";
var serverPort = 9090;
//to do: create vars for url port of db 

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  
  next();
});

var server = app.listen(serverPort,function () {
 console.log("Example app listening at " + serverPort);
});

app.get('/', function(req, res) {
    res.end("Hello World");
});

app.get ('./routes/groups/default', groups.ListDefault);
app.post('/groups',         groups.Add);
app.get ('./routes/groups',         groups.ListAll);
app.get ('/groups/:id',     groups.List);
//app.put ('/groups/:id',     groups.Update);
app.delete('/groups/:id',   groups.Delete);
