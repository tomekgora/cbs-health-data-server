const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  userName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userPassword: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = User;
