require('dotenv');
const { Sequelize } = require('sequelize');

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  DB_DIALECT,
} = process.env;

const database = new Sequelize(
  DB_DATABASE,
  DB_USER,
  DB_PASSWORD,
  {
    host: DB_HOST,
    dialect: DB_DIALECT,
  },
);

module.exports = database;
