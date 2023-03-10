const Carts = require("../models/carts.models");
const ProductsInCarts = require("../models/products_in_carts.models");
const Users = require("../models/users.models");
const CartServices = require("../services/cart.services");
const OrderServices = require("../services/order.services");
const ProductServices = require("../services/product.services");
const transporter = require("../utils/mailer");
require("dotenv").config;

const getAllProductsOfUSer = async (req, res) => {
  try {
    const { cartId } = req.params;
    const products = await CartServices.getAllProductsOf(cartId);
    if (products) {
      res.json(products.products);
    } else {
      res.status(400).json({ message: "Something wrong" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
}

const createCart = async (req, res) => {
  try {
    const { userId, status } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const cart = await CartServices.create({ userId, status: status || "pending" });
    if (cart) {
      res.status(201).json({ message: "Cart created", cartId: cart.id });
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
    const { quantity, status } = req.body;
    if (!quantity) {
      return res.status(400).json({ message: "Missing quantity field" });
    }
    const cart = await Carts.findByPk(cartId);
    if (!cart) {
      return res.status(400).json({ message: "There is no cart with the id: " + cartId });
    } else if (cart.status == "purchased") {
      return res.status(400).json({ message: "Cannot add products in a purchased cart" });
    }
    const isProductInCart = ProductsInCarts.findOne({ where: { productId, cartId } });
    if (isProductInCart) {
      return res.status(400).json({ message: "Cannot buy the same product again" });
    }
    const product = await ProductServices.getOne(productId);
    if (product) {
      if (product.availableQty >= quantity && product.availableQty > 0) {
        const fields = { cartId, productId, quantity, price: product.price, status: status || "pending" };
        const result = await CartServices.addProduct(fields);
        if (result) {
          const cartTotalPrice = parseFloat(cart.totalPrice) + parseFloat(product.price * quantity);
          console.log("llego..................................................", cartTotalPrice);
          await CartServices.update(cart.id, { totalPrice: cartTotalPrice });
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
          await ProductsInCarts.update({ status: "purchased" }, { where: { productId } });
          await OrderServices.addProduct({ productId, quantity, price, status, orderId: order.id });
          await transporter.sendMail({
            from: "tecni2.elie.elie@gmail.com",
            to: user.email,
            subject: "Cart purchased",
            html: `<h1>Orden de compra en proceso</h1> <p>Su compra a sido confirmada, por favor espere hasta que el env??o llegue a su casa</p> <p>Haga click en el siguiente <a target='new_blank' href='${process.env.URL}/api/v1/orders/users/${cart.userId}'>enlace</a> para verificar las ordenes que ha hecho en nuestra app</p>`,
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
  createCart,
}