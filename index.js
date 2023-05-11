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

app.get("/api/categories", (req, res) => {
  try {
    const { categories } = data;
    res.status(200).json(categories);
  } catch (e) {
    res.status(404).send({ message: e.message });
  }
});
app.get("/api/products-by-category", (req, res) => {
  const { category } = req.body;
  try {
    const products = data.products[category];
    if (!products) {
      return res.status(404).send({ message: "Category does not Found" });
    }
    res.status(200).json(products);
  } catch (e) {
    res.status(404).send({ message: e.message });
  }
});

app.get("/api/products", (req, res) => {
  try {
    const { products } = data;
    res.status(200).json(products);
  } catch (e) {
    res.status(404).send({ message: e.message });
  }
});
app.post("/api/product", (req, res) => {
  const { id, category, subCategory } = req.body;
  try {
    const product = data.products[category][subCategory][id];
    res.status(200).json(product);
  } catch (e) {
    res.status(404).send({ message: "Product not Found" });
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log("Listening to Port: " + PORT));
