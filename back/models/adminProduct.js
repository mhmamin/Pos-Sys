import mongoose from "mongoose";

const adminProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
  },
  { timestamps: true },
);

export default mongoose.model("AdminProduct", adminProductSchema);
