const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to database...');
  } catch (error) {
    console.log('Unable to connect to database: ', error);
  }
})();

const database = {};

database.Sequelize = Sequelize;
database.sequelize = sequelize;

database.user = require('./userModel')(sequelize, Sequelize);

database.sequelize.sync({ force: false });

module.exports = database;
