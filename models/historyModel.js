module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define(
    'History',
    {
      historyId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      datas: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: 'histories',
    },
  );

  return History;
};
