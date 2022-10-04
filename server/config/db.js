const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_LOGIN,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

//let sql = 'SELECT * FROM news;';

// pool.execute(sql, (err, res) => {
//   if (err) throw err;

//   res.forEach((el) => {
//     console.log(el.status);
//   });
// });

module.exports = pool.promise();
