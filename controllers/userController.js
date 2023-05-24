const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const database = require('../config/database');
const { User } = require('../models/model');
const { response } = require('../helper');

const createUser = (req, res) => {
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

  const user = new User(userID, username, hashedPassword, createdAt, updatedAt);

  const sql = 'INSERT INTO users (userID, username, password, createdAt, updatedAt) VALUES (?,?,?,?,?)';

  database.query(sql, [
    user.userID,
    user.username,
    user.password,
    user.createdAt,
    user.updatedAt,
  ], (error, result) => {
    if (error) {
      throw error;
    }

    return res.status(200).json(
      response('success', 'created a new user', result),
    );
  });

  return 0;
};

module.exports = {
  createUser,
};
