const { responseClient } = require('../helper');

const getClassificationResult = (req, res) => {
  const { resultDatas } = req.body;

  if (!resultDatas) {
    return res.status(404).json(
      responseClient('error', 'no data given', []),
    );
  }

  return res.status(200).json(
    responseClient('success', 'getting classificatioin result', resultDatas),
  );
};

module.exports = getClassificationResult;
