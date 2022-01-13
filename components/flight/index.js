const { Router } = require('express');
const {
    searchFlightController,
} = require('./flightController');

const router = Router();

router.get('/search', searchFlightController);

module.exports = router;