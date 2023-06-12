const { Sequelize } = require('sequelize');
const parseAppYaml = require('./environment');

const {
  DB_DATABASE,
  DB_USER,
  DB_PASSWORD,
  DB_DIALECT,
  DB_SOCKET,
} = parseAppYaml();

const database = new Sequelize(
  DB_DATABASE,
  DB_USER,
  DB_PASSWORD,
  {
    dialect: DB_DIALECT,
    dialectOptions: {
      socketPath: `/cloudsql/${DB_SOCKET}`,
    },
  },
);

module.exports = database;
