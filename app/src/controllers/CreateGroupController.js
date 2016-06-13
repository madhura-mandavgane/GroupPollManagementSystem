app.controller('CreateGroupController', function($scope,$http) {
	
	$scope.createGroup = function(){
		var req = {
			method : 'POST',
			url : 'http://localhost:8081/Groups',
			headers:{
				'Content-Type' : 'application/json'
				},
			data : {
					eid : $scope.eid, 
					groupName : $scope.groupName, 
					list : [ { member_id : 'ObjectId("57402adbffb6c095ee9cf936")' },
						{ member_id : 'ObjectId("57402ae3ffb6c095ee9cf937")' }]
			}
		}
		$http(req).then(function successCall(response){
			if(response.data.inserted == "true"){
					alert('Created New Group ' + $scope.groupName);
			}
			else{
				alert('There is some glitch...please try again');
			}
			
		},
		function failureCall(response){
			alert('failure');
		});
		
	};
	
	$scope.checkAvailability = function(){
		$scope.message = "Please enter a valid group name";
		
		if($scope.groupName == null || $scope.groupName = "")
		{
			$scope.message = "Please enter a valid group name";
			return;
		}
		
		var req = {
			method : 'POST',
			url : 'http://localhost:8081/groupAvailability',
			headers:{
				'Content-Type' : 'application/json'
				},
			data : {
				groupName : $scope.groupName
			}
		}
		
		$http(req).then(function successCall(response){
					if(response.data.flag == "true"){
						$scope.message="is available"
					}
					else{
						$scope.message=": group name already taken"
					}
			},function failureCall(response){
					alert("Error");
		});
	};
});