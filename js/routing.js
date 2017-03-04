app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	
	$routeProvider
		.when('/', {templateUrl: 'partials/welcome-page.html',   controller: 'welcomePageController'})
		.when('/auth/:action', {templateUrl: 'partials/auth.html',   controller: 'authController'})
		.when('/auth/:action/token/:token', {templateUrl: 'partials/auth.html',   controller: 'authController'})
		.when('/custDashboard' ,{templateUrl: 'partials/custDashboard.html',   controller: 'dashboardController'})
		.when('/myprofile' ,{templateUrl: 'partials/my-profile.html',   controller: 'myProfileController', controllerAs: 'myProfile'})
		.when('/myorder' ,{templateUrl: 'partials/my-order.html',   controller: 'myOrderController', controllerAs: 'myOrder'})
		.when('/admin' ,{templateUrl: 'partials/empDashboard.html',   controller: 'dashboardController'})
		.otherwise({redirectTo: '/' });
	
}]);