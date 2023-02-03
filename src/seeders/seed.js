const db = require("../utils/database");
const Users = require("../models/users.models");
const Products = require("../models/products.models");
const Carts = require("../models/carts.models");
const Orders = require("../models/orders.models");
const ProductsInCarts = require("../models/products_in_carts.models");
const ProductsInOrders = require("../models/products_in_orders.models");

const users = [
  { username: "Eliezer", email: "eliezer@gmail.com", password: "1234" },
  { username: "Jhorman", email: "jhorman@gmail.com", password: "1234" },
  { username: "Lucero", email: "lucero@gmail.com", password: "1234" }
];

const products = [
  { name: "Estudiar node", price: 20, userId: 1, availableQty: 100 },
  { name: "Pasear al perro", price: 80, userId: 1, availableQty: 60 },
  { name: "Lavar platos", price: 72.40, userId: 2, availableQty: 87 },
  { name: "Ir al chequeo mensual", price: 60, userId: 3, availableQty: 300},
];

const cart = [
  { totalPrice: 500, userId: 1 },
  { totalPrice: 500, userId: 2 },
  { totalPrice: 500, userId: 3 },
  { totalPrice: 500, userId: 3 },
  { totalPrice: 500, userId: 2 },
  { totalPrice: 500, userId: 1 },
  { totalPrice: 500, userId: 1 },
  { totalPrice: 500, userId: 2 },
  { totalPrice: 500, userId: 3 },
  { totalPrice: 500, userId: 1 },
];

const orders = [
  { totalPrice: 500, userId: 1 },
  { totalPrice: 500, userId: 2 },
  { totalPrice: 500, userId: 3 },
  { totalPrice: 500, userId: 3 },
  { totalPrice: 500, userId: 2 },
  { totalPrice: 500, userId: 1 },
  { totalPrice: 500, userId: 1 },
  { totalPrice: 500, userId: 2 },
  { totalPrice: 500, userId: 3 },
  { totalPrice: 500, userId: 1 },
];

const productsInCarts = [
  { cartId: 1, productId: 1, quantity: 5, price: 30 },
  { cartId: 2, productId: 1, quantity: 5, price: 30 },
  { cartId: 4, productId: 1, quantity: 5, price: 30 },
  { cartId: 1, productId: 2, quantity: 5, price: 30 },
  { cartId: 7, productId: 2, quantity: 5, price: 30 },
  { cartId: 10, productId: 2, quantity: 5, price: 30 },
  { cartId: 3, productId: 2, quantity: 5, price: 30 },
  { cartId: 5, productId: 3, quantity: 5, price: 30 },
  { cartId: 6, productId: 3, quantity: 5, price: 30 },
  { cartId: 1, productId: 4, quantity: 5, price: 30 },
  { cartId: 3, productId: 4, quantity: 5, price: 30 },
];

const productsInOrders = [
  { orderId: 1, productId: 1, quantity: 5, price: 30 },
  { orderId: 2, productId: 1, quantity: 5, price: 30 },
  { orderId: 4, productId: 1, quantity: 5, price: 30 },
  { orderId: 1, productId: 2, quantity: 5, price: 30 },
];

db.sync({ force: true })
  .then(() => {
    console.log("Iniciando con la siembra");
    users.forEach((user) => Users.create(user));
    setTimeout(() => {
      products.forEach((prod) => Products.create(prod));
    }, 100);
    setTimeout(() => {
      cart.forEach(cart => Carts.create(cart));
      orders.forEach(order => Orders.create(order));
    }, 150);
    setTimeout(() => {
      productsInCarts.forEach(pc => ProductsInCarts.create(pc))
      productsInOrders.forEach(po => ProductsInOrders.create(po))
    }, 200);
  })
  .catch(error => console.log(error))