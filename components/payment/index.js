const express = require('express');
const router = express.Router();

const paymentController = require('./paymentController')

router.get('/payment/:id', paymentController.payment);

module.exports = router;