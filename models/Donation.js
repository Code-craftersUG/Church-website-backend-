// models/Donation.js

// models/Donation.js
const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  network: {
    type: String,
    required: true
  },
  reference: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Ensure indexes are created
donationSchema.index({ name: 1, phone: 1 });

module.exports = mongoose.model('Donation', donationSchema);
