app.controller('LoginController', ['$scope','$http','$state','apiService',function($scope,$http,$state,apiService) {
    
  /*  var dataToSend={
        username:'',
        password:''
    }*/
    console.log("hey");
    $scope.login = function (user)
    {
        console.log("hey");
      apiService.apiCalltoServer('login','POST',user).then(function(response)
            {
                $state.go('master.groups');
               
            },function(err)
            {
                console.log(err);
            });
    }
}]);

app.controller('MasterController', function($scope,$http) {

});