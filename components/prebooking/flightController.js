const flightModel = require('../../models/flight');
module.exports = {
  searchFlightController: (req, res, next) => {
    const { from, to, checkin, checkout, flight_class, adult, children } =
      req.query;
    
    res.render('flight/search', { title: 'Prebooking' });
  },
};
