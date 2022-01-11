const bookingService = require('./bookingService');
var Duration = require("duration");
module.exports = {
    prebookingPage: async(req, res) => {

    },
    bookingDetail: async(req, res) => {
        try {
            const { id } = req.params
            const { passenger, seatclass } = req.query;
            const flight = await bookingService.findFlightById(id);
            const departureAirport = await bookingService.findAirportById(flight.departure_airport_id);
            const arrivalAirport = await bookingService.findAirportById(flight.arrival_airport_id);
            const extendFlightList = await bookingService.findExtendFlightById(id);
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
                    ordinal_number: i + 1,
                }
            }
            const seatClass = await bookingService.findSeatClassById(seatclass);
            const price = await bookingService.findPriceByIds(id, seatclass);
            // console.log("EXTEND FLIGHT", extendFlight);
            // console.log("a FLIGHT", transit);
            // console.log("b FLIGHT", flight);
            // console.log("c FLIGHT", departureAirport);
            // console.log("d FLIGHT", arrivalAirport);
            // console.log("e FLIGHT", price);
            // console.log("f FLIGHT", seatClass);
            const total = price.price * passenger;
            const passengerList = new Array();
            for (let i = 0; i < passenger; i++) {
                passengerList[i] = {
                    ordinal_number: i + 1,
                }
            }
            res.render('booking/bookingDetail', { title: 'Booking Detail', passenger, passengerList, seatClass, extendFlight, transit, flight, departureAirport, arrivalAirport, price, total, styles: ['booking'], scripts: ['booking.js'] });
        } catch (err) {
            res.status(500).send({ err: err.message });
        }
    },
    ticket: (req, res) => {

        const passengers = [{
            firstName: "Minh",
            lastName: "Tam",
            email: "minhtam@gmail.com"
        }]
        const flights = [{
                from: "Ho Chi Minh",
                timeFrom: "5h",
                to: "Da Nang",
                timeArrive: "6h",
                plane: "Airbus 123",
                class: "Economy"

            },
            {
                from: "Da Nang",
                timeFrom: "6h30",
                to: "Ha Noi",
                timeArrive: "7h15",
                plane: "Airbus 123",
                class: "Economy"
            },

        ]
        const bill = {
            code: "123",
            passengers: passengers,
            flights: flights,
        }

        res.render('bill/bill', { title: 'Bill', bill: bill });
    }
}