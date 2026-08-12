const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(

    {

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false
        },

        tripName: {
            type: String,
            required: true,
            trim: true
        },

        destination: {
            type: String,
            required: true,
            trim: true
             },

        startDate: {
            type: Date,
            required: true
        },
travelers: {
            type: Number,
            required: true,
            default: 1
        },

        budget: {
            type: Number,
            required: true
        },

        status: {
            type: String,
            enum: ["Planning", "Upcoming", "Completed"],
            default: "Planning"
        },
        description: {
            type: String,
            default: ""
        },

        notes: {
            type: String,
            default: ""
            },

        notes: {
            type: String,
            default: ""
        },

        itinerary: [

            {
                 day: {
                    type: Number,
                    required: true
                },

                activities: [

                    {

                        time: {
                            type: String,
                            default: ""
                        },

                        name: {
                            type: String,
                            default: ""
                        }
            }

                ]

            }

        ]

    },

    {
        timestamps: true
    }

);

module.exports = mongoose.model("Trip", tripSchema);             