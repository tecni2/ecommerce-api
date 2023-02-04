const db = require("../utils/database");
const { DataTypes } = require("sequelize");

/**
 * @openapi
 * components:
 *   schemas:
 *     cartAddRequired:
 *       type: object
 *       properties:
 *         quantity:
 *           type: int
 *           example: 3
 *     cartRequired:
 *       type: object
 *       properties:
 *         userId:
 *           type: int
 *           example: 1
 */

const Carts = db.define("carts", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  totalPrice: {
    type: DataTypes.DECIMAL({ precision: 30, scale: 2 }),
    defaultValue: 0,
    field: "total_price",
  },
  status: {
    type: DataTypes.ENUM("purchased", "pending"),
    defaultValue: "pending",
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "user_id",
  },
});

module.exports = Carts;