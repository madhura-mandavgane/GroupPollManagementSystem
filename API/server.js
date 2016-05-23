var express = require('express');
var bodyParser = require("body-parser");
var groups = require('./routes/groups');

var app = express();
//Handles post requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json);


var server = app.listen(9090,function () {
 console.log("Example app listening at 9090");
});

app.get('/', function(req, res) {
    res.end("Hello World");
});

app.get ('/groups/default', groups.ListDefault);
app.post('/groups',         groups.Add);
app.get ('/groups',         groups.ListAll);
app.get ('/groups/:id',     groups.List);
app.put ('/groups/:id',     groups.Update);
app.delete('/groups/:id',   groups.Delete);
