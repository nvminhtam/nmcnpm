const paymentService = require('./paymentService');
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
        res.render("payment/payment", { title: 'Payment', bill, passengers, price, flight, departureAirport, arrivalAirport, styles: ['payment'] });
    }
}