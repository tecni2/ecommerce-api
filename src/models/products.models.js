const db = require("../utils/database");
const { DataTypes } = require("sequelize");

/**
 * @openapi
 * components:
 *   schemas:
 *     products:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           id:
 *             type: int
 *             example: 2
 *           name:
 *             type: string
 *             example: tv
 *           price:
 *             type: decimal
 *             example: 51.40
 *           availableQty:
 *             type: int
 *             example: 20
 *           image:
 *             type: string
 *             example: http://images/10
 *           userId: 
 *             type: int
 *             example: 2
 *           createdAt:
 *             type: date
 *             example: 2023-01-29T05:06:41.377Z
 *           updatedAt:
 *             type: date
 *             example: 2023-01-29T05:06:41.377Z
 *           owner:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: Elie
 *     productsInCarts:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           id:
 *             type: int
 *             example: 2
 *           name:
 *             type: string
 *             example: tv
 *           price:
 *             type: decimal
 *             example: 51.40
 *           availableQty:
 *             type: int
 *             example: 20
 *           image:
 *             type: string
 *             example: http://images/10
 *           userId: 
 *             type: int
 *             example: 2
 *           createdAt:
 *             type: date
 *             example: 2023-01-29T05:06:41.377Z
 *           updatedAt:
 *             type: date
 *             example: 2023-01-29T05:06:41.377Z
 *     productRequired:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: tv
 *         price:
 *           type: decimal
 *           example: 51.40
 *         userId: 
 *           type: int
 *           example: 2
 */

const Products = db.define("products", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  availableQty: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: "available_qty",
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // quite la propiedad "status" porque no le veía la utilidad 
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "user_id",
  },
});

module.exports = Products;