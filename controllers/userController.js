require('dotenv');
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const database = require('../models/models');
const { response } = require('../helper');

const { JWT_SECRET_KEY } = process.env;
const User = database.user;

const createUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).json(
      response('fail', 'please enter the username', []),
    );
  }

  if (!password) {
    return res.status(400).json(
      response('fail', 'please enter the password', []),
    );
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const userID = nanoid(12);

  const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const updatedAt = createdAt;

  try {
    const user = await User.create({
      userID,
      username,
      password: hashedPassword,
      createdAt,
      updatedAt,
    });

    return res.status(200).json(
      response('success', 'user created successfully', user),
    );
  } catch (error) {
    return res.status(500).json(
      response('failed', 'error', error),
    );
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).json(
      response('error', 'please input username', []),
    );
  }

  if (!password) {
    return res.status(400).json(
      response('error', 'please input password', []),
    );
  }

  try {
    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      return res.status(404).json(
        response('failed', 'user not found', []),
      );
    }

    const isPassword = bcrypt.compareSync(password, user.password);

    if (!isPassword) {
      return res.status(401).json(
        response('failed', 'wrong password', []),
      );
    }

    jwt.sign(
      {
        userID: user.userID,
        username: user.username,
      },
      JWT_SECRET_KEY,
      {
        expiresIn: 86400,
      },
      (error, token) => {
        if (error) {
          return res.sendStatus(500);
        }

        return res.status(200).json(
          response('success', 'login successfully', token),
        );
      },
    );

    return 0;
  } catch (error) {
    return res.status(500).json(
      response('failed', 'error', error),
    );
  }
};

module.exports = {
  createUser,
  loginUser,
};
