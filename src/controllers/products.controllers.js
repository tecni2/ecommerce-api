const ProductServices = require("../services/product.services");

const getAllProducts = async (req, res) => {
  try {
    const products = await ProductServices.getAll();
    res.json(products);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

const createProduct = async (req, res) => {
  try {
    const { name, price, availableQty, userId, image } = req.body;
    if (!name, !price, !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const product = { name, price, userId, availableQty: availableQty || 0, image: image || "" };
    const result = await ProductServices.create(product);
    if (result) {
      res.status(201).json({ message: "Product created", productId: result.id });
    } else {
      res.status(400).json({ message: "Something wrong" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
}

module.exports = {
  getAllProducts,
  createProduct,
}