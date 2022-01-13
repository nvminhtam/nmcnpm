var express = require('express');
const { sequelize } = require('../models');
var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
  const queryDepartAirPort = await sequelize.query(
    `SELECT a.airport_name FROM airport a INNER JOIN flight f ON a.id=f.departure_airport_id GROUP BY a.airport_name;`
  );
  const queryArrivalAirPort = await sequelize.query(
    `SELECT a.airport_name FROM airport a INNER JOIN flight f ON a.id=f.arrival_airport_id GROUP BY a.airport_name;`
  );
  res.render('index', {
    title: 'Express',
    arrivalAirport: [...new Set(queryDepartAirPort)][0],
    departAirport: [...new Set(queryArrivalAirPort)][0],
  });
});

module.exports = router;
