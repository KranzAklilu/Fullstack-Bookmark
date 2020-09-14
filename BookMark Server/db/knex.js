const environment = process.env.NODE_ENV || "development";
const config = require("../config/knexfile");

const environmentConfig = config[environment];

const knex = require("knex");

module.exports = knex(environmentConfig);
