import dotenv from 'dotenv';
import knex from 'knex';

dotenv.config();

export abstract class Connection{
    // protected static connection = mysql.createConnection({
    //     host: process.env.DB_HOST,
    //     user: process.env.DB_USER,
    //     password: process.env.DB_PASS,
    //     database: process.env.DB_DATABASE
    // })

    protected static conection = knex({
        client: 'mysql',
        connection: {
          host: '127.0.0.1',
          port: 3306,
          user: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_DATABASE,
        },
      })
}