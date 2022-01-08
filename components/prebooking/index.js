const express = require('express');
const router = express.Router();

const prebookingController = require('./prebookingController')

router.get('/:id', prebookingController.prebookingPage);

router.get('/:id/detail', prebookingController.bookingDetail);

router.get('/:id/detail/ticket', prebookingController.ticket);

module.exports = router;