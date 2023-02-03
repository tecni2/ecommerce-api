const OrderServices = require("../services/order.services");

const getAllOrdersOfUSer = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await OrderServices.getAllOrdersOf(userId);
    if (orders) {
      res.json(orders);
    } else {
      res.status(400).json({ message: "Something wrong" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
}

module.exports = {
  getAllOrdersOfUSer,
}