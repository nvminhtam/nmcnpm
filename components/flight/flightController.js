const { DataTypes } = require('sequelize');
const Flight = require('../../models/flight');
const { sequelize } = require('../../models/index');
const { compareAsc, format } = require('date-fns');
const flightService = require('./flightService');
module.exports = {
    searchFlightController: async(req, res, next) => {
        const { from, to, checkin, checkout, seat_class, passenger } = req.query;
        console.log(from, to, seat_class);
        try {
            const query =
                await sequelize.query(`SELECT DISTINCT f.id,a.city as from_city, b.city as to_city, a.symbol_code from_flight_code, b.symbol_code to_flight_code,
       f.arrival_time,f.departure_time, a.airport_name from_airport, b.airport_name to_airport, p.airline_name, fhsc.price price, sc.name seat_class_name
FROM flight f
    INNER JOIN airport a
        ON f.arrival_airport_id=a.id
    INNER JOIN airport b
        ON f.departure_airport_id=b.id
    INNER JOIN  extend_flight ef on a.id = ef.arrival_airport_id
    INNER JOIN plane p on ef.plane_id = p.id
    INNER JOIN flight_has_seat_class fhsc on f.id = fhsc.flight_id
    INNER JOIN seat_class sc ON fhsc.seat_class_id = sc.id
WHERE a.id=${Number(from)} AND b.id=${Number(to)} AND seat_class_id=${Number(
          seat_class
        )};
`);
            // console.log(new Date(checkin).toDateString());
            const compareDateString = (date1, date2) => {
                return (
                    new Date(date1).toDateString() === new Date(date2).toDateString()
                );
            };
            const uniqueQuery = [...new Set(query)][0];
            const flights = [...uniqueQuery]
                .filter((flight) => {
                    return checkin && checkout ?
                        compareDateString(flight.arrival_time, checkin) &&
                        compareDateString(flight.departure_time, checkout) :
                        flight;
                })
                .map((flight) => {
                    return {
                        ...flight,
                        arrival_time: format(
                            new Date(flight.arrival_time),
                            'yyyy-MM-dd HH:mm'
                        ),
                        departure_time: format(
                            new Date(flight.departure_time),
                            'yyyy-MM-dd HH:mm'
                        ),
                    };
                });
            console.log(flights);
            return res.render('flight/search', {
                title: 'Search',
                flights,
                seat_class,
                passenger,
            });
        } catch (error) {
            return res.render('flight/search', {
                title: 'Search',
                flights: [],
                seat_class,
                passenger,
            });
        }
    },
};