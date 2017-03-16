

app.controller('afterPaymentController', ['$routeParams', 'cartService', 'paymentFactory', '$rootScope',function($routeParams, cartService, paymentFactory, $rootScope){

	var afterpayment = this;

	console.log($routeParams);

	if($routeParams.action == 'success'){
		
		cartService.emptyCart();
		$rootScope.$emit('updateCart', {});
		afterpayment.message = "Your payment is successful";
		afterpayment.description = "Thanks for placing order with us, we will shortly process this order,You can track you order anytime under my order section";
	}else{
		afterpayment.message = "Your payment not completed successfully";
		afterpayment.description = "Unfortunetly you payment has not been made, you can try again by going to cart section again";
	}

	afterpayment.updateTransaction = function(){
		paymentFactory.updateTransaction()
			.then(function(response){
				
			});
	}
}]);	