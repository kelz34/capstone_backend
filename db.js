// this js is used to connect to our database 
const Pool = require("pg").Pool;

// instance this Pool
const pool = new Pool({
    // setup configuration 
    user: "kelvinlaurore",
    password: "ht+@3#74!",
    host: "localhost",
    port: 5432,
    database: "chemcards"
});

module.exports = pool;