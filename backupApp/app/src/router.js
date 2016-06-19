//router.js
app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/login');
    $stateProvider
		.state('login', {
            url:'/login',
            templateUrl: 'views/login.html', controller : 'LoginController'
        });
        
	$stateProvider
		.state('master', {
            abstract:true,
            templateUrl: 'views/master.html', controller : 'MasterController'
        });
	
  	$stateProvider
		.state('master.groups', {
            url: '/groups',
            templateUrl: 'views/groups.html', controller : 'GroupsController'
        });
        
    $stateProvider
		.state('master.operationGroup', {
            url: '/groups/:operation?groupID',
            templateUrl: 'views/operationGroup.html', controller : 'OperationGroupController'
        });
		
	$stateProvider
		.state('master.polls', {
            url: '/polls',
            templateUrl: 'views/polls.html', controller : 'PollsController'
        });
        
    $stateProvider
		.state('master.pollSetting', {
            url: '/pollsetting',
            templateUrl: 'views/pollSetting.html', controller : 'PollSettingController'
        });
});

app.run(['$rootScope', '$state',function($rootScope, $state){

  $rootScope.$on('$stateChangeStart',function(a,b,c,d,e){
      $rootScope.currentState = b.name;
 });

}]);