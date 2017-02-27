var app = angular.module('printkaariApp',["ngRoute"]);


app.controller('mainController',['$http', function($http){
	var main = this;
}]);


app.directive('pageHeader', function(){
	return {
		templateUrl: 'partials/header.html',
		controller: 'navTabController',
		controllerAs: 'navCtl'
	}
});


app.directive('pageFooter', function(){
	return {
		templateUrl: 'partials/footer.html'
	}
});