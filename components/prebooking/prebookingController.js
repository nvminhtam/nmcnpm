const prebookingService = require('./prebookingService');
var Duration = require("duration");
module.exports = {
    prebookingPage: async(req, res) => {
        const { flightId } = req.params
        const { passenger, seatclass } = req.query;
        const flight = await prebookingService.findFlightById(flightId);
        const departureAirport = await prebookingService.findAirportById(flight.departure_airport_id);
        const arrivalAirport = await prebookingService.findAirportById(flight.arrival_airport_id);
        const extendFlightList = await prebookingService.findExtendFlightById(flightId);
        var transit;
        if (extendFlightList.length == 1) {
            transit = 'Direct';
        }
        if (extendFlightList.length == 2) {
            transit = '1 transit';
        }
        if (extendFlightList.length > 2) {
            transit = extendFlightList.length - 1 + ' transits';
        }
        var extendFlight = new Array();
        for (let i = 0; i < extendFlightList.length; i++) {
            const depTime = new Date(extendFlightList[i]['extend_flights.departure_time']);
            const arrTime = new Date(extendFlightList[i]['extend_flights.arrival_time']);
            const duration = new Duration(depTime, arrTime);
            const flight_time = duration.toString("%Hsh%Mm");
            extendFlight[i] = {
                id: extendFlightList[i].id,
                plane: extendFlightList[i]['extend_flights.plane.aircraft_number'],
                airline_name: extendFlightList[i]['extend_flights.plane.airline_name'],
                departure_airport: extendFlightList[i]['extend_flights.departure_airport.symbol_code'],
                departure_airport_name: extendFlightList[i]['extend_flights.departure_airport.airport_name'],
                departure_city: extendFlightList[i]['extend_flights.departure_airport.city'],
                departure_time: extendFlightList[i]['extend_flights.departure_time'],
                arrival_airport: extendFlightList[i]['extend_flights.arrival_airport.symbol_code'],
                arrival_airport_name: extendFlightList[i]['extend_flights.arrival_airport.airport_name'],
                arrival_city: extendFlightList[i]['extend_flights.arrival_airport.city'],
                arrival_time: extendFlightList[i]['extend_flights.arrival_time'],
                flight_time: flight_time,
            }
        }
        const seatClass = await prebookingService.findSeatClassById(seatclass);
        const price = await prebookingService.findPriceByIds(flightId, seatclass);
        const total = price.price * passenger;
        res.render('prebooking/prebooking', { title: 'Prebooking', passenger, seatClass, extendFlight, transit, flight, departureAirport, arrivalAirport, price, total, styles: ['prebooking'] });
    },
}