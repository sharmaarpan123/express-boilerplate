import express from "express";
import product from "../models/product/product.js";

const router = express.Router();

router.post("/add-product", async (req, res) => {
  const { title, price } = req.body;

  if (!title?.trim() || !price?.trim()) {
    return res.send({ message: "please fill all the filed", success: false });
  }

  const newProduct = new product({
    title  , price
  });

  const productRes = await newProduct.save();

  res.send({ message: "product is added ", product : productRes, success: true });
});


export default router;
