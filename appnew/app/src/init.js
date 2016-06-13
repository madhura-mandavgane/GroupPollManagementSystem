
var pollConfig ={

	url:"http://10.44.67.84:8081/",
	ajaxTimeout:5000
};
var app = angular.module('app',['ui.router','checklist-model']);
app.constant('pollConfig',pollConfig);