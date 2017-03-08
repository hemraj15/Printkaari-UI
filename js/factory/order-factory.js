

app.factory('orderFactory', ['$http', function($http){

	var baseURL = "http://162.220.61.86:8080/printkaari-api/customers/",
	orderFactory = {},
	_config = {};


	orderFactory.addProduct = function(params){

		return $http.post(baseURL + 'college-order-upload-files', params, _config);
	}
}]);