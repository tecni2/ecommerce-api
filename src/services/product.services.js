const Products = require("../models/products.models");
const { Op } = require("sequelize");
const Users = require("../models/users.models");

class ProductServices {
  static async getAll() {
    try {
      const products = Products.findAll({
        where: {
          availableQty: {
            [Op.gt]: 0
          }
        },
        include: {
          model: Users,
          as: "owner",
          attributes: ["username"],
        }
      });
      return products;
    } catch (error) {
      throw error;
    }
  }
  static async getOne(id) {
    try {
      const product = await Products.findOne({ where: { id: id } });
      return product;
    } catch (error) {
      throw error;
    }
  }
  static async create(product) {
    try {
      const result = await Products.create(product);
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async update(id, fields) {
    try {
      const result = await Products.update(fields, { where: { id } });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductServices;