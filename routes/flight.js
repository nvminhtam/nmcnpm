const { Router } = require('express');
const {
  searchFlightController,
} = require('../components/prebooking/flightController');

const router = Router();

router.get('/search', searchFlightController);

module.exports = router;
