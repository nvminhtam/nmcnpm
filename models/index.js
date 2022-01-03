const Sequelize = require('sequelize');
const initModels = require("./init-models");

// const sequelize = new Sequelize(process.env.DATABASE_URL);

const sequelize = new Sequelize("mysql://doadmin:07TZPIrkKqJrHQ0Q@db-mysql-sgp1-23535-do-user-9572625-0.b.db.ondigitalocean.com:25060/NMCNPM?ssl-mode=REQUIRED");

module.exports = {
    sequelize,
    models: initModels(sequelize)
};