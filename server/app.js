const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const port = process.env.PORT || 3002;

// create the connection to database
const dbConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_LOGIN,
  password: process.env.DB_PASSWORD,
});

const app = express();
app.use(express.json());

// check the connection db
dbConnection.connect((err) => {
  if (err) throw new Error(err);
  console.log('db connected success');
});

const start = () => {
  try {
    app.listen(port, () => console.log(`Server is running on ${port} PORT!`));
  } catch (error) {
    console.log(error);
  }
};

start();

// b3BlbnNzaC1rZXktdjEAAAAACmFlczI1Ni1jdHIAAAAGYmNyeXB0AAAAGAAAABBkzltw6Q
// 1Jdamwq1EF8ZvDAAAAEAAAAAEAAAAzAAAAC3NzaC1lZDI1NTE5AAAAIGh3I8G1TpV9ZdWi
// LBg7Ytjmd5WKk1cYSoJefngUJFYyAAAAoM5gaJlVQEZ8eAlClBzIR8hSlfctZIldxLWKbf
// 8KrKXyfS8cbgH1svxI0bQBohgZGWZDclHXXNaqG3E84PJnesBMlML9UCYbMnuKdkbauU1/
// WA34I8R1N3k7b+cSqrxMgWWj1qbSu1WH9bGO/N3arwNSXc+AjztFqFk17Wai1JwPO8w7kB
// uxql1Ywa3j07TD+yTfJpOvL4XcGBTtg1sB1U8=
