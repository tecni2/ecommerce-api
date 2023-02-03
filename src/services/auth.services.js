const Users = require("../models/users.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class AuthServices {
  static async register(user) {
    try {
      const result = await Users.create(user);
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async login(password, email) {
    try {
      const user = await Users.findOne({ where: { email } });
      if (user) {
        const isValid = bcrypt.compareSync(password, user.password);

        return isValid ? { isValid, user } : { isValid };
      }

      return { isValid: false };
    } catch (error) {
      throw error;
    }
  }

  static genToken(userData) {
    try {
      const token = jwt.sign(userData, process.env.JWT_SECRET, {
        algorithm: "HS512",
        expiresIn: "1d"
      });

      return token;
    } catch (error) {
      throw error;
    };
  }
}

module.exports = AuthServices;