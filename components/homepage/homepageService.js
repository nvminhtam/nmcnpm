const { models, sequelize } = require('../../models');

module.exports = {
  seatClass: () =>
    models.seat_class.findAll({
      raw: true,
    }),
  findDepartAirport: () =>
    sequelize.query(
      `SELECT a.airport_name,a.id FROM airport a INNER JOIN flight f ON a.id=f.departure_airport_id GROUP BY a.airport_name,a.id;`
    ),
  findArrivalAirport: () =>
    sequelize.query(
      `SELECT a.airport_name,a.id FROM airport a INNER JOIN flight f ON a.id=f.arrival_airport_id GROUP BY a.airport_name,a.id;`
    ),
};
