const Pool = require("pg").Pool;

const connectDB = () => {
  const pool = new Pool({
    user: process.env.USERNAME,
    host: process.env.HOSTNAME,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
  });

  pool.connect((err, client, release) => {
    if (err) {
      return console.error("Error in connection " + err);
    }
    client.query("SELECT NOW()", (err, result) => {
      release();
      if (err) {
        return console.error("Error in release");
      }
      console.log("Connected to database!");
    });
  });
  return pool;
};

module.exports = connectDB;
