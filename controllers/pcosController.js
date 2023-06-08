const {
  validateNumberData, responseClient,
} = require('../helper');

const validateYesNo = (value) => {
  if (value === 'Yes') {
    return 1;
  }

  return 0;
};

const validateYesNoDatas = (userAnswer) => {
  const datas = {};

  for (let i = 0; i < userAnswer.length; i++) {
    const obj = userAnswer[i];
    const objData = obj.data;

    datas[obj.type] = validateYesNo(objData);
  }

  return datas;
};

const validateDatas = (userAnswer) => {
  const responseError = {};

  for (let i = 0; i < userAnswer.length; i++) {
    const obj = userAnswer[i];
    const objData = obj.data;

    const numData = validateNumberData(objData);

    if (numData === false) {
      const objType = obj.type;
      responseError[objType] = `${objType} must be number`;
    }
  }

  return responseError;
};

const validateCycleData = (cycle) => {
  if (cycle === 'regular') {
    return 2;
  }

  return 4;
};

const filterDataOutput = (datas) => {
  const filteredData = {};

  for (let i = 0; i < datas.length; i++) {
    const obj = datas[i];
    const objType = obj.type;
    const objData = obj.data;

    filteredData[objType] = objData;
  }

  return filteredData;
};

const getUserAnswer = (req, res) => {
  const {
    age,
    bmi,
    pulseRate,
    cycle,
    yearsOfMarriage,
    hip,
    waist,
    weightGain,
    hairGrowth,
    skinDarkening,
    hairLoss,
    pimples,
    fastFood,
  } = req.body;

  const yesNoDatas = [
    {
      type: 'weightGain',
      data: weightGain,
    },
    {
      type: 'hairGrowth',
      data: hairGrowth,
    },
    {
      type: 'skinDarkening',
      data: skinDarkening,
    },
    {
      type: 'hairLoss',
      data: hairLoss,
    },
    {
      type: 'pimples',
      data: pimples,
    },
    {
      type: 'fastFood',
      data: fastFood,
    },
  ];

  const validatedYesNoDatas = validateYesNoDatas(yesNoDatas);

  const validatedCycleData = validateCycleData(cycle);

  const datas = [
    {
      type: 'age',
      data: age,
    },
    {
      type: 'bmi',
      data: bmi,
    },
    {
      type: 'pulseRate',
      data: pulseRate,
    },
    {
      type: 'cycle',
      data: validatedCycleData,
    },
    {
      type: 'yearsOfMarriage',
      data: yearsOfMarriage,
    },
    {
      type: 'hip',
      data: hip,
    },
    {
      type: 'waist',
      data: waist,
    },
    {
      type: 'weightGain',
      data: validatedYesNoDatas.weightGain,
    },
    {
      type: 'hairGrowth',
      data: validatedYesNoDatas.hairGrowth,
    },
    {
      type: 'skinDarkening',
      data: validatedYesNoDatas.skinDarkening,
    },
    {
      type: 'hairLoss',
      data: validatedYesNoDatas.hairLoss,
    },
    {
      type: 'pimples',
      data: validatedYesNoDatas.pimples,
    },
    {
      type: 'fastFood',
      data: validatedYesNoDatas.fastFood,
    },
  ];

  const validatedDatas = validateDatas(datas);

  if (Object.keys(validatedDatas).length > 0) {
    return res.status(401).json(validatedDatas);
  }

  const filteredDataOutput = filterDataOutput(datas);

  return res.status(200).json(
    responseClient('success', 'getting user input', filteredDataOutput),
  );
};

module.exports = getUserAnswer;
