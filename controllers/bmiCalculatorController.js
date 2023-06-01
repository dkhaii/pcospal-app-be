const { responseClient } = require('../helper');

const calculateBmi = (req, res) => {
  const { bodyWeight, bodyHeight } = req.body;

  const convertedHeightToMeter = bodyHeight / 100;
  console.log(convertedHeightToMeter);

  const calculate = bodyWeight / (convertedHeightToMeter * convertedHeightToMeter);

  const roundCalculate = Math.round(calculate * 10) / 10;
  console.log(roundCalculate);

  return res.status(200).json(
    responseClient('success', 'calculated bmi', { bmi: roundCalculate }),
  );
};

module.exports = calculateBmi;
