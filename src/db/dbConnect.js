const { Pool, Client } = require('pg')

const connect = "postgres://andre-oficial:1234321@localhost:5432/recipes-app-db";

const pool = new Pool({
    connectionString: connect,
})

const client = new Client({
        connectionString: connect,
})

module.exports = {
    pool,
    client
}