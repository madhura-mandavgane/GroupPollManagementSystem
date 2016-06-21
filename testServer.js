var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

var MongoClient = require('mongodb').MongoClient , assert = require('assert');
var ObjectID = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017/PollingSystem";
var dbConnection= undefined;



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  
  next();
});
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

//////////////////////////////////////////////////////////////////////////////////////////////////////

loginEmployee=function(req,res){
		console.log('login request : ' + JSON.stringify(req.body));
		var data = { username : req.body.username, password : req.body.password };
		
		var employees = connection.collection("employees");
		
		employees.findOne( { $and : [{ username : data.username } , {password : data.password} ] }, function(err , doc){
				res.setHeader('Content-Type', 'application/json');
				assert.equal(err,null);
				if(doc == null){
					res.setErr
					var obj = { message : "Username not found"};
					res.json(obj);
					console.log( " Username not found" + err);
					res.end();
				}
				else{
					//res.setHeader('200','OK');
					res.json(doc);
					res.end();
				}
				
		});
}


//get Employee Objects by their IDs
getEmployeesById = function(req,res){
		console.log('start getempID' + JSON.stringify(req.body));
		data = { eid : req.body.eid };
		
		var employees = connection.collection("employees");
		
		employees.findOne({ _id : new ObjectID(data.eid)}, function(err , doc){
				res.setHeader('Content-Type', 'application/json');
				assert.equal(err,null);
				if(err){
					res.setHeader('404','Not Ok');
					console.log(err);
					res.end();
				}
				else{
					res.setHeader('200','OK');
					res.json(doc);
					res.end();
				}
				
		});
		
}

//get All the Groups

getAllGroups=function(req,res){
	console.log('request received');
		
	var groups = connection.collection('groups');
	
	groups.find({}).toArray(function(err,docs){
		res.setHeader('Content-Type', 'application/json');
		res.json(docs);
		res.end();
	});
}

getAllEmployees = function(req,res){
	console.log('request for all employees..');
	
	var employees = connection.collection('employees');
	
	employees.find({}).toArray(function(err,docs){
		res.setHeader('Content-Type', 'application/json');
		res.json(docs);
		res.end();
	});
}

getEmployeesForGroup=function(req,res){
	/*
		req should be in following form  (array of employeeIDs):
							{
					"ListEmployees": [
							{
							  "member": "575bbc1492590d0114f5fe93"
							},
							{
							  "member": "575bbc2992590d0114f5fe94"
							},
							{
							  "member": "575bbc3992590d0114f5fe95"
							}
						  ]
					}
	*/

		
	list = req.body.ListEmployees
		
		var employees = connection.collection('employees');
		
		id_array = [];
		for(var i in list)
		{
			id_array.push({ _id : new ObjectID(list[i].member)});
		}
		
		employees.find({$or : id_array }).toArray(function(err , data){
			res.setHeader('Content-Type', 'application/json');
			res.json(data);
			res.end();
		});
}

//////////////////////////////////////////////////////////////////////////////////////////////

testFunction = function(req,res){
		

		
}

//////////////////////////////////////////////////////////////////////////////////////////////



//Create a Group of Employees

createNewGroup=function(req,res){
	
	console.log("request received.............");
	
	var data = { employeeID : req.body.eid, groupName : req.body.groupName, listEmployees : req.body.members};
	
	console.log("creating new group : " + JSON.stringify(req.body));
	
	list = req.body.members;
	
	id_array = [];
	for(var i in list)
	{
		id_array.push({ member_id : new ObjectID(list[i])});
	}
	
	var groups = connection.collection("groups");
	
	//grpname , eid who created , members' IDs
	// check if grpname already exists
 	groups.insertOne({
		groupName : data.groupName,
		eid : data.employeeID,
		members : id_array
	},	function(err,result){
			res.setHeader('Content-Type', 'application/json');
			if(err){
				
				var respo = {inserted : 'false'};
				res.json(respo);
				res.end();
			}
			assert.equal(err,null);
			console.log("Inserted Group with Name: " + data.groupName);
			var respo = {inserted : 'true'};
			res.json(respo);
			res.end();
		}
	); 
}

groupAvailable=function(req,res){
		var grp = req.body.groupName;
			
		var groups = connection.collection("groups");
		
		console.log('searching for ' + grp);
		
		groups.findOne({groupName : grp}, function(err, doc){
			if(err){
				console.error(err);
			}
			else{
				console.log('read one doc: ' + JSON.stringify(doc));
				
				responseObject = new Object();
				
				if(doc == null){
					//group doesn't exist already. i.e. groupName suggested by client is available.
					responseObject.flag = 'true';
				}
				else{
					responseObject.flag = 'false';
				}
				res.end(JSON.stringify(responseObject));
			}
		});
	
}

////////////////////////////////////////////////////////////////////////////////
MongoClient.connect(url,connectMongoDB);

app.get('/',welcomePage)

//Groups API
app.get('/Groups',getAllGroups);
app.post('/Groups',createNewGroup);
app.post('/group/employees',getEmployeesForGroup);
app.post('/groupAvailability',groupAvailable);


//employees
app.get('/employees',getAllEmployees);
app.post('/employee',getEmployeesById);
app.post('/login', loginEmployee);
//




app.get('/disconnectDB',disconnectDB)

app.post('/testing',testFunction)
app.get('/testing',testFunction)
app.put('/testing',testFunction)

app.listen(8081);