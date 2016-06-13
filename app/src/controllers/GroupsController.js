app.controller('GroupsController', function($scope,$http,$state) {

	/* $http({
		method : "GET",
		url : "http://localhost:8081/Groups"
		}).then(function successCall(response){
			$scope.firstName = response.data.groupName;
		}, function failureCall(response){
			$scope.firstName = response.statusText;
		}); */
		
	$http({
		method : "GET",
		url : "http://localhost:8081/Groups"
		}).then(function successCall(response){
			$scope.list = response.data.groups;
		}, function failureCall(response){
			alert($response);
		});
});
