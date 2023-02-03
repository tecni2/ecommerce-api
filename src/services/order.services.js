const ProductsInOrders = require("../models/products_in_orders.models");
const Orders = require("../models/orders.models");
const ProductServices = require("./product.services");

class OrderServices {
  static async create(order) {
    try {
      const result = await Orders.create(order);
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async addProduct(fields) {
    try {
      const product = await ProductServices.getOne(fields.productId);
      const availableQty = product.availableQty - fields.quantity;
      await ProductServices.update(product.id, { availableQty });

      const result = await ProductsInOrders.create(fields);
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async getAllOrdersOf(userId) {
    try {
      const result = await Orders.findAll({ where: { userId } });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = OrderServices;