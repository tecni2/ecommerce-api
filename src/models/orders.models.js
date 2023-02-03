const db = require("../utils/database");
const { DataTypes } = require("sequelize");

/**
 * @openapi
 * components:
 *   schemas:
 *     orders:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           id:
 *             type: int
 *             example: 2
 *           totalPrice:
 *             type: decimal
 *             example: 561.40
 *           status:
 *             type: string
 *             example: pending
 *           userId: 
 *             type: int
 *             example: 2
 *           createdAt:
 *             type: date
 *             example: 2023-01-29T05:06:41.377Z
 *           updatedAt:
 *             type: date
 *             example: 2023-01-29T05:06:41.377Z
 */

const Orders = db.define("orders", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  totalPrice: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    field: "total_price",
  },
  status: {
    type: DataTypes.ENUM("completed", "pending"),
    defaultValue: "pending",
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "user_id",
  },
});

module.exports = Orders;