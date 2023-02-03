const { DataTypes } = require("sequelize");
const db = require("../utils/database");
const bcrypt = require("bcrypt");
/**
 * @openapi
 * components:
 *   schemas:
 *     register:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           example: Eliezer
 *         email:
 *           type: string
 *           example: elie.ch@gmail.com
 *         password:
 *           type: string
 *           example: 1234
 *     login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: elie.ch@gmail.com
 *         password:
 *           type: string
 *           example: 1234
 *     loginResponse:
 *       type: object
 *       properties:
 *         username: 
 *           type: string
 *           example: Elie
 *         id:
 *           type: int
 *           example: 5
 *         email:
 *           type: string
 *           example: elie.ch@gmail.com
 *         token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.dyt0CoTl4WoVjAHI9Q_CwSKhl6d_9rhM3NrXuJttkao
 *         createdAt:
 *           type: date
 *           example: 2023-01-29T05:06:41.377Z
 *         updatedAt:
 *           type: date
 *           example: 2023-01-29T05:06:41.377Z
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
const Users = db.define("users", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  username: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  hooks: {
    beforeCreate: (user, options) => {
      const { password } = user;
      const hash = bcrypt.hashSync(password, 10);
      user.password = hash;
    }
  },
});

module.exports = Users;