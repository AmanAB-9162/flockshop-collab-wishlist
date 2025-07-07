const express = require('express');
const router = express.Router();
const Wishlist = require('../models/wishlist');

router.get('/', async (req, res) => {
  const data = await Wishlist.find();
  res.json(data);
});

// POST /api/wishlist
router.post("/", async (req, res) => {
  try {
    const { title, createdBy, collaborators } = req.body;

    const newWishlist = new Wishlist({
      title,
      createdBy,
      collaborators: collaborators || [],
      products: []
    });

    const savedWishlist = await newWishlist.save();
    res.status(201).json(savedWishlist);
  } catch (error) {
    console.error("Error creating wishlist:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put('/:id', async (req, res) => {
  const wishlist = await Wishlist.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(wishlist);
});

router.delete('/:id', async (req, res) => {
  await Wishlist.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
