const authMiddleware = require("../middlewares/auth.middlewares");
const authRoutes = require("./auth.routes");
const productRoutes = require("./products.routes");
const cartRoutes = require("./carts.routes");
const orderRoutes = require("./orders.routes");

const routerApi = (app) => {
  app.get("/", (req, res) => {
    res.json({ message: "Welcome to my server" });
  })
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/products", authMiddleware, productRoutes);
  app.use("/api/v1/carts", authMiddleware, cartRoutes);
  app.use("/api/v1/orders", orderRoutes);
};

module.exports = routerApi;
