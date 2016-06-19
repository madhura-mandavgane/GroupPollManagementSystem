//router.js
app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
	$stateProvider
		.state('master', {
            templateUrl: 'views/master.html', controller : 'MasterController'
        });
	
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('master.home', {
            url: '/home',
            templateUrl: 'views/Home.html', controller : 'HomeController'
        });
		
	$stateProvider
		.state('master.groups', {
            url: '/groups',
            templateUrl: 'views/Groups.html', controller : 'GroupsController'
        });
		
	$stateProvider
		.state('master.creategroup', {
            url: '/creategroup',
            templateUrl: 'views/CreateGroup.html', controller : 'CreateGroupController'
        });
});