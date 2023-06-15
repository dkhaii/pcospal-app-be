const {
  responseClient,
  responseCustom,
} = require('../helper');

const validateDatas = (userAnswer) => {
  const responseError = {};

  for (let i = 0; i < userAnswer.length; i++) {
    const obj = userAnswer[i];

    if (typeof obj.value !== 'number') {
      obj.value = false;
    }

    if (obj.value === false) {
      const objType = obj.type;
      responseError[objType] = `${objType} must be number`;
    }
  }

  return responseError;
};

const validateYesNoDatas = (userAnswer) => {
  const datas = {};

  for (let i = 0; i < userAnswer.length; i++) {
    const obj = userAnswer[i];
    const objType = obj.type;

    if (obj.value === 'yes') {
      obj.value = 1;
    }

    if (obj.value === 'no') {
      obj.value = 0;
    }

    datas[objType] = obj.value;
  }
  return datas;
};

const validateCycleValue = (userAnswer) => {
  const datas = {};

  for (let i = 0; i < userAnswer.length; i++) {
    const obj = userAnswer[i];
    const objType = obj.type;

    if (obj.value === 'regular') {
      obj.value = 2;
    }
    if (obj.value === 'irregular') {
      obj.value = 4;
    }

    datas[objType] = obj.value;
  }
  return datas;
};

const filterDataOutput = (datas) => {
  const filteredData = {};

  for (let i = 0; i < datas.length; i++) {
    const obj = datas[i];
    const objType = obj.type;
    const objValue = obj.value;

    filteredData[objType] = objValue;
  }

  return filteredData;
};

const assignUserAnswer = (datas) => {
  const userAnswer = datas;

  responseCustom.push(datas);
  console.log('data responseCustom');
  console.log(responseCustom);

  return userAnswer;
};

const calculateBmi = (req, res) => {
  const { bodyWeight, bodyHeight } = req.body;

  if (!bodyWeight) {
    return res.status(404).json(
      responseClient('error', 'please insert your weight', []),
    );
  }

  if (!bodyHeight) {
    return res.status(404).json(
      responseClient('error', 'please insert your height', []),
    );
  }

  const bodyHeightToMeter = bodyHeight / 100;

  const calculate = bodyWeight / (bodyHeightToMeter * bodyHeightToMeter);
  const roundCalculate = Math.round(calculate * 10) / 10;

  return res.status(200).json(
    responseClient('success', 'calculated bmi', roundCalculate),
  );
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
      value: age,
    },
    {
      type: 'bmi',
      value: bmi,
    },
    {
      type: 'pulseRate',
      value: pulseRate,
    },
    {
      type: 'yearsOfMarriage',
      value: yearsOfMarriage,
    },
    {
      type: 'hip',
      value: hip,
    },
    {
      type: 'waist',
      value: waist,
    },
  ];

  const cycleValue = [
    {
      type: 'cycle',
      value: cycle,
    },
  ];

  const yesNoDatas = [
    {
      type: 'weightGain',
      value: weightGain,
    },
    {
      type: 'hairGrowth',
      value: hairGrowth,
    },
    {
      type: 'skinDarkening',
      value: skinDarkening,
    },
    {
      type: 'hairLoss',
      value: hairLoss,
    },
    {
      type: 'pimples',
      value: pimples,
    },
    {
      type: 'fastFood',
      value: fastFood,
    },
  ];

  const validatedNumberDatas = validateDatas(numberDatas);

  if (Object.keys(validatedNumberDatas).length > 0) {
    return res.status(401).json(validatedNumberDatas);
  }

  // const bmiValue = calculateBmi(bodyWeight, bodyHeight);
  // const bmi = [{
  //   type: 'bmi',
  //   value: bmiValue,
  // }];

  try {
    const { user } = req;
    const userId = user.user_id;

    const userAnswer = numberDatas.concat(cycleValue, yesNoDatas);

    const filteredDatas = filterDataOutput(userAnswer);
    delete filteredDatas.bodyWeight;
    delete filteredDatas.bodyHeight;
    filteredDatas.id = userId;
    console.log(filteredDatas);

    await assignUserAnswer(filteredDatas);

    const validatedNumber = filteredDatas;
    const validatedCycle = validateCycleValue(cycleValue);
    const validatedYesNo = validateYesNoDatas(yesNoDatas);

    const validatedDatas = {
      ...validatedNumber,
      ...validatedCycle,
      ...validatedYesNo,
    };
    delete validatedDatas.id;
    console.log(validatedDatas);

    return res.status(200).json(
      responseClient('success', 'getting user input', validatedDatas),
    );
  } catch (error) {
    return res.status(500).json(
      responseClient('error', 'no user logged in', error),
    );
  }
};

module.exports = { createUserAnswer, calculateBmi };
