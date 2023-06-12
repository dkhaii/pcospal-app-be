const { Configuration, OpenAIApi } = require('openai');
const { responseCustom, gptResponse, responseClient } = require('../helper');
const parseAppYaml = require('../config/environment');

const { OPENAI_API_KEY } = parseAppYaml();

const formatJsonData = (jsonData) => {
  const formattedData = [];

  Object.keys(jsonData).forEach((key) => {
    let formattedPair;

    if (typeof jsonData[key] === 'string') {
      formattedPair = `${key} = ${jsonData[key]}`;
    }

    formattedPair = `${key} = ${JSON.stringify(jsonData[key])}`;

    formattedData.push(formattedPair);
  });

  const formattedString = formattedData.join(', ');

  return formattedString;
};

const generateData = async (req, res) => {
  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  if (Object.keys(responseCustom).length > 0) {
    const obj = responseCustom.datas;
    console.log('obj di generate data:');
    console.log(obj);

    const userAnswer = formatJsonData(obj);
    console.log('user answer di generate data:');
    console.log(userAnswer);

    const instruction = `Please generate tips and tricks to avoid PCOS disease based on the following data: ${userAnswer}`;

    try {
      const completion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: instruction,
        max_tokens: 500,
        temperature: 0.4,
      });

      gptResponse.data = completion.data.choices[0].text;
      console.log('generated gpt data:');
      console.log(gptResponse.data);

      return res.status(200).json(
        responseClient(
          'success',
          'successfuly generated data',
          gptResponse.data,
        ),
      );
    } catch (error) {
      return res.status(500).json(
        responseClient('error', 'error', error),
      );
    }
  }

  return res.status(404).json(
    responseClient('fail', 'no pcos data created', []),
  );
};

module.exports = generateData;
