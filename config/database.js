const { Sequelize } = require('sequelize');

let database;

if (process.env.APP_ENV === 'production') {
  database = new Sequelize({
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      socketPath: `/cloudsql/${process.env.DB_SOCKET}`,
    },
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    pool: {
      max: 15,
      min: 5,
      acquire: 30000,
      idle: 15000,
    },
  });
}

if (process.env.APP_ENV === 'development') {
  database = new Sequelize({
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    pool: {
      max: 15,
      min: 5,
      acquire: 30000,
      idle: 15000,
    },
  });
}

module.exports = database;
