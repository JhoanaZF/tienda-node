import express from "express";
export const orderRoutes = express.Router();

orderRoutes.post("/create", ()=>{});
orderRoutes.delete("/delete/:id", ()=>{});
orderRoutes.put("/update/:id", ()=>{});

orderRoutes.get("/", ()=>{});
orderRoutes.get("/:id", ()=>{});
