import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  price: {
    type: String,
    require: true,
  },
});

export default mongoose.model("Product", productSchema);
