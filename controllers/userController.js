require('dotenv');
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const database = require('../models/models');
const { responseClient, responseCustom } = require('../helper');

const { JWT_SECRET_KEY } = process.env;
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
  const userID = nanoid(12);
  const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const updatedAt = createdAt;

  try {
    const createdData = {
      userID,
      username,
      password: hashedPassword,
      createdAt,
      updatedAt,
    };

    const user = await User.create(createdData);

    console.log(user);

    return res.status(200).json(
      responseClient('success', 'user created successfully', user),
    );
  } catch (error) {
    return res.status(500).json(
      responseClient('failed', 'error', error),
    );
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
      responseCustom.message = 'user not found';
      return res.status(404).json(responseCustom);
    }

    const isPassword = bcrypt.compareSync(password, user.password);

    if (!isPassword) {
      responseCustom.message = 'wrong password';
      return res.status(401).json(responseCustom);
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
          responseClient('success', 'login successfully', {
            user: {
              userID: user.userID,
              username: user.username,
            },
            token,
          }),
        );
      },
    );

    return 0;
  } catch (error) {
    return res.status(500).json(
      responseClient('failed', 'error', error),
    );
  }
};

const updateUser = async (req, res) => {
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
  const updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

  try {
    const { user } = req;
    console.log(user);

    if (!user) {
      responseCustom.message = 'user not found';
      return res.status(404).json(responseCustom);
    }

    const updatedData = {
      username,
      password: hashedPassword,
      updatedAt,
    };

    console.log(updatedData);

    await User.update(
      updatedData,
      {
        where: {
          userID: user.userID,
        },
      },
    );

    return res.status(200).json(
      responseClient('success', 'user updated successfully', user),
    );
  } catch (error) {
    return res.status(500).json(
      responseClient('error', 'failed to update', error),
    );
  }
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
};
