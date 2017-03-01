app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	
	$routeProvider
		.when('/', {templateUrl: 'partials/welcome-page.html',   controller: 'welcomePageController'})
		.when('/login', {templateUrl: 'partials/login.html',   controller: 'loginController'})
		.when('/emailtoken/:tokenId', {templateUrl: 'partials/login.html',   controller: 'loginController'})
		.when('/reset-password/:tokenForPwd' ,{templateUrl: 'partials/login.html',   controller: 'loginController'})
		.when('/custDashboard' ,{templateUrl: 'partials/custDashboard.html',   controller: 'dashboardController'})
		.when('/myprofile' ,{templateUrl: 'partials/my-profile.html',   controller: 'myProfileController', controllerAs: 'myProfile'})
		.when('/myorder' ,{templateUrl: 'partials/my-order.html',   controller: 'myOrderController', controllerAs: 'myOrder'})
		.when('/admin' ,{templateUrl: 'partials/empDashboard.html',   controller: 'dashboardController'})
		.when('/logout' ,{redirectTo: '/login.html'})
		.otherwise({redirectTo: '/' });
	
}]);