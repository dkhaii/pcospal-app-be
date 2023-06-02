module.exports = (sequelize, DataTypes) => {
  const BmiHistory = sequelize.define(
    'BmiHistory',
    {
      bmiId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      bmiData: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: 'bmi_history',
    },
  );

  return BmiHistory;
};
