const slonik = require("slonik");

const DB_URL = "slonik://user1:1234@localhost:5432/prueba";

module.exports = slonik.createPool(DB_URL);
