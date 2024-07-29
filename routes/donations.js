// routes/donations.js
// routes/donations.js
const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

// Get all donations
router.get('/', auth, async (req, res) => {
  try {
    const donations = await Donation.find({ user: req.user.id });
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new donation
router.post(
  '/',
  auth,
  [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('phone').not().isEmpty().withMessage('Phone number is required'),
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('network').not().isEmpty().withMessage('Network is required'),
    body('reference').not().isEmpty().withMessage('Reference is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const donation = new Donation({
      name: req.body.name,
      phone: req.body.phone,
      amount: req.body.amount,
      network: req.body.network,
      reference: req.body.reference,
      user: req.user.id,
    });

    try {
      const newDonation = await donation.save();
      res.status(201).json(newDonation);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

module.exports = router;
