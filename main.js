var express = require('express');

var app = express();

var bodyParser = require('body-parser');


var MongoClient = require('mongodb').MongoClient , assert = require('assert');
var ObjectID = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017/test";

app.use(bodyParser.json());

MongoClient.connect(url,connectDB)

var dbConnection= new Object();


var connectDB=function (err,db) {
	dbConnection.connection=db;
	assert.equal(null,err);
	
	console.log('MongoDB connected..' + JSON.stringify(dbConnection));
}

var disconnectDB=function(dbConnection)
{
	dbConnection.connection.close();
	console.log('MongoDB connection closed');
	return;
}

//for closing MongoDB Connection

app.get('/',function(req,res){
	var response='Welcome to Polling System'
	res.writeHead('200','OK');
	res.write('<h1>' + response + '<h1>');
	res.end();
	}
)

app.get('/Groups',function(req,res){
		console.log('request received');
		disconnectDB(dbConnection);
})

app.post('/CreateNewGroup',function(req,res){
	
})

app.listen(8081);


