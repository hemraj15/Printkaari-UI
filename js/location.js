var app = angular.module('locationApp',[]);

app.controller('locationController',['$scope', '$http', '$window',function($scope,$http,$window){

$scope.getCountryList=function(){
		
		var onSuccess = function(response){
			$scope.countryList=response.data;
			console.log(response);
		};
		
		var onError = function(error){
			console.log(error);				
		};
		
		$http.get('http://162.220.61.86:8080/printkaari-api/location/countries').then(onSuccess, onError);
	}
	
		$scope.getStateListByCountryId=function(){
		
		var data = {
			"countryId" : $scope.countryId
			
		}
		console.log(data);
		
        var _config = {
            headers: {
            	'Content-Type' : 'application/json',
			}
        };
		var onSuccess = function(response){
			$scope.stateList=response.data;
			console.log(response);
		};
		
		var onError = function(error){
			console.log(error);				
		}
		
		$http.post('http://162.220.61.86:8080/printkaari-api/location/country/'+$scope.countryId+'/states' ,data,_config).then(onSuccess, onError);
	}
	
	$scope.getCityListByStateId=function(){
		
		var data = {
			"stateId" : $scope.stateId
			
		}
		console.log(data);
		
        var _config = {
            headers: {
            	'Content-Type' : 'application/json',
			}
        };
		var onSuccess = function(response){
			$scope.cityList=response.data;
			console.log(response);
		};
		
		var onError = function(error){
			console.log(error);				
		};
		
		$http.post('http://162.220.61.86:8080/printkaari-api/location/states/'+$scope.stateId+'/cities' ,data,_config).then(onSuccess, onError);
	}
}]);