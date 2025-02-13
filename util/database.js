// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: `${process.env.HOST}`,
//     user:  `${process.env.USER}`,
//     password: `${process.env.PASSWORD}`,
//     database: `${process.env.DATABASE}`
// });

// module.exports = pool.promise();

const pg = require('pg');

const pool = new pg.Pool ({
    host: `${process.env.HOST}`,
    user: `${process.env.USER}`,
    database: `${process.env.DATABASE}`,
    password: `${process.env.PASSWORD}`
})

module.exports = pool;