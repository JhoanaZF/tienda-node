import mongoose from "mongoose";
const OrderSchema = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  total: {
    type: Number,
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: { type: Number, default: 1 },
    },
  ],
});

export const Order = mongoose.model("Order", OrderSchema);
