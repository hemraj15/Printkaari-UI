app.controller('payment-controller',['$scope', '$http', '$window', '$route','$routeParams','loginDataService','$location', 'locationFactory', 'authFactory', '$rootScope', function($scope,$http,$window, $route,$routeParams,loginDataService,$location,locationFactory, authFactory, $rootScope){
    
	//$scope.errorMessage = "";
	//$scope.loginBox = true;
	//$scope.signupBoxStepOne = false;
	//$scope.signupBoxStepTwo = false;
	//$scope.resetPasswordBox = false;
	//$scope.forgetPasswordBox = false;
	//$scope.resetPasswordSuccessBox = false;
	//$scope.customerDetailsBox=true;
	
	
	// var  reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,3})$/;
    // var zipCodeRegex = new RegExp("^[1-9][0-9]{4,5;
    // var expRegex = new RegExp("^[0-9]{1,10}$");
    // var currencyRegex = new RegExp("^[a-zA-Z]*$");
    // var urlRegex = /https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,}/;
    // var docRegex = new RegExp("(.?)\.(docx|doc)$");
         $scope.getPaymentCreds=function(){
	
	          var data={
				  
				  
			  }
			  
			  
         }

     function.getPaymentCreds();
	$scope.processPayment=function(){
		
		var querystring = require('querystring'); 
      var http = require('https'); 

       var data = querystring.stringify({ 
       merchantKey:"qSZkUBHF",
       merchantSalt :"GSBMZPYTk7",	
       merchantTransactionIds:"11111" 
	   
      }); 
     var options = { 
          hostname: 'www.payumoney.com', 
          port: 443, 
          path: '/payment/op/getPaymentResponse?'+data, 
          method: 'POST', 
          headers: { 
               'Content-Type': 'application/json', 
               'Content-Length': Buffer.byteLength(data), 
               'content': data, 
               'accept': '*/*', 
               'Authorization': 'pxiepTvA9GJ2Hm6cVFGranRGH/r4+82LvXiBnQN6KTI=' 
       } 
   }; 

          var req = http.request(options, function(res) { 
           res.setEncoding('utf8'); 
           res.on('data', function(chunk) {    // data will be available in callback 
           console.log("body: " + chunk); 
           }); 
       }); 
          req.on('error',function(e){ 
          console.log('Error'+ e.message); 
     }); 
        req.write(data); 
        req.end();
		
	}	

}]);
