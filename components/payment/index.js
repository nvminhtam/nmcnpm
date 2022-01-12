const express = require('express');
const router = express.Router();

const paymentController = require('./paymentController')

router.get('/:billId', paymentController.payment);

module.exports = router;