const express = require("express");

const router = express.Router();

const wishlistController = require("../controllers/wishlistController");

// Add Destination
router.post("/", wishlistController.addWishlist);

// Get All Destinations
router.get("/", wishlistController.getWishlist);

// Delete Destination
router.delete("/:id", wishlistController.deleteWishlist);

module.exports = router;