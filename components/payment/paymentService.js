const { models } = require('../../models');
const sequelize = require('sequelize');

module.exports = {
    findBillById: (billId) => models.bill.findOne({
        raw: true,
        where: {
            id: billId
        }
    }),
    findPassengerByBillId: (billId) => models.traveler_details.findAll({
        raw: true,
        where: {
            bill_id: billId
        }
    }),
    findPrice: (flightId, seatClassId) => models.flight_has_seat_class.findOne({
        raw: true,
        where: {
            flight_id: flightId,
            seat_class_id: seatClassId
        }
    }),
    findFlightById: (flightId) => models.flight.findOne({
        raw: true,
        where: {
            id: flightId
        }
    }),
    findAirportById: (id) => models.airport.findOne({
        raw: true,
        where: {
            id: id
        }
    }),
}