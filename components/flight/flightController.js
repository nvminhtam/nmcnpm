const { DataTypes } = require('sequelize');
const Flight = require('../../models/flight');
const { sequelize } = require('../../models/index');
const { compareAsc, format } = require('date-fns');
module.exports = {
  searchFlightController: async (req, res, next) => {
    const { from, to, checkin, checkout, flight_class, adult, children } =
      req.query;
    const query =
      await sequelize.query(`SELECT f.id, f.price price,a.city as from_city, b.city as to_city, a.symbol_code from_flight_code, b.symbol_code to_flight_code,
       f.arrival_time,f.departure_time
FROM flight f
    INNER JOIN airport a
        ON f.arrival_airport_id=a.id
    INNER JOIN airport b
        ON f.departure_airport_id=b.id
WHERE a.city LIKE '%${from}%' AND b.city LIKE '%${to}%';
`);
    const uniqueQuery = new Set([...query]);
    const flights = [...uniqueQuery][0].map((flight) => {
      return {
        ...flight,
        arrival_time: format(new Date(flight.arrival_time), 'yyyy-MM-dd HH:mm'),
        departure_time: format(
          new Date(flight.departure_time),
          'yyyy-MM-dd HH:mm'
        ),
      };
    });
    return res.render('flight/search', {
      title: 'Search',
      flights,
    });
  },
};
