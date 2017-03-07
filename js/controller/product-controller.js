/*

 */

app.controller('productController', ['cartService', '$rootScope', function(cartService,$rootScope){

	var product = this;

	product.addProduct = function(){
		console.log("this is done");
	};
}]);