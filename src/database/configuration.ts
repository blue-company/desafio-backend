// const mysql = require('mysql');
import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

export class Connection{
    constructor(public connected = Connection.connection){}

    protected static connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE
    })
}