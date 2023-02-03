const authMiddleware = require("../middlewares/auth.middlewares");
const authRoutes = require("./auth.routes");
const productRoutes = require("./products.routes");
const cartRoutes = require("./carts.routes");
const orderRoutes = require("./orders.routes");

const routerApi = (app) => {
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/products", authMiddleware, productRoutes);
  app.use("/api/v1/carts", authMiddleware, cartRoutes);
  app.use("/api/v1/orders", authMiddleware, orderRoutes);
};

module.exports = routerApi;
