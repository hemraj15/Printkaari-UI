

app.controller('myProfileController',['$http', function($http){
	var profile = this;



	profile.message = "this is profile section and it is working";

	var url = "http://printkaari.com:8080/printkaari-api/customers/profile?emailId=",
	emailId = "test5@test.com";

	url = url + emailId;
	
	$http.get(url)
		.then(function(res){
			profile.customerDetail = res.data;
		});
}]); 