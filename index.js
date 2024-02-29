import express from "express";
import { connectDB } from "./src/config/connect.js";
import { productRoutes } from "./src/routes/productRoutes.js";
import { categoryRoutes } from "./src/routes/categoryRoutes.js";
import { clientRoutes } from "./src/routes/clientRoutes.js";

const app = express();
app.use(express.json());
connectDB();

app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/order", orderRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Escuchando puerto ${PORT}`);
});
