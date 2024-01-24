require("dotenv").config()
const {Pool} = require('pg')

const pool = new Pool({
    user: process.env.user,
    password: process.env.password,
    host: process.env.host,    
    port: 5432,
    database: "linker"
});

module.exports = pool;