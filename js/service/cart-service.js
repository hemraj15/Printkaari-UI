app.service('cartService',['store', function(store){
	
	var service = this;
	
	service.addProduct = function(data){


		service.cartData.push(data);
		service._updateCart();
	};

	service._updateCart = function(){
		store.remove('cartData');
		store.set('cartData', service.cartData);
	};

	service._initCartData = function(){
		service.cartData = store.get('cartData') || [];
	};

	service.removeProduct = function(productId){

		for (var i = 0; i < service.cartData.length; i++) {
			
			if(service.cartData[i].productId == productId){
				
				// removing product from the array
				service.cartData.splice(i, 1);
				service._updateCart();
				break;
			} 
		}
	};

	service.getProductCount = function(){

		return service.cartData.length;
	};
	
	service._initCartData();
}]);