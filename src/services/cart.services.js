const ProductsInCarts = require("../models/products_in_carts.models");
const Carts = require("../models/carts.models");

class CartServices {
  static async addProduct(fields) {
    try {
      const result = await ProductsInCarts.create(fields);
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async create(fields) {
    try {
      const result = await Carts.create(fields);
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async getAllProductsOf(cartId) {
    try {
      const result = await Carts.findOne({ where: { id: cartId}, include: { model: ProductsInCarts, as: "products" } });
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async getOne(id) {
    const result = await Carts.findByPk(id);
    return result;
  }
  static async update(id, fields) {
    const result = await Carts.update(fields, { where: { id } });
    return result;
  }
}

module.exports = CartServices;