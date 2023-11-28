import mysql from "mysql";
import "dotenv/config";

export const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect(function (err:any) {
  if (err) throw err;
  console.log("Connected!");
});

// connection.end();

module.exports = { connection };