import mongoose from "mongoose";
const ClientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  document: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  phone: {
    type: String,
    default: true,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

export const Client = mongoose.model("Client", ClientSchema);
