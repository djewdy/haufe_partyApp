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
  responsible: { type: Schema.Types.ObjectId, ref: "User" }, // Field to hold the responsible user ID
});
const messageSchema = new Schema({
  text: { type: String, required: true },
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
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
    messages: [messageSchema], // Array of messages
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

module.exports = mongoose.model("Product", productSchema); // Ensure the model name is "Product"
