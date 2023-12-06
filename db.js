// this js is used to connect to our database 
const Pool = require("pg").Pool;

// instance this Pool
const pool = new Pool({
    // setup configuration 
    user: "kelvinlaurore",
    password: "Proton34!",
    host: "localhost",
    port: 5432,
    database: "periodic_table"
});

module.exports = pool;