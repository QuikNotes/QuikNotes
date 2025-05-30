const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createdb({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

//connection
db.getConnection()
  .then(connection => {
    console.log('Successfully connected to database!');
    connection.release();
  })
  .catch(err => {
    console.error('Error connecting to database:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.');
    }
    // process.exit(1);
  });

module.exports = db;