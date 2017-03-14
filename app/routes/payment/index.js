var express = require('express');
var router = express.Router();

var paymentCtl = require("../../controllers/payment.controller");

router.
	route('/generateHash')
	.post(paymentCtl.generateHash);

module.exports = router;