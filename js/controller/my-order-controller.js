

app.controller('myOrderController', ['$http', function($http){
	var order = this;

	var customerId = 8,
	url = "http://printkaari.com:8080/printkaari-api/customers/"+ customerId +"/my-orders";
	
	$http.get(url)
		.then(function(res){
			order.orderDetails = res.data;
		});
}]);