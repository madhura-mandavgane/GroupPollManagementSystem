var express = require('express');
var groups = require('./routes/groups');

var app = express();
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
