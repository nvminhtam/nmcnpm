const bookingService = require('./bookingService');
var Duration = require("duration");
module.exports = {
    bookingDetailPage: async(req, res) => {
        try {
            const { flightId } = req.params
            const { passenger, seatclass } = req.query;
            const flight = await bookingService.findFlightById(flightId);
            const departureAirport = await bookingService.findAirportById(flight.departure_airport_id);
            const arrivalAirport = await bookingService.findAirportById(flight.arrival_airport_id);
            const extendFlightList = await bookingService.findExtendFlightById(flightId);
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
            const price = await bookingService.findPriceByIds(flightId, seatclass);
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
    bookingDetailForm: async(req, res) => {
        try {
            console.log(req.body);
            const { contactLastName, contactFirstName, contactTelephone, contactEmail, price, flightId, seatClassId, passenger } = req.body;
            const total = price * passenger.length;
            const numOfPass = passenger.length;
            const bill = await bookingService.addBill(contactLastName, contactFirstName, contactTelephone, contactEmail, numOfPass, total, flightId, seatClassId, passenger);
            await bookingService.addTravelerDetail(bill.id, passenger);
            const oldFlightValue = await bookingService.findSeatCountByFlightId(bill.flight_id);
            const oldFlHSCValue = await bookingService.findSeatCountByIds(bill.flight_id, bill.seat_class_id);
            const newFlightValue = oldFlightValue.booked_seat_count + numOfPass;
            const newFlHSCValue = oldFlHSCValue.booked_seat_count + numOfPass;
            await bookingService.updateSeatCountByFlightId(bill.flight_id, newFlightValue);
            await bookingService.updateSeatCountByIds(bill.flight_id, bill.seat_class_id, newFlHSCValue);
            res.status(200).send({ billId: bill.id });
        } catch (err) {
            res.status(500).send({ err: err.message });
        }
    },
}