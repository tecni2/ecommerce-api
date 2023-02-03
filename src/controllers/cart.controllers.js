const Users = require("../models/users.models");
const CartServices = require("../services/cart.services");
const OrderServices = require("../services/order.services");
const ProductServices = require("../services/product.services");
const transporter = require("../utils/mailer");
require("dotenv").config;

const getAllProductsOfUSer = async (req, res) => {
  try {
    const { cartId, userId } = req.params;
    const products = await CartServices.getAllProductsOf(cartId, userId);
    if (products) {
      res.json(products.products);
    } else {
      res.status(400).json({ message: "Something wrong" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
}

const addProductToCart = async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    const { quantity, price, status } = req.body;
    if (!quantity || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const cart = await CartServices.findByPk(cartId);
    if (!cart) {
      return res.status(400).json({ message: "There is no cart with the id: " + cartId });
    }
    const fields = { cartId, productId, quantity, price, status: status || "pending" };
    const product = await ProductServices.getOne(productId);
    if (product) {
      if (product.availableQty >= quantity && product.availableQty > 0) {
        const result = await CartServices.addProduct(fields);
        if (result) {
          res.json({ message: "Product added" });
        } else {
          res.status(400).json({ message: "Something wrong" });
        }
      } else {
        res.status(400).json({ message: "The quantity field cannot be greater than the available quantity of the product and the available quantity of the product cannot be 0 or less" });
      }
    } else {
      res.status(400).json({ message: "There is no product with the id: " + productId });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
}

const buy = async (req, res) => {
  const { cartId } = req.params;
  const cart = await CartServices.getOne(cartId);
  if (cart) {
    const user = await Users.findByPk(cart.userId);
    const productsInCart = await CartServices.getAllProductsOf(cartId, cart.userId);
    if (productsInCart.products[0]) {
      if (cart.status == "pending") {
        await CartServices.update(cartId, { status: "purchased" });
        const order = await OrderServices.create({ totalPrice: cart.totalPrice, userId: cart.userId });
        await productsInCart.products.forEach(async prod => {
          const { productId, quantity, price, status } = prod;
          await OrderServices.addProduct({ productId, quantity, price, status, orderId: order.id });
          await transporter.sendMail({
            from: "tecni2.elie.elie@gmail.com",
            to: user.email,
            subject: "Cart purchased",
            html: `<h1>Orden de compra en proceso</h1> <p>Su compra a sido confirmada, por favor espere hasta que el envío llegue a su casa</p> <p>Haga click en el siguiente <a target='new_blank' href='http://${process.env.APP_HOST}/api/v1/orders/users/${cart.userId}'>enlace</a> para verificar las ordenes que ha hecho en nuestra app</p>`,
          })
        });
        res.json({ message: "Cart purchased" });
      } else {
        res.status(400).json({ message: "The cart has already been purchased before" });
      }
    } else {
      res.status(400).json({ message: "Cannot purchase an empty cart" });
    }
  } else {
    res.status(400).json({ message: "There is no cart with the id: " + cartId });
  }
}

module.exports = {
  addProductToCart,
  getAllProductsOfUSer,
  buy,
}