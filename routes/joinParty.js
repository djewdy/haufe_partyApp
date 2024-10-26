const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Product");
const joinPartyRoute = express.Router();

// Route to join a party
joinPartyRoute.post("/join-party/:partyId", async (req, res) => {
  try {
    const { partyId } = req.params;
    const { userId } = req.body;

    // Update the attendees array by adding the userId if it isn't already in the array
    const updatedParty = await Product.findByIdAndUpdate(
      partyId,
      { $addToSet: { attendees: new mongoose.Types.ObjectId(userId) } },
      { new: true }
    );

    if (!updatedParty) {
      return res.status(404).json({ message: "Party not found" });
    }

    res.status(200).json({
      message: "User successfully joined the party",
      party: updatedParty,
    });
  } catch (error) {
    console.error("Error joining the party:", error);
    res.status(500).json({ message: "Server error" });
  }
});
joinPartyRoute.post("/assign-task/:partyId", async (req, res) => {
  try {
    const { partyId } = req.params;
    const { taskId, userId } = req.body;

    const updatedParty = await Product.findOneAndUpdate(
      { _id: partyId, "todoList._id": taskId },
      { $set: { "todoList.$.status": "completed" } },
      { $set: { "todoList.$.responsible": userId } },
      { new: true }
    );

    if (!updatedParty) {
      return res.status(404).json({ message: "Party or task not found" });
    }

    res.status(200).json({
      message: "Task assigned successfully",
      party: updatedParty,
    });
  } catch (error) {
    console.error("Error assigning task:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = joinPartyRoute;
