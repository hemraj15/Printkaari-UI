

app.factory('locationFactory', ['$http', function($http){
	var locationFactory = {};
	var baseUrl = "http://printkaari.com:8080/printkaari-api/location/"


	locationFactory.getCountryList = function(){
		return $http.get(baseUrl + 'countries');
	}

	locationFactory.getStateListByCountryId = function(countryId){
		return $http.get(baseUrl + 'country/' + countryId + '/states');
	}

	locationFactory.getCityListByStateId = function(stateId){
		return $http.get(baseUrl + 'states/'+ stateId +'/cities')
	}

	return locationFactory;
}]);