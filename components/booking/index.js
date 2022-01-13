const express = require('express');
const router = express.Router();

const bookingController = require('./bookingController')

router.get('/:flightId', bookingController.bookingDetailPage);
router.post('/:flightId', bookingController.bookingDetailForm);


module.exports = router;