/*

 */

app.controller('productController', ['cartService', 'orderFactory', '$rootScope',function(cartService,orderFactory,$rootScope){

	var product = this;

	product.addProduct = function(){

		var fd = new FormData();
		
		fd.append('file', product.file);
		fd.append('fileType', 'pdf');
		fd.append('bindingType', product.bindingType);
		fd.append('totalPages', product.noOfPage);
		fd.append('glossyColorPages', product.noOfGlossyColoredPage);
		fd.append('nonGlossyColorPages', product.noOfNonGlossyColoredPage);
		fd.append('anyOtherRequest', product.comment);

		orderFactory.addProduct(fd)
			.then(function(response){
				cartService.addProduct(response.data);
				console.log(response.data);
			});
	};

}]);