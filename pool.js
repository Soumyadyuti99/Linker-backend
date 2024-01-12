require("dotenv").config()
const {Pool} = require('pg')

const pool = new Pool({
    user: process.env.user,
    password: process.env.password,
    host: "localhost",
    port: 5432,
    database: "Linker"
});

module.exports = pool;