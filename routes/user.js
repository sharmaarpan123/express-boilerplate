import express from "express";
import product from "../models/product/product.js";
import order from "../models/order/order.js";

const router = express.Router();

router.post("/place-order", async (req, res) => {
  try {
    const { productIds } = req.body;

    try {
      const products = await product.find({
        _id: { $in: productIds },
      });
    } catch (error) {
      return res.send({
        status: false,
        message: "provided products ids are invalid",
      });
    }

    const newOrder = await order.create({
      userId: req.id,
      productIds: productIds,
    });

    const newOrderResponse = await newOrder.save();

    res.send({ status: true, message: "order is placed" });
  } catch (error) {
    console.log(error);
    res.send({ message: "server side error", success: false });
  }
});

router.post("/get-orders-list", async (req, res) => {
  try {

    const orders = await order.find({
      userId: req.id,
    }).populate('userId').populate('productIds')

    res.send({ status: true, message: "order list", orders });
  } catch (error) {
    console.log(error);
    res.send({ message: "server side error", success: false });
  }
});

// router.put('/')
export default router;
