const Wishlist = require("../models/Wishlist");

// Add Destination
exports.addWishlist = async (req, res) => {

    try {

        const wishlist = new Wishlist(req.body);

        await wishlist.save();

        res.status(201).json(wishlist);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Get All Destinations
exports.getWishlist = async (req, res) => {

    try {

        const wishlist = await Wishlist.find();

        res.json(wishlist);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Delete Destination
exports.deleteWishlist = async (req, res) => {

    try {

        await Wishlist.findByIdAndDelete(req.params.id);

        res.json({
            message: "Destination deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};