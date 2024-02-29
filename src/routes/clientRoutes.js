import express from "express";
import {
  createClient,
  deleteClient,
  getClientById,
  getClients,
  updateClient,
} from "../controllers/clientController.js";
export const clientRoutes = express.Router();

clientRoutes.post("/create", createClient);
clientRoutes.delete("/delete/:id", deleteClient);
clientRoutes.put("/update/:id", updateClient);

clientRoutes.get("/", getClients);
clientRoutes.get("/:id", getClientById);
