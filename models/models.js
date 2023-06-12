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
database.history = require('./historyModel')(sequelize, Sequelize);

database.history.belongsTo(database.user, {
  foreignKey: 'user_id',
});
database.user.hasMany(database.history);

module.exports = database;
