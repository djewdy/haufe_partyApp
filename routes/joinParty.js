const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/Product'); 
const joinPartyRoute = express.Router();


// Route to join a party
joinPartyRoute.post('/join-party/:partyId', async (req, res) => {
  try {
    const { partyId } = req.params;
    const { userId } = req.body;

    // Update the attendees array by adding the userId if it isn't already in the array
    const updatedParty = await Product.findByIdAndUpdate(
      partyId,
      { $addToSet: { attendees: mongoose.Types.ObjectId(userId) } },
      { new: true }
    );

    if (!updatedParty) {
      return res.status(404).json({ message: 'Party not found' });
    }

    res.status(200).json({
      message: 'User successfully joined the party',
      party: updatedParty
    });
  } catch (error) {
    console.error('Error joining the party:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = joinPartyRoute;
