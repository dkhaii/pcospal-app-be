const { nanoid } = require('nanoid');
const { responseClient } = require('../helper');
const database = require('../models/models');

const { bmiHistory } = database;

const calculateBmi = async (req, res) => {
  const { bodyWeight, bodyHeight } = req.body;

  const convertedHeightToMeter = bodyHeight / 100;

  const calculate = bodyWeight / (convertedHeightToMeter * convertedHeightToMeter);

  const roundCalculate = Math.round(calculate * 10) / 10;

  try {
    const { user } = req;
    const bmiId = nanoid(12);
    const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const updatedAt = createdAt;

    const datas = {
      bmiId,
      userId: user.userId,
      bmiData: roundCalculate,
      createdAt,
      updatedAt,
    };

    console.log(datas);

    const bmiData = await bmiHistory.create(datas);

    console.log(bmiData);

    return res.status(200).json(
      responseClient('success', 'calculated bmi and push to history in database', bmiData),
    );
  } catch (error) {
    return res.status(500).json(
      responseClient('error', 'failed push to database', error),
    );
  }
};

const showAllBmiHistory = async (req, res) => {
  try {
    const { user } = req;

    const userBmiDatas = await bmiHistory.findAll({
      where: {
        userId: user.userId,
      },
    });

    if (!userBmiDatas) {
      return res.status(200).json(
        responseClient('success', 'there is no bmi history', []),
      );
    }

    return res.status(200).json(
      responseClient('success', 'showing all user BMI data history', userBmiDatas),
    );
  } catch (error) {
    return res.status(500).json(
      responseClient('error', 'failed', error),
    );
  }
};

module.exports = { calculateBmi, showAllBmiHistory };
