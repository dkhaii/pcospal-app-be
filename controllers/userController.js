const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const database = require('../models/models');
const { responseClient, responseCustom } = require('../helper');

const User = database.user;

const createUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    responseCustom.message = 'please fill in the username';
  }

  if (!password) {
    responseCustom.message = 'please fill in the password';
  }

  if (Object.keys(responseCustom).length > 0) {
    return res.status(400).json(responseCustom);
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const userId = nanoid(12);
  const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const updatedAt = createdAt;

  try {
    const createdData = {
      userId,
      username,
      password: hashedPassword,
      createdAt,
      updatedAt,
    };

    const user = await User.create(createdData);

    console.log(user);

    return res
      .status(200)
      .json(responseClient('success', 'user created successfully', user));
  } catch (error) {
    return res.status(500).json(responseClient('failed', 'error', error));
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    responseCustom.message = 'please fill in the username';
  }

  if (!password) {
    responseCustom.message = 'please fill in the password';
  }

  if (Object.keys(responseCustom).length > 0) {
    return res.status(400).json(responseCustom);
  }

  try {
    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      return res
        .status(404)
        .json(responseClient('error', 'user not found', []));
    }

    const isPassword = bcrypt.compareSync(password, user.password);

    if (!isPassword) {
      return res
        .status(401)
        .json(responseClient('error', 'wrong password', []));
    }

    jwt.sign(
      {
        userId: user.userId,
        username: user.username,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: 86400,
      },
      (error, token) => {
        if (error) {
          return res.sendStatus(500);
        }

        return res.status(200).json(
          responseClient('success', 'login successfully', {
            user: {
              userId: user.userId,
              username: user.username,
            },
            token,
          }),
        );
      },
    );

    return 0;
  } catch (error) {
    return res.status(500).json(responseClient('failed', 'error', error));
  }
};

module.exports = {
  createUser,
  loginUser,
};
