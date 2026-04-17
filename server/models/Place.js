const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'State',
      required: true
    },
    category: {
      type: String,
      required: true,
      enum: ['Heritage', 'Nature', 'Religious', 'Adventure']
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    bestTimeToVisit: {
      type: String,
      trim: true
    },
    entryFee: {
      type: String,
      trim: true
    },
    location: {
      type: String,
      trim: true
    },
    image: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Place', placeSchema);