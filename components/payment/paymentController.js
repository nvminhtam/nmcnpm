const paymentService = require('./paymentService');
var Duration = require("duration");
module.exports = {
    payment: async(req, res) => {
        const billId = req.params.billId;
        console.log(billId);
        const bill = await paymentService.findBillById(billId);
        const passengers = await paymentService.findPassengerByBillId(billId);
        const price = await paymentService.findPrice(bill.flight_id, bill.seat_class_id);
        const flight = await paymentService.findFlightById(bill.flight_id);
        const departureAirport = await paymentService.findAirportById(flight.departure_airport_id);
        const arrivalAirport = await paymentService.findAirportById(flight.arrival_airport_id);
        console.log(bill);
        console.log(passengers);
        console.log(price.price);
        const total = passengers.length * price.price;
        res.render("payment/payment", { title: 'Payment', bill, passengers, price, flight, departureAirport, arrivalAirport, total, styles: ['payment'], scripts: ['payment.js'] });
    },
    confirmPayment: async(req, res) => {
        try {
            const billId = req.params.billId;
            await paymentService.updateStatus(billId);
            const passengers = await paymentService.findPassengerByBillId(billId);
            const bill = await paymentService.findBillById(billId);
            const extendFlightList = await paymentService.findExtendFlightById(bill.flight_id);
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
                    departure_province: extendFlightList[i]['extend_flights.departure_airport.province'],
                    departure_time: extendFlightList[i]['extend_flights.departure_time'],
                    arrival_airport: extendFlightList[i]['extend_flights.arrival_airport.symbol_code'],
                    arrival_airport_name: extendFlightList[i]['extend_flights.arrival_airport.airport_name'],
                    arrival_city: extendFlightList[i]['extend_flights.arrival_airport.city'],
                    arrival_province: extendFlightList[i]['extend_flights.arrival_airport.province'],
                    arrival_time: extendFlightList[i]['extend_flights.arrival_time'],
                    flight_time: flight_time,
                    ordinal_number: i + 1,
                }
            }
            const seatClass = await paymentService.findSeatClassById(bill.seat_class_id);
            const price = await paymentService.findPriceByIds(bill.flight_id, bill.seat_class_id);
            const total = price.price * passengers.length;
            res.render("bill/bill", { title: "Bill", bill, passengers, extendFlight, seatClass, price, total });
        } catch (err) {
            res.status(500).send({ err: err.message });
        }
    }
}