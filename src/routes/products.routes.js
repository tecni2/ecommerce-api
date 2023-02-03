const { Router } = require("express");
const { getAllProducts, createProduct } = require("../controllers/products.controllers");

const router = Router();

/**
 * @openapi
 * /api/v1/products:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: get all products where availableQty field > 0
 *     tags: [Products]
 *     responses:
 *       200: 
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/products"
 *       400: 
 *         description: Error
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
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: create a product
 *     tags: [Products]
 *     requestBody:
 *       description: Required fields to create a product
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
 *                   example: product created
 *       400: 
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Something wrong / Missing required fields / No token provided
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

router.get("/", getAllProducts);

router.post("/", createProduct);

module.exports = router;