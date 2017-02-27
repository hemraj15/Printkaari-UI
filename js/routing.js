app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	
	$routeProvider
		.when('/', {templateUrl: 'partials/main.html',   controller: 'mainController'})
		.when('/login', {templateUrl: 'partials/login.html',   controller: 'loginController'})
		.when('/emailtoken/:tokenId', {templateUrl: 'partials/login.html',   controller: 'loginController'})
		.when('/reset-password/:tokenForPwd' ,{templateUrl: 'partials/login.html',   controller: 'loginController'})
		.when('/custDashboard' ,{templateUrl: 'partials/custDashboard.html',   controller: 'dashboardController'})
		.when('/admin' ,{templateUrl: 'partials/empDashboard.html',   controller: 'dashboardController'})
		.when('/logout' ,{redirectTo: '/login.html'})
		.otherwise({redirectTo: '/' });
	
}]);