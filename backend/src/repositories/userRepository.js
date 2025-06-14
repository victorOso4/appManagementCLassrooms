const User = require('../models/user');

const findUserById = async (id_gmail) => {
  return await User.findByPk(id_gmail);
};

const createUser = async (userData) => {
  return await User.create(userData);
};

module.exports = {
  findUserById,
  createUser,
};