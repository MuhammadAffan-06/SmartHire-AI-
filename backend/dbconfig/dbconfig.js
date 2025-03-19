const pg = require("pg");
require("dotenv").config();
const { Pool, Client } = pg;
const connection = process.env.POSTGRES_CON_STRING;

const pool = new Pool({
  connectionString: connection,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error(err.stack);
  } else {
    console.log("Database connected successfully");
  }
  release();
});

module.exports = pool;
