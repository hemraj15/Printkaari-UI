/*

 */

app.controller('productController', ['cartService','$scope' ,'orderFactory', '$location', '$rootScope', 'authService', function(cartService,$scope,orderFactory,$location,$rootScope,authService){

	var product = this;

	product.bindingType = [
		{name: 'Hard Binding', value: 'hard'},
		{name: 'Spiral Binding', value: 'spiral'}
	];

	product.addProduct = function(){

		if(!authService.getAuthData()){
			alert('please login to add product');
			return;
		}
		
		var fd = new FormData();
		
		fd.append('file', product.file);
		fd.append('fileType', 'pdf');
		fd.append('bindingType', product.selectedbindingType.value);
		fd.append('totalPages', product.noOfPage);
		fd.append('totalColorPage', product.noOfColoredPage);
		fd.append('colorPages', product.coloredPageToPrint);
		fd.append('quantity', product.printQuantity);
		fd.append('anyOtherRequest', product.comment);

		orderFactory.addProduct(fd)
			.then(function(response){
				cartService.addProduct(response.data);
				console.log(response.data);
				$rootScope.$emit('updateCart', {});
				$location.path('cart');
			});
	};
	
	$scope.validatePageNum=function(totalPages,colorPages){
		
		  $scope.validatePageNumStr="";
		  if(totalPages<0){
			  
			  $scope.validatePageNumStr="Number Total pages should be gretaer than 0";  
		  }
		  
		  if(colorPages<0){
			  
			  $scope.validatePageNumStr="Number of color  pages should be gretaer than 0";   
		  }
		  
		  if(colorPages>totalPages){
			  
			$scope.validatePageNumStr="Number of color pages can not be greater than total pages";   
		  }
		  //if(!angular.equals($scope.user1,){
			  
			// $scope.validatePageNumStr="Number of color pages can not be greater than total pages"; 
		  //}
	}
	
	$scope.validatePrintQuantity=function(qty){
		
		  $scope.validateQty="";
		  
		  if( qty < 1){
			  
			  $scope.validateQty="Quantity cshould be greater than 0 ";   
		  }
		  //if(!angular.equals($scope.user1,){
			  
			// $scope.validatePageNumStr="Number of color pages can not be greater than total pages"; 
		  //}
	}

}]);