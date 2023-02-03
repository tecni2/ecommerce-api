const Users = require("./users.models");
const Products = require("./products.models");
const Carts = require("./carts.models");
const Orders = require("./orders.models");
const ProductsInCarts = require("./products_in_carts.models");
const ProductsInOrders = require("./products_in_orders.models");

const initModels = () => {
  ProductsInCarts
  ProductsInOrders
  Users.hasMany(Products, { as: "products", foreignKey: "user_id" });
  Products.belongsTo(Users, { as: "owner", foreignKey: "user_id" });

  Users.hasOne(Carts, { as: "cart", foreignKey: "user_id" });
  Carts.hasOne(Users, { as: "owner", foreignKey: "user_id" });

  Users.hasMany(Orders, { as: "orders", foreignKey: "user_id" });
  Orders.belongsTo(Users, { as: "owner", foreignKey: "user_id" });

  Carts.hasMany(ProductsInCarts, { as: "products", foreignKey: "cart_id" });
  ProductsInCarts.belongsTo(Carts, { as: "cart", foreignKey: "cart_id" });

  Products.hasMany(ProductsInCarts, { as: "carts", foreignKey: "product_id" });
  ProductsInCarts.belongsTo(Products, { as: "product", foreignKey: "product_id" });

  Orders.hasMany(ProductsInOrders, { as: "products", foreignKey: "order_id" });
  ProductsInOrders.belongsTo(Orders, { as: "order", foreignKey: "order_id" });

  Products.hasMany(ProductsInOrders, { as: "orders", foreignKey: "product_id" });
  ProductsInOrders.belongsTo(Products, { as: "product", foreignKey: "product_id" });
}

module.exports = initModels;