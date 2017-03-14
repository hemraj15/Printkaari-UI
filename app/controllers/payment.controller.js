var sha512 = require('js-sha512').sha512;
var paymentCtl = {};

var creds = {

	merchantKey	: "qSZkUBHF",
	merchantSalt: "GSBMZPYTk7",
	authHeader	: "pxiepTvA9GJ2Hm6cVFGranRGH/r4+82LvXiBnQN6KTI=",
	merchantId	: 5499122
};

var initialParams = {
	key: 'qSZkUBHF',
	txnid: '',
	amount: '',
	firstname: '',
	email: '',
	phone: '',
	productinfo: '',
	surl: "http://printkaari.com/#!/payment/success",
	furl: "http://printkaari.com/#!/payment/failure",
	service_provider: "payu_paisa",
	udf1: 'a',
	udf2: 'b',
	udf3: 'c',
	udf4: 'd',
	udf5: 'e'
};

var finalParams = {};

var hashParams = ['key','txnid','amount','productinfo','firstname','email','udf1','udf2','udf3','udf4','udf5','a','b','c','d','e'];

paymentCtl.populateParams = function(){

	var resParams = {
		txnid: 3,
		amount: 400,
		firstname: 'kamlesh',
		email: 'kdfl@kdlfj.ocm',
		phone: '9754325905',
		productinfo: 'huale haule'
	};

	for (var prop in initialParams) {
		if (initialParams.hasOwnProperty(prop)) {
			finalParams[prop] = resParams[prop] || initialParams[prop];
		} 
	}
};

paymentCtl.generateHash = function(req, res){
	var string = '';
	var hash = '';
	
	console.log(req.body);
	paymentCtl.populateParams();
	for (var i = 0; i < hashParams.length; i++) {
		string += finalParams[hashParams[i]] || '';
		string += '|';
	}

	string+= creds.merchantSalt;
	hash = sha512(string);

	console.log(string);

	finalParams['hash'] = hash;
	
	var data = {
		params : finalParams,
		header : {
			Authorization: creds.authHeader
		}
	}

	res
		.status(200)
		.json(finalParams);
}

paymentCtl.processSuccess = function(req, res){

};


paymentCtl.processFailure = function(req, res){

};

module.exports = paymentCtl;
