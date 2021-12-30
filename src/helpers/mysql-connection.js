import sequelize from 'sequelize';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../../.env') });

// const mysqlConnection = () => {
//   const mySqlSequelize = new sequelize(
//     'NMCNPM',
//     process.env.DATABASE_USERNAME,
//     process.env.DATABASE_PASSWORD,
//     {
//       host: process.env.DATABASE_URL,
//       port: 25060,
//       dialect: 'mysql',
//       dialectOptions: {
//         ssl: {
//            require: true
//         }
//       }
//     }
    
//   ); 
//   return mySqlSequelize;
// }; 
const mysqlConnection = () => {
  const mySqlSequelize = new sequelize("mysql://doadmin:07TZPIrkKqJrHQ0Q@db-mysql-sgp1-23535-do-user-9572625-0.b.db.ondigitalocean.com:25060/NMCNPM?ssl-mode=REQUIRED"); 
  return mySqlSequelize;
}; 

export default mysqlConnection;
 