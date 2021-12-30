var DataTypes = require("sequelize").DataTypes;
var _admin = require("./admin");
var _airport = require("./airport");
var _bill = require("./bill");
var _customer = require("./customer");
var _extend_flight = require("./extend_flight");
var _extend_flight_has_seat_class = require("./extend_flight_has_seat_class");
var _flight = require("./flight");
var _monthly_report = require("./monthly_report");
var _payment = require("./payment");
var _plane = require("./plane");
var _seat_class = require("./seat_class");
var _staff = require("./staff");
var _traveler_details = require("./traveler_details");
var _yearly_report = require("./yearly_report");

function initModels(sequelize) {
  var admin = _admin(sequelize, DataTypes);
  var airport = _airport(sequelize, DataTypes);
  var bill = _bill(sequelize, DataTypes);
  var customer = _customer(sequelize, DataTypes);
  var extend_flight = _extend_flight(sequelize, DataTypes);
  var extend_flight_has_seat_class = _extend_flight_has_seat_class(sequelize, DataTypes);
  var flight = _flight(sequelize, DataTypes);
  var monthly_report = _monthly_report(sequelize, DataTypes);
  var payment = _payment(sequelize, DataTypes);
  var plane = _plane(sequelize, DataTypes);
  var seat_class = _seat_class(sequelize, DataTypes);
  var staff = _staff(sequelize, DataTypes);
  var traveler_details = _traveler_details(sequelize, DataTypes);
  var yearly_report = _yearly_report(sequelize, DataTypes);

  customer.belongsToMany(flight, { as: 'Flight_id_flights', through: bill, foreignKey: "Customer_id", otherKey: "Flight_id" });
  extend_flight.belongsToMany(seat_class, { as: 'seat_class_id_seat_classes', through: extend_flight_has_seat_class, foreignKey: "extend_flight_id", otherKey: "seat_class_id" });
  flight.belongsToMany(customer, { as: 'Customer_id_customers', through: bill, foreignKey: "Flight_id", otherKey: "Customer_id" });
  seat_class.belongsToMany(extend_flight, { as: 'extend_flight_id_extend_flights', through: extend_flight_has_seat_class, foreignKey: "seat_class_id", otherKey: "extend_flight_id" });
  extend_flight.belongsTo(airport, { as: "departure_airport", foreignKey: "departure_airport_id"});
  airport.hasMany(extend_flight, { as: "extend_flights", foreignKey: "departure_airport_id"});
  extend_flight.belongsTo(airport, { as: "arrival_airport", foreignKey: "arrival_airport_id"});
  airport.hasMany(extend_flight, { as: "arrival_airport_extend_flights", foreignKey: "arrival_airport_id"});
  payment.belongsTo(bill, { as: "Bill", foreignKey: "Bill_id"});
  bill.hasMany(payment, { as: "payments", foreignKey: "Bill_id"});
  traveler_details.belongsTo(bill, { as: "bill", foreignKey: "bill_id"});
  bill.hasMany(traveler_details, { as: "traveler_details", foreignKey: "bill_id"});
  bill.belongsTo(customer, { as: "Customer", foreignKey: "Customer_id"});
  customer.hasMany(bill, { as: "bills", foreignKey: "Customer_id"});
  extend_flight_has_seat_class.belongsTo(extend_flight, { as: "extend_flight", foreignKey: "extend_flight_id"});
  extend_flight.hasMany(extend_flight_has_seat_class, { as: "extend_flight_has_seat_classes", foreignKey: "extend_flight_id"});
  bill.belongsTo(flight, { as: "Flight", foreignKey: "Flight_id"});
  flight.hasMany(bill, { as: "bills", foreignKey: "Flight_id"});
  extend_flight.belongsTo(flight, { as: "flight", foreignKey: "flight_id"});
  flight.hasMany(extend_flight, { as: "extend_flights", foreignKey: "flight_id"});
  bill.belongsTo(monthly_report, { as: "Monthly_Report", foreignKey: "Monthly_Report_id"});
  monthly_report.hasMany(bill, { as: "bills", foreignKey: "Monthly_Report_id"});
  extend_flight.belongsTo(plane, { as: "plane", foreignKey: "plane_id"});
  plane.hasMany(extend_flight, { as: "extend_flights", foreignKey: "plane_id"});
  extend_flight_has_seat_class.belongsTo(seat_class, { as: "seat_class", foreignKey: "seat_class_id"});
  seat_class.hasMany(extend_flight_has_seat_class, { as: "extend_flight_has_seat_classes", foreignKey: "seat_class_id"});
  monthly_report.belongsTo(yearly_report, { as: "Yearly_Report", foreignKey: "Yearly_Report_id"});
  yearly_report.hasMany(monthly_report, { as: "monthly_reports", foreignKey: "Yearly_Report_id"});

  return {
    admin,
    airport,
    bill,
    customer,
    extend_flight,
    extend_flight_has_seat_class,
    flight,
    monthly_report,
    payment,
    plane,
    seat_class,
    staff,
    traveler_details,
    yearly_report,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
