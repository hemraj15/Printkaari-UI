

app.controller('cartController',['cartService', function(cartService){
	
	var cart = this;


	cart.init = function(){
		cart.cartData = cartService.getCartData();
	};

	cart.checkout = function(){

	};

	cart.params = {
		key: $MERCHANT_KEY,
		hash: $hash,
		txnid: $txnid,
		amount: amount,
		firstname: firstname
		email: email,
		phone: phone,
		productinfo: productinfo,
		surl: "http://printkaari.com/#!/payment/success",
		furl: "http://printkaari.com/#!/payment/failure",
		service_provider: "payu_paisa",
		//Optional Parameter
		lastname: lastname,
		curl: "http://printkaari.com/#!/payment/cancel",
		address1: "",
		address2: "",
		city: "",
		state: "",
		country: "",
		zipcode: "",
		udf1: "",
		udf2: "",
		udf3: "",
		udf4: "",
		udf5: "",
		pg: ""
	}

	cart.init();
}]);