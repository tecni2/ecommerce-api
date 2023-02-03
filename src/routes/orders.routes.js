const { Router } = require("express");
const { getAllOrdersOfUSer } = require("../controllers/orders.controllers");

const router = Router();

/**
 * @openapi
 * /api/v1/orders/users/{userId}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: get all orders of a user
 *     tags: [Orders]
 *     parameters:
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
 *               $ref: "#/components/schemas/orders"
 *       400: 
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Something wrong / No token provided
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

router.get("/users/:userId", getAllOrdersOfUSer);

module.exports = router;