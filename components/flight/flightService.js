const { models } = require('../../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = {
    findPrice: (flightId, seatClassId) => models.flight_has_seat_class.findOne({
        raw: true,
        where: {
            flight_id: flightId,
            seat_class_id: seatClassId
        }
    }),
}