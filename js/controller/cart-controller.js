

app.controller('cartController',['cartService', function(cartService){
	
	var cart = this;


	cart.init = function(){
		cart.cartData = cartService.getCartData();
	};

	cart.checkout = function(){
		
	};

	cart.init();
}]);