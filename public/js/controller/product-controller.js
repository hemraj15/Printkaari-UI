/*

 */

app.controller('productController', ['cartService', 'orderFactory', '$rootScope',function(cartService,orderFactory,$rootScope){

	var product = this;

	product.addProduct = function(){
		console.log(product.bindingType);
		console.log(product.file);
		console.log(product.noOfColoredPage);
		console.log(product.noOfPage);
		console.log(product.comment);
		console.log("this is done");
	};

}]);