

app.controller('cartController', ['cartService', '$http', 'paymentFactory',function(cartService, $http, paymentFactory){
	
	var cart = this;


	cart.init = function(){
		cart.cartData = cartService.getCartData();
		cart.total = cartService.getTotal();
		cart.noOfProduct = cartService.getProductCount();
	};

 
	cart.checkout = function(){

		paymentFactory.initiateTransaction(cart.cartData[0].order_id)
			.then(function(response){
				var params = {
					txnid: response.data.tansactionId,
					amount: response.data.orderPrice,
					firstname : response.data.customerFirstName,
					email: response.data.customerEmail,
					phone: response.data.custContactNum,
					productinfo: "this is need to ask in next request cycle",
					udf1: response.data.orderId,
					udf2: response.data.customerId
				}

				return $http.post('/api/payment/generateparams', params);
			})
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