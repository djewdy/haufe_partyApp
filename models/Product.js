const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the TodoList schema as a subdocument for tasks
const todoSchema = new Schema({
  task: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "inprogress", "completed"],
    default: "pending",
  },
});

// Define the Party schema
const productSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    todoList: [todoSchema], // Array of todo items
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    attendees: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

module.exports = mongoose.model("Product", productSchema); // Ensure the model name is "Product"
