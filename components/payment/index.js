const express = require('express');
const router = express.Router();

const paymentController = require('./paymentController')

router.get('/:billId', paymentController.payment);
router.post('/:billId', paymentController.confirmPayment);

module.exports = router;