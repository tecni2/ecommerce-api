const { Router } = require("express");
const { addProductToCart, getAllProductsOfUSer, buy, createCart } = require("../controllers/cart.controllers");

const router = Router();

/**
 * @openapi
 * /api/v1/carts/{cartId}/products/{productId}:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: add a product in the cart
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         schema:
 *           type: int
 *           minimum: 1
 *         description: The cart ID 
 *       - in: path
 *         name: productId
 *         schema:
 *           type: int
 *           minimum: 1
 *         description: The product ID 
 *     requestBody:
 *       description: Required fields to add a product to the cart
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/cartAddRequired"
 *     responses:
 *       200: 
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: product added
 *       400: 
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Something wrong / Missing required fields / The quantity field cannot be greater than the available quantity of the product and the available quantity of the product cannot be 0 or less / There is no product with the id={productId} / There is no cart with the id={productId} / No token provided
 *       498: 
 *         description: Invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid token
 * /api/v1/carts/{cartId}/users/{userId}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: get all products in a user's cart
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         schema:
 *           type: int
 *           minimum: 1
 *         description: The cart ID 
 *       - in: path
 *         name: userId
 *         schema:
 *           type: int
 *           minimum: 1
 *         description: The user ID 
 *     responses:
 *       200: 
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/productsInCarts"
 *       400: 
 *         description: Something wrong
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error message / No token provided
 *       498: 
 *         description: Invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid token  
 * /api/v1/carts/{cartId}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: purchase the cart and creates a new order
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         schema:
 *           type: int
 *           minimum: 1
 *         description: The cart ID 
 *     responses:
 *       200: 
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cart purchased
 *       400: 
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: The cart has already been purchased before / Cannot purchase an empty cart / There is no cart with the id={cartId} / No token provided
 *       498: 
 *         description: Invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid token       
 * /api/v1/carts:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: create a cart
 *     tags: [Carts]
 *     requestBody:
 *       description: Required fields to create a cart into the app
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/cartAddRequired"
 *     responses:
 *       201: 
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cart created
 *       400: 
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Something wrong / Missing required fields
 *       498: 
 *         description: Invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid token       
 */

router.post("/:cartId/products/:productId", addProductToCart);

router.post("/", createCart);

router.get("/:cartId/users/:userId", getAllProductsOfUSer);

router.put("/:cartId", buy);

module.exports = router;