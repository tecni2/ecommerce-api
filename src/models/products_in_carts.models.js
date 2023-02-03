const db = require("../utils/database");
const { DataTypes } = require("sequelize");

const ProductsInCarts = db.define("products_in_carts", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("purchased", "pending"),
    defaultValue: "pending",
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "product_id",
  },
  cartId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "cart_id",
  },
});

module.exports = ProductsInCarts;