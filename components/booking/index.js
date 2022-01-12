const express = require('express');
const router = express.Router();

const bookingController = require('./bookingController')

router.get('/:id', bookingController.bookingDetailPage);
router.post('/:id', bookingController.bookingDetailForm);

router.get('/:id/ticket', bookingController.ticket);

module.exports = router;