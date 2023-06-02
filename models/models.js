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

database.sequelize.sync({ force: false });

database.user = require('./userModel')(sequelize, Sequelize);
database.bmiHistory = require('./bmiHistoryModel')(sequelize, Sequelize);

database.bmiHistory.belongsTo(database.user, {
  foreignKey: 'userId',
});
database.user.hasMany(database.bmiHistory);

module.exports = database;
