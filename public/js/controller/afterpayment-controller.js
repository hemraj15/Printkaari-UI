

app.controller('afterPaymentController', ['$routeParams', function($routeParams){

	var afterpayment = this;

	if($routeParams.action == 'success'){
		afterpayment.message = "Your payment is successful";
	}else{
		afterpayment.message = "Your payment not completed successfully";
	}
}]);