const { nanoid } = require('nanoid');
const { responseClient } = require('../helper');
const database = require('../models/models');

const History = database.history;

const createHistory = async (req, res) => {
  const { historyDatas } = req.body;

  const historyId = nanoid(12);
  const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

  try {
    const { user } = req;

    const createdDatas = {
      historyId,
      datas: historyDatas,
      userId: user.userId,
      createdAt,
    };

    console.log(createdDatas);

    const history = await History.create(createdDatas);

    console.log(history);

    return res.status(200).json(
      responseClient('success', 'history created successfully', history),
    );
  } catch (error) {
    return res.status(500).json(
      responseClient('failed', 'error', error),
    );
  }
};

const showAllUserHistory = async (req, res) => {
  try {
    const { user } = req;

    const userHistory = await History.findAll({
      where: {
        userId: user.userId,
      },
    });

    if (!userHistory) {
      return res.status(200).json(
        responseClient('success', 'there is no history', []),
      );
    }

    return res.status(200).json(
      responseClient('success', 'showing all user history', userHistory),
    );
  } catch (error) {
    return res.status(500).json(
      responseClient('error', 'failed', error),
    );
  }
};

module.exports = { createHistory, showAllUserHistory };
