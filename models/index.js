const Sequelize = require('sequelize');
const initModels = require("./init-models");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
        useUTC: false, //for reading from database
        dateStrings: true,
        typeCast: function(field, next) { // for reading from database
            if (field.type === 'DATETIME') {
                return field.string()
            }
            return next()
        },
    },
    timezone: '+07:00'
});

// const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     dialect: 'mysql',
//     dialectOptions: {
//         useUTC: false, //for reading from database
//         dateStrings: true,
//         typeCast: function(field, next) { // for reading from database
//             if (field.type === 'DATETIME') {
//                 return field.string()
//             }
//             return next()
//         },
//     },
//     timezone: '+07:00'
// });

module.exports = {
    sequelize,
    models: initModels(sequelize)
};