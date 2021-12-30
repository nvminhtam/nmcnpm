import { runServerWithPort } from './index';
import path from 'path';
import dotenv from 'dotenv';
import mysqlConnection from './helpers/mysql-connection';

dotenv.config({ path: path.join(__dirname, '../.env') });

const runServer = async () => {
  try {
    await mysqlConnection().authenticate();
    runServerWithPort(process.env.PORT);
  } catch (error) {
    console.log(error);
  }
};

runServer();
