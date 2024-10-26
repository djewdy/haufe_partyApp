const express = require("express");
const productRoute = express.Router();
const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");

// Get all products
productRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

// Get a product by ID
productRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate(
      "messages.sender",
      "name"
    );
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

// Create a new product (party)
productRoute.post(
  "/",
  asyncHandler(async (req, res) => {
    const { title, description, location, creator, todoList } = req.body;

    // Create a new product instance
    const product = new Product({
      title,
      description,
      location,
      creator, // Ensure the creator's ObjectId is provided
      todoList, // This should be an array of tasks
    });

    // Save the product to the database
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  })
);

module.exports = productRoute;
