const Trip = require("../models/Trip");

// Create Trip
const createTrip = async (req, res) => {

    try {

        const newTrip = new Trip(req.body);

        await newTrip.save();

        res.status(201).json({
            message: "Trip Created Successfully",
            trip: newTrip
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Get All Trips
const getTrips = async (req, res) => {

    try {

        const trips = await Trip.find();

        res.status(200).json(trips);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Update Trip
const updateTrip = async (req, res) => {

    try {

        const updatedTrip = await Trip.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            message: "Trip Updated Successfully",
            trip: updatedTrip
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Delete Trip
const deleteTrip = async (req, res) => {

    try {

        await Trip.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Trip Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    createTrip,
    getTrips,
    updateTrip,
    deleteTrip
};
exports.updateTrip = async (req, res) => {
    try {

        const updatedTrip = await Trip.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            message: "Trip Updated Successfully",
            trip: updatedTrip
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};