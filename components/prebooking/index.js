const express = require('express');
const router = express.Router();

const prebookingController = require('./prebookingController')

router.get('/:flightId', prebookingController.prebookingPage);

module.exports = router;