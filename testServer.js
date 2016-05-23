var express = require('express');

var app = express();

var bodyParser = require('body-parser');


var MongoClient = require('mongodb').MongoClient , assert = require('assert');
var ObjectID = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017/PollingSystem";
var dbConnection= undefined;

app.use(bodyParser.json());

/* app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  
  next();
}); */
//////////////////////////////////////////////////////////////////////////////

var connection=undefined;

connectMongoDB=function (err,db) {
	connection=db;
	assert.equal(null,err);
	
	console.log('MongoDB connected..');	
}

welcomePage=function(req,res){
	var response='XYZ'
	res.writeHead('200','OK');
	res.write('<h1>' + response + '<h1>');
	res.end();
}

disconnectDB=function (dbConnection){
	connection.close();
	console.log('MongoDB connection closed');
}


//get All the Groups

getAllGroups=function(req,res){
		console.log('request received');
		responseObject = new Object();
		var employees = connection.collection("employees");
		employees.find({}, {_id : 0 , id: 1}).toArray(function(err,docs){
			assert.equal(err,null);
			
			if(err)
			{
				console.log('error');
			}
			else
			{
					console.log('found: \n ' + JSON.stringify(docs));
					responseObject.groups=docs;
					
					res.writeHead(200, {'content-type' : 'application/json'})
					
					console.log('response: ' + JSON.stringify(responseObject));
					res.end(JSON.stringify(responseObject));
			}
		
		});
}

getEmployees=function(){
	employees.find({},{id : 1, _id : 0});
}

//Create a Group of Employees

createNewGroup=function(req,res){
	var data = {employeeID: req.body.eid, groupName: req.body.groupName, listEmployees: req.body.list};
	
	var groups = connection.collection("groups");
	
 	groups.insertOne({
		
	}); 
	
	res.end("Done");
}

////////////////////////////////////////////////////////////////////////////////
MongoClient.connect(url,connectMongoDB);

app.get('/',welcomePage)
app.get('/Groups',getAllGroups)
//app.get('/groupAvailability',groupAvailable)

app.post('/CreateNewGroup',createNewGroup)
app.get('/disconnectDB',disconnectDB)

app.listen(8081);