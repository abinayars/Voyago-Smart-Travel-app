const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({

    destination: {
        type: String,
        required: true
    },

    country: {
        type: String,
        required: true
    },

    image: {
        type: String,
        default: ""
    }

});

module.exports = mongoose.model("Wishlist", wishlistSchema);