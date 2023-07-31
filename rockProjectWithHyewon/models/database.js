var mysql = require('mysql');

require("dotenv").config();

const db = mysql.createPool({
    connectionLimit: 100,
    host: process.env.host,
    port: process.env.port,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});
 
module.exports = db