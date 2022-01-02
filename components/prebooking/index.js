const express = require('express');
const router = express.Router();

const prebookingController = require('./prebookingController')

router.get('/', prebookingController.prebookingPage);

module.exports = router;