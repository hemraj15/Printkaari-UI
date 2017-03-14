

app.controller('cartController', ['cartService', '$http', function(cartService, $http){
	
	var cart = this;


	cart.init = function(){
		cart.cartData = cartService.getCartData();
	};
 
	cart.checkout = function(){

		$http.get('/api/payment')
			.then(function(res){
				cart.params = res.data;
				cart.generateAndSubmitForm();
			});
	};

	cart.generateAndSubmitForm = function(){
		
	    var form = document.createElement('form');
	    form.method = 'POST';
	    form.action = "https://secure.payu.in/_payment";

	    angular.forEach(cart.params, function(value, key){

		    var node = cart.createInput(key, value);
		    form.appendChild(node);
	    });
	    document.body.appendChild(form);
	    form.submit();
	}

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

	


	cart.init();
}]);