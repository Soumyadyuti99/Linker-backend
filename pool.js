require("dotenv").config()
const pool = new Pool({
    user: process.env.user,
    password: process.env.password,
    host: "localhost",
    port: 5432,
    database: "Linker"
});

module.export = pool;