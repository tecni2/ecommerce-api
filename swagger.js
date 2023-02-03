const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
require("dotenv").config();

const options = {
  apis: ["./src/routes/auth.routes.js", "./src/models/users.models.js", "./src/routes/products.routes.js", "./src/models/products.models.js", "./src/routes/orders.routes.js", "./src/models/orders.models.js", "./src/routes/carts.routes.js", "./src/models/carts.models.js"],
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Clon de chat en node js",
      version: "0.0.9",
      description: "API para ecommerce",
    }
  }
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
  app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  app.use("/api/v1/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(`La documentacion esta disponible en ${process.env.URL}/api/v1/docs`);
}

module.exports = swaggerDocs;