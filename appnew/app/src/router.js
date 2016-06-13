//router.js
app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/groups');
    
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