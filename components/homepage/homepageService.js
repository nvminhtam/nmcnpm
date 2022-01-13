const { models } = require('../../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = {
    seatClass: () => models.seat_class.findAll({
        raw: true,
    }),
}