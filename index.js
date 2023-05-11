import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { data } from "./data.js";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

app.get("/", (req, res) => {
  res.send("Hi there");
});

app.get("/api/products", (req, res) => {
  try {
    const { products } = data;
    res.status(200).json(products);
  } catch (e) {
    res.status(404).send({ message: e.message });
  }
});
app.get("/api/product", (req, res) => {
  const { id, category, subCategory } = req;
  try {
    const product = data.products[category][subCategory][id];
    res.status(200).json(product);
  } catch (e) {
    res.status(404).send({ message: "Product not Found" });
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log("Listening to Port: " + PORT));