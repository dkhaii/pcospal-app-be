const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const database = require('../models/models');
const { responseClient } = require('../helper');
const parseAppYaml = require('../config/environment');

const User = database.user;
const { JWT_SECRET_KEY } = parseAppYaml();

const createUser = async (req, res) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    birthday,
    password,
  } = req.body;

  if (!firstName) {
    return res.status(400).json(
      responseClient('error', 'please fill in your first name', []),
    );
  }

  if (!lastName) {
    return res.status(400).json(
      responseClient('error', 'please fill in your last name', []),
    );
  }

  if (!phoneNumber) {
    return res.status(400).json(
      responseClient('error', 'please fill in your phone number', []),
    );
  }

  if (!email) {
    return res.status(400).json(
      responseClient('error', 'please fill in your email', []),
    );
  }

  if (!birthday) {
    return res.status(400).json(
      responseClient('error', 'please fill in your email', []),
    );
  }

  if (!password) {
    return res.status(400).json(
      responseClient('error', 'please fill in the password', []),
    );
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const userId = nanoid(12);
  const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const updatedAt = createdAt;

  try {
    const createdData = {
      user_id: userId,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      email,
      birthday,
      password: hashedPassword,
      created_at: createdAt,
      updated_at: updatedAt,
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
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json(
      responseClient('error', 'please fill in your email', []),
    );
  }

  if (!password) {
    return res.status(400).json(
      responseClient('error', 'please fill in your password', []),
    );
  }

  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json(
        responseClient('error', 'user not found', []),
      );
    }

    const isPassword = bcrypt.compareSync(password, user.password);

    if (!isPassword) {
      return res.status(401).json(
        responseClient('error', 'wrong password', []),
      );
    }

    const userPayload = {
      user_id: user.user_id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      birthday: user.birthday,
    };

    jwt.sign(
      userPayload,
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
            user: userPayload,
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

const showUserData = async (req, res) => {
  try {
    const { user } = req;

    const userPayload = {
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      email: user.email,
      birthday: user.birthday,
    };
    console.log(userPayload);

    return res.status(200).json(
      responseClient('success', 'showing user data', userPayload),
    );
  } catch (error) {
    return res.status(500).json(
      responseClient('error', 'error', error),
    );
  }
};

module.exports = {
  createUser,
  loginUser,
  showUserData,
};
