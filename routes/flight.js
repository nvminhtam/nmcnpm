const { Router } = require('express');
const {
  searchFlightController,
} = require('../components/flight/flightController');

const router = Router();

router.get('/search', searchFlightController);

module.exports = router;
