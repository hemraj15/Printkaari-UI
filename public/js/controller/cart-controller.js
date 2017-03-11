

app.controller('cartController',['cartService', function(cartService){
	
	var cart = this;


	cart.init = function(){
		cart.cartData = cartService.getCartData();
	};
 
	cart.checkout = function(){
		//cart.buildParams();

	    var form = document.createElement('form');
	    form.method = 'POST';
	    form.action = "https://test.payu.in/_payment";

	    angular.forEach(cart.params, function(value, key){

		    var node = cart.createInput(key, value);
		    form.appendChild(node);
	    });
	    document.body.appendChild(form);
	    form.submit();

	};

	cart.createInput = function(name, value){
		var input = document.createElement('input');
		var nameAttr = document.createAttribute("name");
		nameAttr.value = name;

		var valueAttr = document.createAttribute("value");
		valueAttr.value = value;

		input.setAttributeNode(nameAttr);
		input.setAttributeNode(valueAttr);

		return input;
	}

	cart.buildParams = function(){

		cart.params = {
			key: $MERCHANT_KEY,
			hash: $hash,
			txnid: $txnid,
			amount: amount,
			firstname: firstname,
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
	}


	cart.init();
}]);