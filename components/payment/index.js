const express = require('express');
const router = express.Router();

const paymentController = require('./paymentController')

router.get('/:id', paymentController.payment);

module.exports = router;