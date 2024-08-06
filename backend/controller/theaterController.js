const TheaterModel = require('../model/theaterModel')

//add theater
const addTheaters = async (req, res) => {
    try {
        const theater = new TheaterModel(req.body)
        await theater.save()

        res.send({
            success: true,
            message: "Theater added successfully!"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
}

//update theater
const updateTheaterDetails = async (req, res) => {
    try {
       
        await TheaterModel.findByIdAndUpdate(req.body.theaterId, req.body)

        res.send({
            success: true,
            message: "Theater details are updated successfully!"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
}

//delete theater
const deleteTheater = async (req, res) => {
    try {
        const theaterId = req.params.theaterId
        console.log("controller theaterId: ", theaterId)
        await TheaterModel.findByIdAndDelete(theaterId)

        res.send({
            success: true,
            message: "Theater removed successfully!"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
}

//get all theaters
const getAllTheaters = async (req, res) => {
    try {
        const allTheaters = await TheaterModel.find()
        res.send({
            success: true,
            theaters: allTheaters,
            message: "All theaters are fetched successfully"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
}

//get theaters by owner
const getAllTheaterByOwner = async (req, res) => {
    try {
        const allTheaterByOwner = await TheaterModel.find({owner: req.params.ownerId})
        res.send({
            success: true,
            theaters: allTheaterByOwner,
            message: "All theaters are fetched by owner Id"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    addTheaters,
    updateTheaterDetails,
    deleteTheater,
    getAllTheaters,
    getAllTheaterByOwner
}