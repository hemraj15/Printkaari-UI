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
	surl: "http://printkaari.com/api/payment/success",
	furl: "http://printkaari.com/api/payment/failure",
	service_provider: "payu_paisa",
	udf1: 'a',
	udf2: 'b',
	udf3: 'c',
	udf4: 'd',
	udf5: 'e'
};

var finalParams = {};

var hashParams = ['key','txnid','amount','productinfo','firstname','email','udf1','udf2','udf3','udf4','udf5','a','b','c','d','e'];

paymentCtl._populateParams = function(tansactionId){

	var resParams = {
		txnid: tansactionId,
		amount: 1,
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

paymentCtl._generateString = function(params){
	var string = '';
	
	paymentCtl._populateParams(params.tansactionId);
	
	for (var i = 0; i < hashParams.length; i++) {
		string += finalParams[hashParams[i]] || '';
		string += '|';
	}

	string+= creds.merchantSalt;

	return string;
}

paymentCtl.generateParams = function(req, res){
	var hash = sha512(paymentCtl._generateString(req.body));

	finalParams['hash'] = hash;
	
	res
		.status(200)
		.json(finalParams);
}

paymentCtl._validateParams = function(params){
	return true;
};

paymentCtl._encodeParams = function(params){

	var string = '';

	for(var key in params){
		if(params.hasOwnProperty(key)){
			string = key + '=' + encodeURIComponent(params[key]);
		}
	}

	return string;
}

paymentCtl.processSuccess = function(req, res){
	
	if (paymentCtl._validateParams(req.body)) {
		var querystring = paymentCtl._encodeParams(req.body);
		res.redirect('/#!/payment/success?' + querystring);
	}
};


paymentCtl.processFailure = function(req, res){
	
	if(paymentCtl._validateParams(req.body)){
		var querystring = paymentCtl._encodeParams(req.body);
		res.redirect('/#!/payment/failure?' + querystring);
	}
};

module.exports = paymentCtl;
