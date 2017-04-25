

app.factory('orderFactory', ['$http', function($http){

	var baseURL = "http://printkaari.com:8080/printkaari-api/customers/",
	orderFactory = {},
	_config = {};


	orderFactory.addProduct = function(fd){

		return $http.post(baseURL + 'college-order-upload-files', fd, {
		   transformRequest: angular.identity,
		   headers: {'Content-Type': undefined}
		});
	}

	orderFactory.updateOrderStatus = function(orderId){
		return $http.get(baseURL);
	}

	return orderFactory;
}]);