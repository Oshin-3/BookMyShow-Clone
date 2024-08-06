const mongoose = require('mongoose')

const theaterSchema = new mongoose.Schema({
    theaterName: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pincode: {
        type: String
    },
    phone: {
        type: Number,
        required: true,
        maxLength: 10
    },
    email: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: "users",
    },
    isActive: {
        type: Boolean,
        default: false
    }
},
{timestamps: true})

const TheaterModel = mongoose.model("theaters", theaterSchema)

module.exports = TheaterModel