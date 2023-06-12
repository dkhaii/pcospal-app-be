const {
  responseClient,
  responseCustom,
} = require('../helper');

const validateNumberData = (value) => {
  if (typeof value !== 'number') {
    return false;
  }

  return true;
};

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

const assignUserAnswer = (datas) => {
  const userAnswer = datas;

  responseCustom.datas = datas;
  console.log('data responseCustom');
  console.log(responseCustom.datas);

  return userAnswer;
};

const createUserAnswer = async (req, res) => {
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

  const numberDatas = [
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
      data: cycle,
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
  ];

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

  const validatedNumberDatas = validateDatas(numberDatas);

  if (Object.keys(validatedNumberDatas).length > 0) {
    return res.status(401).json(validatedNumberDatas);
  }

  const answerDatas = filterDataOutput(numberDatas.concat(yesNoDatas));
  console.log(answerDatas);

  await assignUserAnswer(answerDatas);

  const filteredNumberDatas = filterDataOutput(numberDatas);
  const validatedCycleData = validateCycleData(cycle);
  const validatedYesNoDatas = validateYesNoDatas(yesNoDatas);

  const validatedDatas = {
    ...filteredNumberDatas,
    ...validatedCycleData,
    ...validatedYesNoDatas,
  };
  console.log(validatedDatas);

  return res.status(200).json(
    responseClient('success', 'getting user input', validatedDatas),
  );
};

module.exports = createUserAnswer;
