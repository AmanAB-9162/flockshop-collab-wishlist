const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  title: { type: String, required: true },
  createdBy: { type: String, required: true }, // or use userId/email
  collaborators: [{ type: String }],
  products: [
    {
      name: String,
      image: String,
      price: Number,
      addedBy: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Wishlist", wishlistSchema);
