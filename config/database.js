const { Sequelize } = require('sequelize');

const database = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      socketPath: `/cloudsql/${process.env.DB_SOCKET}`,
    },
  },
);

module.exports = database;
