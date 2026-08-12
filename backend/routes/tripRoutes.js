const express = require("express");
const router = express.Router();

const {
    createTrip,
    getTrips,
    updateTrip,
    deleteTrip,
} = require("../controllers/tripController");


// Create Trip
router.post("/", createTrip);

// Get All Trips
router.get("/", getTrips);

// Update Trip
router.put("/:id", updateTrip);

// Delete Trip
router.delete("/:id", deleteTrip);


module.exports = router;