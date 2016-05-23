app.controller('CreateGroupController', function($scope,$http) {
	/* 
	Will add this later
	$scope.checkAvailability = function(){
		$http({
			method : "GET",
			url: "http://localhost:8081/groupAvailability"
		}).then( function successCall(){
			
		}, failureCall(){});
	}; */

	$scope.createGroup = function(){
		
		$http({
			method : "POST",
			url : "http://localhost:8081/Groups",
			data: {}
		});
		
	};
});