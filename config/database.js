const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const parseAppYaml = require('./environment');

const filePath = path.resolve('./serviceaccountkey.json');
const serviceAccountKey = fs.readFileSync(filePath);

const {
  DB_HOST,
  DB_DATABASE,
  DB_USER,
  DB_PASSWORD,
  DB_DIALECT,
  DB_SOCKET,
} = parseAppYaml();

const database = new Sequelize({
  dialect: DB_DIALECT,
  dialectOptions: {
    socketPath: `/cloudsql/${DB_SOCKET}`,
  },
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  ssl: {
    ca: serviceAccountKey,
  },
});

module.exports = database;
